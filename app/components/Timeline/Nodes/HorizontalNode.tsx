/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import React, { memo, useCallback, useState } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import useStyles from "../timeline.jss";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Avatar from "react-nice-avatar";
import MaterialAvatar from "@material-ui/core/Avatar";
import DescriptionIcon from "@material-ui/icons/Description";
import classnames from "classnames";
import MailIcon from "@material-ui/icons/Mail";
import NoteIcon from "@material-ui/icons/Note";
import Filter1Icon from "@material-ui/icons/Filter1";
import Filter2Icon from "@material-ui/icons/Filter2";
import Filter3Icon from "@material-ui/icons/Filter3";
import Filter4Icon from "@material-ui/icons/Filter4";
import Filter5Icon from "@material-ui/icons/Filter5";
import Filter6Icon from "@material-ui/icons/Filter6";
import Filter7Icon from "@material-ui/icons/Filter7";
import Filter8Icon from "@material-ui/icons/Filter8";
import Filter9Icon from "@material-ui/icons/Filter9";
import Filter9PlusIcon from "@material-ui/icons/Filter9Plus";
import moment from "moment";
import { useAppDispatch } from "@hooks/redux";
import {
  changeTimelineNodeKey,
  createElementChange,
  downloadDocument,
  openEmailChange,
  setTimelineNode,
  timelineElementDocumentChange,
  timelineElementPersonChange
} from "@pages/Timelines/reducers/timelineActions";
import { useTranslation } from "react-i18next";
import EditIcon from "@material-ui/icons/Edit";
import ButtonBase from "@material-ui/core/ButtonBase";
import { showPerson } from "@pages/Persons/reducers/personActions";
import { useAuth0, User } from "@auth0/auth0-react";
import Linkify from "react-linkify";

const moreDocsMapping = [
  Filter1Icon,
  Filter2Icon,
  Filter3Icon,
  Filter4Icon,
  Filter5Icon,
  Filter6Icon,
  Filter7Icon,
  Filter8Icon,
  Filter9Icon,
  Filter9PlusIcon
];

