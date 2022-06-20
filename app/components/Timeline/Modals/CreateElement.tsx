/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import CreatableSelect from "react-select/creatable";
import EditIcon from "@material-ui/icons/Edit";
import { selectStyles } from "@api/ui/helper";
import { Editor } from "react-draft-wysiwyg";
import EmailIcon from "@material-ui/icons/Email";
import DeleteIcon from "@material-ui/icons/Delete";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { useDropzone } from "react-dropzone";
import {
  hanldeOnPersonChange,
  personMapping
} from "../../../containers/Pages/Persons/constants";
import { MixedPersonOptions } from "@customTypes/reducers/person";
import {
  DocumentCleanOption,
  MixedDocumentOptions
} from "@customTypes/reducers/document";
import { hanldeOnDocumentChange } from "../../../containers/Pages/Documents/constants";
import { useAppSelector } from "@hooks/redux";
import IconButton from "@material-ui/core/IconButton";

import CircularProgress from "@material-ui/core/CircularProgress";
import { ITimelineNode, TimelineNode } from "@customTypes/reducers/timeline";
import { useTheme } from "@material-ui/core/styles";

import daLocale from "date-fns/locale/da";
import enLocale from "date-fns/locale/en-US";
import axios from "axios";
import { baseUrl } from "@api/constants";
import Fab from "@material-ui/core/Fab";
import moment from "moment";
import Email from "../Util/Email";
import Paper from "@material-ui/core/Paper";

interface Props {
  open: boolean;
  close: () => void;
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
  handleOpenEmail: () => void;
}

const localeMap = {
  en: enLocale,
  da: daLocale
};

