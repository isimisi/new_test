/* eslint-disable no-param-reassign */
import React from "react";

import { useTranslation } from "react-i18next";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";

import { ITimelineNode } from "@customTypes/reducers/timeline";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import save from "save-file";

interface Props {
  open: boolean;
  close: () => void;
  timelineNode: ITimelineNode;
}

const Email = (props: Props) => {
  const { open, close, timelineNode } = props;

  const classes = useStyles();

  const email = timelineNode.get("email").get("mail");
  console.log(email.get("from").get("html"));
  const { t } = useTranslation();

  const downloadAttachment = file => {
    save(file.content.data, file.filename);
  };

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
          <div>
            <Typography variant="subtitle1" className={classes.emailTitle}>
              {t("emails.header")}
            </Typography>
            <div>
              <div className={classes.flex}>
                <Typography className={classes.type}>
                  {t("emails.from")}
                </Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: email.get("from").get("html")
                  }}
                />
              </div>
              <div className={classes.flex}>
                <Typography className={classes.type}>
                  {t("emails.to")}
                </Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: email.get("to").get("html")
                  }}
                />
              </div>

              <div className={classes.flex}>
                <Typography className={classes.type}>
                  {t("emails.subject")}
                </Typography>
                <Typography className={classes.content}>
                  {email.get("subject")}
                </Typography>
              </div>
              <div className={classes.flex}>
                <Typography className={classes.type}>
                  {t("emails.send")}
                </Typography>
                <Typography className={classes.content}>
                  {moment(email.get("date")).format("DD/MM/YYYY")}
                </Typography>
              </div>
            </div>
          </div>
          {email.get("attachments").length > 0 && (
            <div>
              <Typography variant="subtitle1" className={classes.emailTitle}>
                {t("emails.attachments")}
              </Typography>
              {email.get("attachments").map(attachment => (
                <Button
                  key={attachment.cid}
                  type="button"
                  onClick={() => downloadAttachment(attachment)}
                >
                  {attachment.get("filename")}
                </Button>
              ))}
            </div>
          )}
          <div>
            <Typography variant="subtitle1" className={classes.emailTitle}>
              {t("emails.body")}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: email.get("html") }} />
          </div>
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