export default memo(({ data }: NodeProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const user = useAuth0().user as User;

  const onEditClick = () => {
    dispatch(setTimelineNode(data.id));
    dispatch(createElementChange(true));
  };

  const [showEdit, setShowEdit] = useState(false);
  const handelShowEdit = useCallback(() => {
    setShowEdit(true);
  }, []);
  const handelHideEdit = useCallback(() => {
    setShowEdit(false);
  }, []);

  // const openDocument = () => dispatch(timelineElementDocumentChange(true));
  // const handleOpenDocument = id => {
  //   dispatch(showDocument(user, id, openDocument));
  // };

  const download = (title: string, id: string) => {
    dispatch(downloadDocument(user, title, id));
  };

  const openEmail = () => {
    dispatch(setTimelineNode(data.id));
    dispatch(changeTimelineNodeKey(data.email, "email"));
    dispatch(openEmailChange(true));
  };

  const handleContentCLick = () => {
    if (data.email.mail) {
      openEmail();
    } else {
      console.log("document");
    }
  };

  const openPerson = () => dispatch(timelineElementPersonChange(true));
  const handleOpenPerson = id => {
    dispatch(showPerson(user, id, openPerson));
  };

  const downHaveTime = moment(data.date).format("HH:mm") === "00:00";

  return (
    <div
      className="nodrag"
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center"
      }}
      onMouseOver={handelShowEdit}
      onFocus={handelShowEdit}
      onMouseLeave={handelHideEdit}
      onBlur={handelHideEdit}
    >
      <Paper
        className={classnames("nodrag", classes.horizontalNodeOffTimeLine)}
      >
        <div
          style={{
            margin: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {showEdit && (
              <Tooltip arrow title={`${t("generic.edit")}`} placement="top">
                <IconButton size="small" onClick={onEditClick}>
                  <EditIcon style={{ fontSize: 12 }} />
                </IconButton>
              </Tooltip>
            )}
            {/* <CustomSwitchFlow
              checked={extract}
              name="includeInExtract"
              onChange={handleExtract}
            />
            <Typography style={{ fontSize: 6, color: "gray", marginLeft: 3 }}>
              Ekstrakt
            </Typography> */}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {data.persons.length > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: 10,
                  justifyContent: "space-between"
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {data.persons.map((person, index) => {
                    if (index === 3) {
                      return (
                        <Tooltip
                          arrow
                          title={data.persons
                            .map(p => p.name)
                            .slice(3)
                            .join(", ")}
                          placement="top"
                        >
                          <div style={{ cursor: "pointer", margin: "0 2px" }}>
                            <MaterialAvatar
                              style={{ width: 20, height: 20, fontSize: 8 }}
                            >
                              {`${data.persons.length - 3}+`}
                            </MaterialAvatar>
                          </div>
                        </Tooltip>
                      );
                    }

                    if (index > 3) {
                      return null;
                    }

                    return (
                      <Tooltip
                        arrow
                        title={`${person.name} ${
                          person.affiliation
                            ? "(" + person.affiliation + ")"
                            : ""
                        }`}
                        placement="top"
                      >
                        <div
                          style={{ cursor: "pointer", margin: "0 2px" }}
                          onClick={() => handleOpenPerson(person.id)}
                        >
                          <Avatar
                            style={{ width: 20, height: 20 }}
                            {...JSON.parse(person.person_icon)}
                          />
                        </div>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            )}
            <Tooltip arrow title={`${t("generic.more")}`} placement="top">
              <IconButton size="small">
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        <Divider />
        <Typography
          variant="subtitle1"
          style={{ margin: 10, fontWeight: "bold" }}
        >
          {data.label}
        </Typography>
        <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <a target="blank" href={decoratedHref} key={key}>
              {decoratedText}
            </a>
          )}
        >
          <Typography
            style={{ marginLeft: 10, fontSize: "0.8rem", marginRight: 10 }}
          >
            {data.description}
          </Typography>
        </Linkify>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: 10
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",

              justifyContent: "space-between"
            }}
          >
            <Tooltip
              arrow
              title={`${
                data.email.mail
                  ? t("timeline.see_email")
                  : t("timeline.see_content")
              }`}
              placement="top"
            >
              <IconButton
                size="small"
                onClick={handleContentCLick}
                style={{ right: 3 }}
              >
                {data.email.mail ? <MailIcon /> : <NoteIcon />}
              </IconButton>
            </Tooltip>
          </div>
          {data.documents.length > 0 && (
            <div>
              {data.documents.map((document, index) => {
                if (index === 3) {
                  const MoreDocs = moreDocsMapping[data.documents.length - 4];

                  return (
                    <Tooltip
                      arrow
                      title={data.documents.slice(3).join(", ")}
                      placement="top"
                    >
                      <IconButton size="small">
                        <MoreDocs />
                      </IconButton>
                    </Tooltip>
                  );
                }

                if (index > 3) {
                  return null;
                }

                return (
                  <Tooltip arrow title={document.title} placement="top">
                    <IconButton
                      size="small"
                      onClick={() => download(document.title, document.id)}
                    >
                      <DescriptionIcon />
                    </IconButton>
                  </Tooltip>
                );
              })}
            </div>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
            display: "flex",
            alignItems: "center"
          }}
        >
          {data.tags.map(tag => (
            <Tooltip arrow title={tag.name} placement="top" key={tag.id}>
              <div
                style={{
                  backgroundColor: tag.color,
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  margin: 1
                }}
              />
            </Tooltip>
          ))}
        </div>
      </Paper>

      <Paper className={classes.horizontalNodeOnTimeLine}>
        <ButtonBase className={classes.itemButton} onClick={onEditClick} />
        <Typography
          variant="subtitle1"
          className={classes.horizontalDate}
          id="nodeLabel"
        >
          {moment(data.date).isValid()
            ? `${moment(data.date).format("DD/MM-YYYY")}${
              downHaveTime ? "" : ", kl."
            } ${downHaveTime ? "" : moment(data.date).format("HH:mm")}`
            : t("node.no_date")}
        </Typography>
        <Handle
          type="target"
          style={{ left: 1 }}
          position={Position.Left}
          className={classes.horizontalHandle}
        />
        <Handle
          type="source"
          position={Position.Right}
          style={{ right: 1 }}
          className={classes.horizontalHandle}
        />
      </Paper>
    </div>
  );
});
