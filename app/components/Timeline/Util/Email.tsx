/* eslint-disable no-return-assign */
import { ITimelineNode } from "@customTypes/reducers/timeline";
import { Typography, Button } from "@material-ui/core";

import moment from "moment";
import { useAuth0, User } from "@auth0/auth0-react";

import React, { useEffect, useState } from "react";
import useStyles from "../timeline.jss";
import EmailIcon from "@material-ui/icons/Email";
import save from "save-file";
import axios from "axios";
import { authHeader, baseUrl } from "@api/constants";
import Loader from "@components/Loading/LongLoader";
import { useTranslation } from "react-i18next";


interface Props {
  timelineNode: ITimelineNode;

}

const Email = ({ timelineNode }: Props) => {
  const classes = useStyles();

  const { t } = useTranslation();

  const index = timelineNode.get("email").get("index");
  const customSplit = timelineNode.get("email").get("customSplit");


  const id = timelineNode.get("id");

  const downloadAttachment = file => {
    save(file.content.data, file.filename);
  };

  const [email, setEmail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const user = useAuth0().user as User;


  useEffect(() => {
    if (typeof timelineNode.get("email").get("mail") === "boolean") {
      const header = authHeader(user);
      setLoading(true);
      axios
        .get(`${baseUrl}/timelinenodes/emailcontent/${id}`, header)
        .then(res => {
          setEmail(res.data);
          setLoading(false);
        });
    } else {
      setEmail(timelineNode.get("email").get("mail").toJS());
      setLoading(false);
    }
  }, [id]);


  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%"
        }}
      >
        <Loader size="30%" />
      </div>
    );
  }

  return (
    <>
      <div>
        {index === null && customSplit === null && (
          <div>
            <div className={classes.flex}>
              <Typography className={classes.type}>
                {t("emails.from")}
              </Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: email?.from?.html
                }}
              />
            </div>
            <div className={classes.flex}>
              <Typography className={classes.type}>{t("emails.to")}</Typography>
              <div
                dangerouslySetInnerHTML={{
                  __html: email?.to?.html
                }}
              />
            </div>

            <div className={classes.flex}>
              <Typography className={classes.type}>
                {t("emails.subject")}
              </Typography>
              <Typography className={classes.content}>
                {email?.subject}
              </Typography>
            </div>
            <div className={classes.flex}>
              <Typography className={classes.type}>
                {t("emails.send")}
              </Typography>
              <Typography className={classes.content}>
                {moment(email?.date).format("DD/MM/YYYY")}
              </Typography>
            </div>
          </div>
        )}
      </div>
      {index === null && email?.attachments?.length > 0 && (
        <div className={classes.attachmentContainer}>
          {email.attachments.map(attachment => (
            <Button
              key={attachment.cid}
              type="button"
              style={{ margin: 5 }}
              variant="outlined"
              onClick={() => downloadAttachment(attachment)}
            >
              <EmailIcon style={{ marginRight: 10 }} />
              {attachment.filename}
            </Button>
          ))}
        </div>
      )}
      <div>
        <div
          id="elementPickerContainer"
          dangerouslySetInnerHTML={{ __html: email.html }}
          className={classes.emailContent}
        />
      </div>
    </>
  );
};
export default Email;