const CreateElement = (props: Props) => {
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
    handleOpenEmail
  } = props;
  const classes = useStyles();

  const branch = "";
  const { t, i18n } = useTranslation();

  const date = timelineNode.get("date");
  const time = timelineNode.get("time");

  const title = timelineNode.get("title");
  const description = timelineNode.get("description");
  const content = timelineNode.get("content");
  const email = timelineNode.get("email").get("mail");
  const persons = timelineNode.get("persons").toJS();
  const documents = timelineNode.get("documents").toJS();

  const theme = useTheme();
  const handleSetDate = d => {
    changeTimelineNode("date", d);
  };

  const handleSetTime = _t => {
    changeTimelineNode("time", _t);
  };

  const labelChange = e => changeTimelineNode("title", e.target.value);
  const descriptionChange = e =>
    changeTimelineNode("description", e.target.value);

  const handleChangePersons = (p: MixedPersonOptions[]) => {
    changeTimelineNode("persons", p);
  };

  const handleChangeDocuments = (p: MixedDocumentOptions[]) =>
    changeTimelineNode("documents", p);

  const onEditorStateChange = v => {
    changeTimelineNode("content", v);
  };

  const loadingsP = useAppSelector(state => state.person.get("loadings"));
  const loadingsD = useAppSelector(state => state.document.get("loadings"));
  const loadingsT = useAppSelector(state => state.timeline.get("loadings"));

  const handleOpenPerson = e => {
    const id = e.target.closest(".idDiv").getAttribute("data-id");

    const nameDiv = e.target.closest(".idDiv");
    const nameSpan = nameDiv.getElementsByTagName("span")[0];

    openPerson(id, nameSpan.innerHTML);
  };

  const handleOpenDocument = e => {
    const id = e.target.closest(".idDiv").getAttribute("data-id");

    const nameDiv = e.target.closest(".idDiv");
    const nameSpan = nameDiv.getElementsByTagName("span")[0];

    openDocument(id, nameSpan.innerHTML);
  };

  const handleSave = () => {
    onSave();
  };

  const [openMenuOnClick, setopenMenuOnClick] = useState(true);
  const handleMouseOverValue = () => {
    setopenMenuOnClick(false);
  };

  const handleMouseLeaveValue = () => {
    setopenMenuOnClick(true);
  };

  const [loadingEmail, setLoadingEmail] = useState(false);

  const readEmlFile = (file: File) => {
    setLoadingEmail(true);
    const url = `${baseUrl}/emailparser`;
    const body = new FormData();
    body.append("file_content", file);

    axios.post(url, body).then(res => {
      const { data } = res;
      changeTimelineNode("email", data);
      setLoadingEmail(false);
    });
  };

  const options = {
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      readEmlFile(file);
    },
    accept: ".eml, .msg",
    noClick: true,
    noKeyboard: true,
    maxFiles: 1
  };

  const { getRootProps, getInputProps, open: handleAddEmail } = useDropzone(
    options
  );

  const handleRemoveEmail = () => {
    changeTimelineNode("email", { mail: null, uri: null });
  };
  console.log(date);
  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        title={t("timeline.create_element")}
        expanded
        width={email ? "80%" : "30%"}
        closeForm={close}
      >
        <div>
          <div style={{ display: "flex", maxHeight: "60vh" }}>
            {email && (
              <Paper
                style={{
                  width: "100%",
                  margin: 20,
                  padding: 10,
                  overflowY: "scroll"
                }}
              >
                <Email timelineNode={timelineNode} />
                {" "}
              </Paper>
            )}
            <div className={classes.createElementContainer}>
              <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                locale={localeMap[i18n.language]}
              >
                <KeyboardDatePicker
                  label={t("timeline.date")}
                  placeholder={t("timeline.date")}
                  value={date}
                  variant="inline"
                  className={classes.eventField}
                  format="dd/MM-yyyy"
                  cancelLabel={t("timeline.cancel")}
                  onChange={handleSetDate}
                />
                <KeyboardTimePicker
                  label={t("timeline.time")}
                  placeholder={t("timeline.time")}
                  value={time}
                  variant="inline"
                  cancelLabel={t("timeline.cancel")}
                  keyboardIcon={<QueryBuilderIcon />}
                  ampm={false}
                  className={classes.eventField}
                  onChange={handleSetTime}
                />
              </MuiPickersUtilsProvider>
              <div>
                <TextField
                  name="label"
                  placeholder={t("generic.title")}
                  label={t("generic.title")}
                  value={title}
                  className={classes.eventField}
                  onChange={labelChange}
                />
              </div>
              <TextField
                name="description"
                placeholder={t("workspaces.workspace-form.desc")}
                label={t("workspaces.workspace-form.desc")}
                multiline
                rows={2}
                className={classes.eventField}
                value={description}
                onChange={descriptionChange}
              />
              <div className={classes.eventSelectField}>
                {email ? (
                  <Button type="button" onClick={handleRemoveEmail}>
                    <DeleteIcon />
                    {t("timeline.delete_email")}
                  </Button>
                ) : (
                  <>
                    {" "}
                    <Editor
                      editorState={content}
                      editorClassName={classes.textEditor}
                      toolbarClassName={classes.toolbarEditor}
                      onEditorStateChange={onEditorStateChange}
                      disabled
                    />
                    <Fab
                      variant="extended"
                      size="small"
                      color="primary"
                      aria-label="add"
                      className={classes.mailFab}
                      onClick={handleAddEmail}
                      disabled={loadingEmail}
                    >
                      {loadingEmail ? (
                        <CircularProgress size="30" />
                      ) : (
                        <EmailIcon style={{ color: "white", marginRight: 5 }} />
                      )}
                      {t("timeline.upload_mail")}
                      <div {...getRootProps({ className: "dropzone" })} />
                      <input {...getInputProps()} />
                    </Fab>
                  </>
                )}
              </div>
              <CreatableSelect
                styles={selectStyles()}
                className={classes.eventSelectField}
                isClearable
                isMulti
                isLoading={loadingsP.get("main")}
                menuPortalTarget={document.body}
                menuPlacement="auto"
                menuPosition="absolute"
                value={persons.map(p =>
                  personMapping(
                    p,
                    true,
                    handleOpenPerson,
                    handleMouseOverValue,
                    handleMouseLeaveValue
                  )
                )}
                onChange={(newValue, meta) =>
                  hanldeOnPersonChange(
                    newValue,
                    meta,
                    handleChangePersons,
                    persons
                  )
                }
                inputId="react-select-persons"
                openMenuOnClick={openMenuOnClick}
                placeholder={t("persons.add_person")}
                options={personOptions.map(p => personMapping(p, false))}
              />

              <CreatableSelect
                styles={selectStyles()}
                className={classes.eventSelectField}
                isClearable
                isMulti
                isLoading={loadingsD.get("main")}
                openMenuOnClick={openMenuOnClick}
                menuPortalTarget={document.body}
                menuPlacement="auto"
                menuPosition="absolute"
                value={documents.map(d => ({
                  // @ts-ignore
                  value: d.id || d.value,
                  ...("__isNew__" in d && { __isNew__: d.__isNew__ }),
                  label: (
                    <div
                      onMouseOver={handleMouseOverValue}
                      onFocus={handleMouseOverValue}
                      onMouseLeave={handleMouseLeaveValue}
                      onBlur={handleMouseLeaveValue}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        cursor: "pointer",
                        alignItems: "center"
                      }}
                      className="idDiv"
                      // @ts-ignore
                      data-id={d.id || null}
                      // @ts-ignore
                      data-icon={d.icon || null}
                      onClick={handleOpenDocument}
                    >
                      <span style={{ paddingRight: "5px" }}>
                        {/* @ts-ignore */}
                        {d.title || d.label}
                      </span>

                      <IconButton
                        color="primary"
                        style={{
                          borderRadius: 0
                        }}
                        size="small"
                      >
                        <EditIcon style={{ fontSize: 14 }} />
                      </IconButton>
                    </div>
                  )
                }))}
                onChange={(newValue, meta) =>
                  hanldeOnDocumentChange(
                    newValue,
                    meta,
                    handleChangeDocuments,
                    documents
                  )
                }
                inputId="react-select-persons"
                placeholder={t("documents.add_document")}
                options={documentOptions.map(d => ({
                  value: d.id,
                  label: d.title
                }))}
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
                onClick={handleSave}
              >
                {loadingsT.get("post") ? (
                  <CircularProgress />
                ) : (
                  t("workspaces.workspace-form.btn_save")
                )}
              </Button>
            </div>
          </div>
        </div>
      </FloatingPanel>
    </div>
  );
};

export default CreateElement;
