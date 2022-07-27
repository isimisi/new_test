/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useEffect, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";

import { elementFilter, ElementPicker, getSplitElement, traverseParentsUntilUniqueSplit } from "../Util/ElementPicker";
import Tooltip from "@material-ui/core/Tooltip";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  addCurrSplittingEmail,
  addEmailSplit,
  clearSplitting,
  customSplitUpload,
  removeEmailSplit,

} from "@pages/Timelines/reducers/timelineActions";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth0, User } from "@auth0/auth0-react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";
import { StepIconProps } from "@material-ui/core/StepIcon";
import classnames from "classnames";
import CheckIcon from '@material-ui/icons/Check';

interface Props {
  open: boolean;
  close: () => void;
  timeline_id: string;
}

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#73B1FF',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#73B1FF',
    },
  },
  line: {
    borderColor: '#E7F2FF',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#E7F2FF',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#73B1FF',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#73B1FF',
    zIndex: 1,
    fontSize: 18,
  },
});


function QontoStepIcon(props: StepIconProps) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={classnames(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <CheckIcon className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

const seperators = [
  /(?=<div\sstyle.*border:none.*border-top:solid.*>)/m, // outlook div seperator TODO: figure out why this work on the server
  /(?=<div\b[^>]*class="gmail_attr">)/m, // gmail text seperator top
  /(?=<div\b[^>]*class="moz-cite-prefix">)/m, // i dont know where this come from maybe thunderbolt mozilla
  /(?=<div.*border-right:none.*border-top:1pt solid.*>)/m, // gmail div seperator
  /-{1,10}\sOriginal meddelelse\s-{1,10}/m, // common seperator phrases
  /(?=<div>\s<div.*border-top:\ssolid\s#B5C4DF\s?.*>)/m, // i dont know where
  /-{1,10}\sVideresendt meddelelse\s-{1,10}/m, // common seperator phrases
]
  .map((regex) => new RegExp(regex).source)
  .join("|");

const regExForBody = new RegExp(seperators, "gm");

const ValidateEmails = (props: Props) => {
  const { open, close, timeline_id } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const emailsToValidate = useAppSelector(state =>
    state.timeline.get("emailsToValidate")
  );
  const splitElements = useAppSelector(state => state.timeline.get("splitElements"));
  const loadingsT = useAppSelector(state => state.timeline.get("loadings"));


  const [workingEmailToValidate, setWorkingEmailToValidate] = useState("");


  const [picker, setPicker] = useState<ElementPicker | null>(null);

  const [splitting, setSplitting] = useState(false);

  useEffect(() => {
    const _picker = new ElementPicker();
    setPicker(_picker);
    return () => {
      if (picker) {
        picker.stop();
      }
    };
  }, []);

  const handleClose = () => {
    dispatch(clearSplitting);
    if (picker) {
      picker.stop();
    }
    close();
  };


  const split = () => {
    if (picker) {
      setSplitting(prevVal => !prevVal);
      if (splitting) {
        picker.stop();
      } else {
        picker.start({
          onClick: el => {
            const splitElContainer = getSplitElement(t("emails.split_text"));

            if (el.className.includes("splitting_element")) {
              if (el.className === "splitting_element") {
                dispatch(removeEmailSplit(el.nextElementSibling?.outerHTML));
                el.remove();
              } else if (el.className === "splitting_element_innerDiv") {
                dispatch(removeEmailSplit(el.parentElement?.nextElementSibling?.outerHTML));
                el.parentElement?.remove();
              } else {
                dispatch(removeEmailSplit(el.parentElement?.parentElement?.nextElementSibling?.outerHTML));
                el.parentElement?.parentElement?.remove();
              }
            } else {
              const currEmail = document.getElementById("elementPickerContainer");
              Array.from(document.querySelectorAll('.auto_splitting_element')).map(x => x.remove);
              dispatch(addCurrSplittingEmail(currEmail?.outerHTML));

              const getSplitVal = traverseParentsUntilUniqueSplit(el, currEmail?.outerHTML);

              dispatch(addEmailSplit(getSplitVal));

              el.parentNode?.insertBefore(splitElContainer, el);
            }
          },
          elementFilter: (el) => {
            const currEmail = document.getElementById("elementPickerContainer")?.outerHTML;
            return elementFilter(el, currEmail);
          }
        });
      }
    }
  };

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === emailsToValidate.size - 1) {
      handleClose();
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const user = useAuth0().user as User;


  const handleSaveAndNext = () => {
    if (splitElements.size === 0) {
      handleNext();
    } else {
      const mails = splitElements.map(el => ({
        timeline_node_refference_id: emailsToValidate.get(activeStep).get("refference"),
        customSplit: el
      }));


      dispatch(customSplitUpload(user, timeline_id, mails, handleNext));
    }
  };

  const splitElement = useMemo(() => getSplitElement(t("emails.split_text"), "#73B1FF", true).outerHTML, []);

  useEffect(() => {
    console.log(emailsToValidate.get(activeStep).get("html"));
    const initSplittings = emailsToValidate.get(activeStep).get("html").split(regExForBody).join(splitElement);
    setWorkingEmailToValidate(initSplittings);
  }, [activeStep]);


  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch=""
        title={t("email")}
        expanded
        width={632}
        closeForm={handleClose}
      >
        <div className={classes.createElementContainer}>
          <Paper style={{ backgroundColor: "#E7F2FF", padding: 10 }}>
            <Typography style={{ fontWeight: "bold", fontSize: 14 }}>
              {t("emails.init_split_description")}
            </Typography>
          </Paper>
        </div>
        {emailsToValidate.size > 1 && <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
          {emailsToValidate.map((label, index) => (
            <Step key={label?.get("refference")}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                {`${t("generic.email")} - ${
                  index !== undefined ? index + 1 : ""
                }`}
              </StepLabel>
            </Step>
          ))}
        </Stepper>}
        <div
          className={classes.createElementContainer}
          style={{ maxHeight: "50vh", cursor: splitting ? "crosshair" : "auto" }}
        >

          <div
            id="elementPickerContainer"
            dangerouslySetInnerHTML={{ __html: workingEmailToValidate }}
            className={classes.emailContent}
          />
        </div>

        <div
          className={css.buttonArea}
          style={

            { justifyContent: "space-between", display: "flex" }

          }
        >
          <Button type="button" onClick={handleClose}>
            {t("generic.close")}
          </Button>
          <div>
            <Tooltip title={`${t("emails.split_explainer")}`}>
              <Button type="button" onClick={split}>
                {splitting ? t("emails.stop_split") : t("emails.split")}
              </Button>
            </Tooltip>

            <Button type="button" onClick={handleSaveAndNext}>
              {loadingsT.get("post") ? (
                <CircularProgress />
              ) : (
                activeStep === emailsToValidate.size - 1 ? t("generic.save") : t("generic.save_and_next")
              )}

            </Button>
          </div>


        </div>
      </FloatingPanel>
    </div>
  );
};

export default ValidateEmails;
