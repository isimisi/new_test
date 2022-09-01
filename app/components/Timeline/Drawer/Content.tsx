/* eslint-disable default-case */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useTranslation } from "react-i18next";

import { DocumentCleanOption } from "@customTypes/reducers/document";

import { useAppDispatch } from "@hooks/redux";
import { ITimelineNode, TimelineNode } from "@customTypes/reducers/timeline";
import { MixedPersonOptions } from "@customTypes/reducers/person";
import useStyles from "../timeline.jss";
import { useTheme } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import NoContent from "@components/NoContent";
import Typography from "@material-ui/core/Typography";
import { stringToColor, stringAvatar } from "@pages/Timelines/constants";

import moment from "moment";
import Email from "../Util/Email";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

import IconButton from "@material-ui/core/IconButton";
import DescriptionIcon from "@material-ui/icons/Description";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import Divider from "@material-ui/core/Divider";
import Linkify from "react-linkify";

import {
  timelineElementDocumentChange,
  timelineElementPersonChange
} from "@pages/Timelines/reducers/timelineActions";

import { showPerson } from "@pages/Persons/reducers/personActions";
import { useAuth0, User } from "@auth0/auth0-react";
import { showDocument } from "@pages/Documents/reducers/documentActions";
import CreateForm from "../Util/CreateForm";
import Avatar from "@material-ui/core/Avatar";

interface Props {
  onSave: () => void;
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
  handleEdit: (bool: boolean) => void;
  handleOpenEmail: () => void;
  handleDocumentOpen: (id: string, name?: string) => void;
}

function Content(props: Props) {
  const {
    onSave,
    personOptions,
    documentOptions,
    openPerson,
    openDocument,
    timelineNode,
    changeTimelineNode,
    handleDelete,
    isUpdatingNode,
    handleEdit,
    handleOpenEmail,
    handleDocumentOpen
  } = props;

  const { t } = useTranslation();

  const nodeId = timelineNode.get("id");
  const date = timelineNode.get("date");
  const title = timelineNode.get("title");
  const description = timelineNode.get("description");
  const content = timelineNode.get("content");
  const email = timelineNode.get("email").get("mail");
  const persons = timelineNode.get("persons").toJS();
  const documents = timelineNode.get("documents").toJS();
  const tags = timelineNode.get("tags").toJS();

  const classes = useStyles();
  const theme = useTheme();

  const rawContentState = convertToRaw(content.getCurrentContent());
  const markup = draftToHtml(rawContentState);

  const user = useAuth0().user as User;
  const dispatch = useAppDispatch();

  const handleOpenPersonNonEdit = (id) => {
    dispatch(
      showPerson(user, id, () => dispatch(timelineElementPersonChange(true)))
    );
  };

  const handleOpenDocumentNonEdit = (id) => {
    dispatch(
      showDocument(user, id, () =>
        dispatch(timelineElementDocumentChange(true))
      )
    );
  };

  const handleSave = () => onSave();
  const downHaveTime = moment(date).format("HH:mm") === "00:00";

  return (
    <div className={classes.contentContainer}>
      {isUpdatingNode ? (
        <>
          <div style={{ height: "100%" }}>
            <CreateForm
              personOptions={personOptions}
              documentOptions={documentOptions}
              openPerson={openPerson}
              openDocument={openDocument}
              timelineNode={timelineNode}
              changeTimelineNode={changeTimelineNode}
              showMailButton={Boolean(email)}
            />
          </div>

          {email && (
            <div
              className={classes.contentInnerContainer}
              style={{ marginBottom: 50 }}
            >
              <Email timelineNode={timelineNode} />
            </div>
          )}
        </>
      ) : (
        <div
          className={classes.contentInnerContainer}
          style={{ marginBottom: 50 }}
        >
          {nodeId.length === 0 ? (
            <div className={classes.noContent}>
              <NoContent text={t("timeline.no_choosen_node")} elevation={0} />
              {" "}
            </div>
          ) : (
            <div>
              <Grid container spacing={3} direction="row">
                <Grid item xs={12} md={9}>
                  <Paper
                    style={{
                      display: "inline-block",
                      padding: 3,
                      marginBottom: 10,
                      backgroundColor: theme.palette.primary.main,
                      boxShadow: "none"
                    }}
                  >
                    <Typography className={classes.verticalDate}>
                      {moment(date).isValid()
                        ? `${moment(date).format("DD/MM-YYYY")}${
                            downHaveTime ? "" : ", kl."
                          } ${downHaveTime ? "" : moment(date).format("HH:mm")}`
                        : t("node.no_date")}
                    </Typography>
                  </Paper>
                  <Typography variant="h6" className={classes.verticalTitle}>
                    {title}
                  </Typography>
                  <Linkify
                    // eslint-disable-next-line react/no-unstable-nested-components
                    componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a target="blank" href={decoratedHref} key={key}>
                        {decoratedText}
                      </a>
                    )}
                  >
                    <Typography className={classes.verticalDescription}>
                      {description}
                    </Typography>
                  </Linkify>
                </Grid>
                <Grid item xs={12} md={3}>
                  {(persons.length !== 0 || documents.length !== 0) && (
                    <div className={classes.peopleAndDocumentsContainer}>
                      <div className={classes.personDiv}>
                        {persons.map((person) => (
                          <Tooltip arrow title={person.name} placement="top">
                            <div
                              style={{ cursor: "pointer", margin: 2 }}
                              onClick={() => handleOpenPersonNonEdit(person.id)}
                            >
                              {/* @ts-ignore */}
                              <Avatar
                                style={{
                                  width: 30,
                                  height: 30,
                                  backgroundColor: stringToColor(
                                    person.name || person.email
                                  ),
                                  fontSize: 12
                                }}
                                {...stringAvatar(person.name, person.email)}
                              />
                            </div>
                          </Tooltip>
                        ))}
                      </div>
                      {persons.length > 0 && documents.length > 0 && (
                        <div className={classes.personAndDocsDivider} />
                      )}
                      <div className={classes.personDiv}>
                        {documents.map((document) => (
                          <Tooltip arrow title={document.title} placement="top">
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleOpenDocumentNonEdit(document.id)
                              }
                            >
                              <DescriptionIcon style={{ fontSize: 25 }} />
                            </IconButton>
                          </Tooltip>
                        ))}
                      </div>
                      <div className={classes.personDiv}>
                        {tags.map((tag) => (
                          <Tooltip
                            arrow
                            title={tag.name}
                            placement="top"
                            key={tag.id}
                          >
                            <div
                              style={{
                                backgroundColor: tag.color,
                                width: 22,
                                height: 22,
                                borderRadius: 11,
                                margin: 3
                              }}
                            />
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  )}
                </Grid>
              </Grid>
              <Divider className={classes.contentDivider} />
              {!email && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: markup
                  }}
                />
              )}

              {email && <Email timelineNode={timelineNode} />}
            </div>
          )}
        </div>
      )}
      <div className={classes.buttonGroup}>
        {nodeId.length > 0 && (
          <>
            <Button
              type="button"
              style={{
                backgroundColor: theme.palette.error.main,
                color: "white",
                marginRight: 10
              }}
              onClick={handleDelete}
            >
              {t("generic.delete")}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => handleEdit(!isUpdatingNode)}
            >
              {isUpdatingNode ? t("generic.stop_edit") : t("generic.edit")}
            </Button>
            {isUpdatingNode && (
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginLeft: 10
                }}
                type="button"
                onClick={handleSave}
              >
                {t("generic.save")}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Content;
