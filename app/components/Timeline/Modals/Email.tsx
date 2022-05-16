/* eslint-disable no-param-reassign */
import React from "react";

import { useTranslation } from "react-i18next";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";

import { ITimelineNode } from "@customTypes/reducers/timeline";
import EmailContent from "../Util/Email";

interface Props {
  open: boolean;
  close: () => void;
  timelineNode: ITimelineNode;
}

const Email = (props: Props) => {
  const { open, close, timelineNode } = props;

  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch=""
        title={t("email")}
        expanded
        width={632}
        closeForm={close}
      >
        <div className={classes.createElementContainer}>
          <EmailContent timelineNode={timelineNode} />
        </div>
        <div className={css.buttonArea}>
          <Button type="button" onClick={close}>
            {t("generic.close")}
          </Button>
        </div>
      </FloatingPanel>
    </div>
  );
};

export default Email;
