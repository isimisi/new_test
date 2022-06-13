import { ITimelineNode } from "@customTypes/reducers/timeline";
import { Typography, Button } from "@material-ui/core";
import { t } from "i18next";
import moment from "moment";
import React from "react";
import useStyles from "../timeline.jss";
import EmailIcon from "@material-ui/icons/Email";
import save from "save-file";

interface Props {
  timelineNode: ITimelineNode;
}

const Email = ({ timelineNode }: Props) => {
  const classes = useStyles();
  const email = timelineNode.get("email").get("mail");
  const index = timelineNode.get("email").get("index");

  const downloadAttachment = file => {
    save(file.get("content").get("data"), file.get("filename"));
  };

  return (
    <>
      <div>
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
      {index === null && email.get("attachments").size > 0 && (
        <div className={classes.attachmentContainer}>
          {email.get("attachments").map(attachment => (
            <Button
              key={attachment.cid}
              type="button"
              variant="outlined"
              onClick={() => downloadAttachment(attachment)}
            >
              <EmailIcon style={{ marginRight: 10 }} />
              {attachment.get("filename")}
            </Button>
          ))}
        </div>
      )}
      <div>
        <div dangerouslySetInnerHTML={{ __html: email.get("html") }} />
      </div>
    </>
  );
};
export default Email;
