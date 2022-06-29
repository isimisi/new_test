/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";

import {
  DocumentCleanOption,

} from "@customTypes/reducers/document";
import { MixedPersonOptions } from "@customTypes/reducers/person";
import { useAppSelector } from "@hooks/redux";
import Button from "@material-ui/core/Button";
import css from "@styles/Form.scss";

import { useTranslation } from "react-i18next";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";

import { ITimelineNode, TimelineNode } from "@customTypes/reducers/timeline";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTheme } from "@material-ui/core/styles";


import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { List } from "immutable";
import CreateForm from "../Util/CreateForm";

interface Props {
  open: boolean;
  close: () => void;
  onSave: (alternativeCloseFunc?: () => void, customSplit?: string) => void;
  personOptions: MixedPersonOptions[];
  documentOptions: DocumentCleanOption[];
  openPerson: (id: string, name?: string) => void;
  openDocument: (id: string, name?: string) => void;
  timelineNode: ITimelineNode;
  changeTimelineNode: (
    attr: keyof TimelineNode,
    val: TimelineNode[keyof TimelineNode]
  ) => void;
  handleDelete: () => void;
  isUpdatingNode: boolean;
  currSplittingEmail: null | string;
  splitElements: List<string>;
}


const GoThroughSplit = (props: Props) => {
  const {
    open,
    close,
    onSave,
    personOptions,
    documentOptions,
    openPerson,
    openDocument,
    timelineNode,
    changeTimelineNode,
    handleDelete,
    isUpdatingNode,
    currSplittingEmail,
    splitElements
  } = props;
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === splitElements.size - 1) {
      close();
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };


  const branch = "";
  const { t } = useTranslation();

  const date = timelineNode.get("date");
  const title = timelineNode.get("title");

  const theme = useTheme();
  const loadingsT = useAppSelector(state => state.timeline.get("loadings"));

  const getHtmlIfCurrSplitting = () => {
    const splittedHtml = currSplittingEmail?.split(splitElements.get(activeStep));
    if (splittedHtml) {
      return splitElements.get(activeStep) + splittedHtml[splittedHtml.length - 1];
    }
    return "";
  };

  const [currSplittingHtmlContent, setCurrSplittingHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    if (currSplittingEmail) {
      setCurrSplittingHtmlContent(getHtmlIfCurrSplitting()); 8;
    }
  }, [activeStep, currSplittingEmail, splitElements]);

  const handleSaveAndNext = () => {
    onSave(handleNext, splitElements.get(activeStep));
  };


  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        title={t("timeline.create_element")}
        expanded
        width="80%"
        closeForm={close}
      >
        <div>
          <div>

            <Stepper activeStep={activeStep}>
              {splitElements.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: { optional?: React.ReactNode } = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>
                      {`${t("generic.email")} - ${
                        index !== undefined ? index + 1 : ""
                      }`}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>


            <div style={{ display: "flex", maxHeight: "60vh" }}>
              {currSplittingEmail && currSplittingHtmlContent && (
                <Paper
                  style={{
                    width: "100%",
                    margin: 20,
                    padding: 10,
                    overflowY: "scroll"
                  }}
                >

                  <div
                    dangerouslySetInnerHTML={{
                      __html: currSplittingHtmlContent
                    }}
                    className={classes.emailContent}
                  />

                </Paper>
              )}
              <CreateForm
                personOptions={personOptions}
                documentOptions={documentOptions}
                openPerson={openPerson}
                openDocument={openDocument}
                timelineNode={timelineNode}
                changeTimelineNode={changeTimelineNode}
                showMailButton
                dontShowContent
              />
            </div>
          </div>
          <div
            className={css.buttonArea}
            style={
              isUpdatingNode
                ? { justifyContent: "space-between", display: "flex" }
                : {}
            }
          >
            {isUpdatingNode && (
              <Button
                variant="contained"
                type="button"
                onClick={handleDelete}
                style={{
                  backgroundColor: theme.palette.error.main,
                  color: "white",
                  marginRight: 10
                }}
              >
                Slet
              </Button>
            )}
            <div>
              <Button type="button" onClick={close}>
                {t("workspaces.workspace-form.btn_cnx")}
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="button"
                disabled={!date || title.length === 0 || loadingsT.get("post")}
                onClick={handleSaveAndNext}
              >
                {loadingsT.get("post") ? (
                  <CircularProgress />
                ) : (
                  t("generic.save_and_next")
                )}
              </Button>
            </div>
          </div>
        </div>
      </FloatingPanel>
    </div>
  );
};

export default GoThroughSplit;
