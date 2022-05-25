import { ITimelineNode } from "@customTypes/reducers/timeline";
import { Typography, Button } from "@material-ui/core";
import { t } from "i18next";
import moment from "moment";
import React from "react";
import useStyles from "../timeline.jss";

import save from "save-file";

interface Props {
  timelineNode: ITimelineNode;
}

const Email = ({ timelineNode }: Props) => {
  const classes = useStyles();
  const email = timelineNode.get("email").get("mail");
  const index = timelineNode.get("email").get("index");

  const downloadAttachment = file => {
    save(file.content.data, file.filename);
  };
  console.log(index);
  return (
    <>
      <div>
        {index === null && (
          <Typography variant="subtitle1" className={classes.emailTitle}>
            {t("emails.header")}
          </Typography>
        )}
        {index === null && (
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
              <Typography className={classes.type}>{t("emails.to")}</Typography>
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
        )}
      </div>
      {index === null && email.get("attachments").length > 0 && (
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
    </>
  );
};
export default Email;
