/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";

import { ITimelineNode } from "@customTypes/reducers/timeline";
import EmailContent from "../Util/Email";
import { ElementPicker } from "../Util/ElementPicker";
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

const Email = (props: Props) => {
  const { open, close, timelineNode, } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const splitElements = useAppSelector(state => state.timeline.get("splitElements"));

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
      setSplitting(prevVal => !prevVal);
      if (splitting) {
        picker.stop();
      } else {
        picker.start({
          onClick: el => {
            const splitElContainer = document.createElement("div");
            splitElContainer.style.height = "8px";
            splitElContainer.style.width = "82%";
            splitElContainer.style.display = "flex";
            splitElContainer.style.position = "relative";
            splitElContainer.style.alignItems = "center";
            splitElContainer.id = "splitting_element";
            splitElContainer.style.borderTop = "4px dashed #73B1FF";

            const splitTextContainer = document.createElement("div");
            splitTextContainer.style.position = "absolute";
            splitTextContainer.style.right = "1px";
            splitTextContainer.style.top = "1px";
            splitTextContainer.style.padding = "5px";
            splitTextContainer.style.position = "absolute";
            splitTextContainer.style.right = "-120px";
            splitTextContainer.style.top = "-14px";
            splitTextContainer.style.backgroundColor = "#73B1FF";
            splitTextContainer.style.borderRadius = "6px";
            splitTextContainer.id = "splitting_element_innerDiv";


            const splitText = document.createElement("p");
            splitText.innerText = t("emails.split_text");
            splitText.style.width = "100%";
            splitText.style.color = "white";
            splitText.style.margin = "auto";
            splitText.style.fontSize = "10px";
            splitText.id = "splitting_element_innerText";

            splitTextContainer.appendChild(splitText);

            splitElContainer.appendChild(splitTextContainer);

            if (el.id.includes("splitting_element")) {
              if (el.id === "splitting_element") {
                dispatch(removeEmailSplit(el.nextElementSibling?.outerHTML));
                el.remove();
              } else if (el.id === "splitting_element_innerDiv") {
                dispatch(removeEmailSplit(el.parentElement?.nextElementSibling?.outerHTML));
                el.parentElement?.remove();
              } else {
                dispatch(removeEmailSplit(el.parentElement?.parentElement?.nextElementSibling?.outerHTML));
                el.parentElement?.parentElement?.remove();
              }
            } else {
              el.parentNode?.insertBefore(splitElContainer, el);

              dispatch(addCurrSplittingEmail(document.getElementById("elementPickerContainer")?.outerHTML));
              dispatch(addEmailSplit(el.outerHTML));
            }
          },
          elementFilter: el => {
            let childOfHtmlDiv = false;
            for (let p = el && el.parentElement; p; p = p.parentElement) {
              if (p.id === "elementPickerContainer") {
                childOfHtmlDiv = true;
              }
            }

            return childOfHtmlDiv;
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
          style={{ maxHeight: "60vh", cursor: splitting ? "crosshair" : "auto" }}
        >
          <EmailContent timelineNode={timelineNode} />
        </div>
        <div className={css.buttonArea}>
          <Tooltip title={`${t("emails.split_explainer")}`}>
            <Button type="button" onClick={splitElements.size > 0 ? walkThrough : split}>
              {splitElements.size > 0 ? t("emails.walk_through") : splitting ? t("emails.stop_split") : t("emails.split")}
            </Button>
          </Tooltip>
          <Button type="button" onClick={handleClose}>
            {t("generic.close")}
          </Button>
        </div>
      </FloatingPanel>
    </div>
  );
};

export default Email;
