/* eslint-disable no-return-assign */

import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";

import { ITimelineNode } from "@customTypes/reducers/timeline";
import EmailContent from "../Util/Email";
import {
  elementFilter,
  ElementPicker,
  getSplitElement,
  traverseParentsUntilUniqueSplit
} from "../Util/ElementPicker";
import Tooltip from "@material-ui/core/Tooltip";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import {
  addCurrSplittingEmail,
  addEmailSplit,
  clearSplitting,
  createElementChange,
  goThroughSplitChange,
  removeEmailSplit,
  setTimelineNode
} from "@pages/Timelines/reducers/timelineActions";

interface Props {
  open: boolean;
  close: () => void;
  timelineNode: ITimelineNode;
}

function Email(props: Props) {
  const { open, close, timelineNode } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const splitElements = useAppSelector((state) =>
    state.timeline.get("splitElements")
  );

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

  const walkThrough = () => {
    picker?.stop();
    close();
    dispatch(setTimelineNode(null));
    dispatch(goThroughSplitChange(true));
  };

  const split = () => {
    if (picker) {
      setSplitting((prevVal) => !prevVal);
      if (splitting) {
        picker.stop();
      } else {
        picker.start({
          onClick: (el) => {
            const splitElContainer = getSplitElement(t("emails.split_text"));

            if (el.className.includes("splitting_element")) {
              if (el.className === "splitting_element") {
                dispatch(removeEmailSplit(el.nextElementSibling?.outerHTML));
                el.remove();
              } else if (el.className === "splitting_element_innerDiv") {
                dispatch(
                  removeEmailSplit(
                    el.parentElement?.nextElementSibling?.outerHTML
                  )
                );
                el.parentElement?.remove();
              } else {
                dispatch(
                  removeEmailSplit(
                    el.parentElement?.parentElement?.nextElementSibling
                      ?.outerHTML
                  )
                );
                el.parentElement?.parentElement?.remove();
              }
            } else {
              const currEmail = document.getElementById(
                "elementPickerContainer"
              )?.outerHTML;

              dispatch(addCurrSplittingEmail(currEmail));

              const getSplitVal = traverseParentsUntilUniqueSplit(
                el,
                currEmail
              );

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
        <div
          className={classes.createElementContainer}
          style={{
            maxHeight: "60vh",
            cursor: splitting ? "crosshair" : "auto"
          }}
        >
          <EmailContent timelineNode={timelineNode} />
        </div>
        <div className={css.buttonArea}>
          <Tooltip title={`${t("emails.split_explainer")}`}>
            <Button
              type="button"
              onClick={splitElements.size > 0 ? walkThrough : split}
            >
              {splitElements.size > 0
                ? t("emails.walk_through")
                : splitting
                ? t("emails.stop_split")
                : t("emails.split")}
            </Button>
          </Tooltip>
          <Button type="button" onClick={handleClose}>
            {t("generic.close")}
          </Button>
        </div>
      </FloatingPanel>
    </div>
  );
}

export default Email;
