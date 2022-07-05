/* eslint-disable default-case */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { KeyboardEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";
import daLocale from "date-fns/locale/da";
import enLocale from "date-fns/locale/en-US";
import axios from "axios";
import {
  DocumentCleanOption,
  MixedDocumentOptions
} from "@customTypes/reducers/document";
import { hanldeOnDocumentChange } from "@pages/Documents/constants";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { ITimelineNode, TimelineNode } from "@customTypes/reducers/timeline";
import { MixedPersonOptions } from "@customTypes/reducers/person";
import useStyles from "../timeline.jss";
import { useTheme } from "@material-ui/core/styles";
import { baseUrl } from "@api/constants";
import { useDropzone } from "react-dropzone";
import Button from "@material-ui/core/Button";
import NoContent from "@components/NoContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import Email from "../Util/Email";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import { hanldeOnPersonChange, personMapping } from "@pages/Persons/constants";
import Avatar from "react-nice-avatar";
import IconButton from "@material-ui/core/IconButton";
import DescriptionIcon from "@material-ui/icons/Description";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import Divider from "@material-ui/core/Divider";
import Linkify from "react-linkify";
import { SketchPicker, ColorResult } from "react-color";

import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  TimePicker,
  DatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import { Editor } from "react-draft-wysiwyg";
import Fab from "@material-ui/core/Fab";
import EmailIcon from "@material-ui/icons/Email";
import CreatableSelect from "react-select/creatable";
import CircularProgress from "@material-ui/core/CircularProgress";
import { selectStyles } from "@api/ui/helper";
import {
  timelineElementDocumentChange,
  timelineElementPersonChange
} from "@pages/Timelines/reducers/timelineActions";

import { showPerson } from "@pages/Persons/reducers/personActions";
import { useAuth0, User } from "@auth0/auth0-react";
import { showDocument } from "@pages/Documents/reducers/documentActions";

const localeMap = {
  en: enLocale,
  da: daLocale
};

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

const Content = (props: Props) => {
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

  const { t, i18n } = useTranslation();

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
  const elementsTagOptions = useAppSelector(state => state.timeline.get("elementsTagOptions")).toJS();

  const handleSetDate = d => changeTimelineNode("date", d);
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

  const handleOpenPerson = e => {
    const id = e.target.closest(".idDiv").getAttribute("data-id");

    const nameDiv = e.target.closest(".idDiv");
    const nameSpan = nameDiv.getElementsByTagName("span")[0];

    openPerson(id, nameSpan.innerHTML);
  };

  const handleChangeTags = value => {
    changeTimelineNode("tags", value);
  };

  const handleOpenDocument = e => {
    const id = e.target.closest(".idDiv").getAttribute("data-id");

    const nameDiv = e.target.closest(".idDiv");
    const nameSpan = nameDiv.getElementsByTagName("span")[0];

    openDocument(id, nameSpan.innerHTML);
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

  const loadingsP = useAppSelector(state => state.person.get("loadings"));
  const loadingsD = useAppSelector(state => state.document.get("loadings"));
  const loadingsT = useAppSelector(state => state.timeline.get("loadings"));

  const { getRootProps, getInputProps, open: handleAddEmail } = useDropzone(
    options
  );

  const handleRemoveEmail = () => {
    changeTimelineNode("email", { mail: null, uri: null });
  };

  const rawContentState = convertToRaw(content.getCurrentContent());
  const markup = draftToHtml(rawContentState);

  const user = useAuth0().user as User;
  const dispatch = useAppDispatch();

  const handleOpenPersonNonEdit = id => {
    dispatch(
      showPerson(user, id, () => dispatch(timelineElementPersonChange(true)))
    );
  };

  const handleOpenDocumentNonEdit = id => {
    dispatch(
      showDocument(user, id, () =>
        dispatch(timelineElementDocumentChange(true))
      )
    );
  };

  const [displayColorPickerColor, setDisplayColorPickerColor] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const handleChangeColor = (col: ColorResult) => setColor(col.hex);

  const [inputValue, setInputValue] = useState("");

  const handleInput = (val: string) => {
    if (!displayColorPickerColor) {
      setInputValue(val);
    }
  };

  const chooseColor = () => {
    setDisplayColorPickerColor(true);
  };

  const handleChangeTagsSelect = (val, meta) => {
    switch (meta.action) {
      case "remove-value":
      case "pop-value":
      case "deselect-option":
        // eslint-disable-next-line no-case-declarations
        const newTags = tags.filter(
          tag => tag.name !== meta.removedValue.value
        );
        handleChangeTags(newTags);
        break;
      case "clear":
        handleChangeTags([]);
        break;
      case "set-value":
      case "select-option":
        // eslint-disable-next-line no-case-declarations
        const _newTags = [...tags];
        // eslint-disable-next-line no-case-declarations
        const newTag = {
          name: meta.option.value,
          color: meta.option.color
        };
        _newTags.push(newTag);
        handleChangeTags(_newTags);
        break;
      case "create-option":
        chooseColor();
    }
  };

  const handleCloseColor = () => {
    setDisplayColorPickerColor(false);
    const newTag = { name: inputValue, color };
    tags.push(newTag);

    handleChangeTags(tags);
    setInputValue("");
  };


  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        chooseColor();
        event.preventDefault();
    }
  };

  const mappedTags = tags.map(tag => ({
    value: tag.name,
    label: (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: tag?.color, marginRight: 5 }} />
        <span style={{ paddingRight: "5px" }}>{tag?.name}</span>
      </div>
    ),

  }));

  const mappedOptions = elementsTagOptions.map(tag => ({
    value: tag.name,
    label: (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: tag?.color, marginRight: 5 }} />
        <span style={{ paddingRight: "5px" }}>{tag?.name}</span>
      </div>
    ),
    color: tag?.color
  }));


  React.useEffect(() => {
    const picker = document.getElementsByClassName("sketch-picker");

    if (picker.length > 0) {
      let div = document.getElementById("saveContainer");

      if (!div) {
        div = document.createElement("div");
        div.setAttribute("id", "saveContainer");
        picker[0].appendChild(div);
      }
      // @ts-ignore

      ReactDOM.render(
        <div className={classes.attributSaveButtonContainer}>
          <button
            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary"
            tabIndex={0}
            type="button"
            onClick={handleCloseColor}
          >
            <span className="MuiButton-label">Gem</span>
            <span className="MuiTouchRipple-root" />
          </button>
        </div>,
        div
      );
    }
  }, [displayColorPickerColor, color]);

  return (
    <div className={classes.contentContainer}>
      {isUpdatingNode ? (
        <div
          className={classes.createElementContainer}
          style={{ marginBottom: 50 }}
        >
          <MuiPickersUtilsProvider
            utils={DateFnsUtils}
            locale={localeMap[i18n.language]}
          >
            <DatePicker
              label={t("timeline.date")}
              placeholder={t("timeline.date")}
              value={date}
              labelFunc={_date =>
                _date ? moment(_date).format("DD/MM-YYYY") : ""
              }
              className={classes.eventField}
              cancelLabel={t("timeline.cancel")}
              onChange={handleSetDate}
            />
            <TimePicker
              label={t("timeline.time")}
              placeholder={t("timeline.time")}
              value={date}
              cancelLabel={t("timeline.cancel")}
              labelFunc={_date => (_date ? moment(_date).format("HH:mm") : "")}
              ampm={false}
              className={classes.eventField}
              onChange={handleSetDate}
            />
          </MuiPickersUtilsProvider>
          <div>
            <TextField
              name="label"
              placeholder={t("workspaces.workspace-form.name")}
              label={t("workspaces.workspace-form.name")}
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
              <>
                <Button type="button" onClick={handleOpenEmail}>
                  {t("timeline.see_email")}
                </Button>
                <IconButton color="primary" onClick={handleRemoveEmail}>
                  <DeleteIcon />
                </IconButton>
              </>
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
            noOptionsMessage={() => t("generic.no_options")}
            formatCreateLabel={(input) => t("generic.create_new", { input })}
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
              hanldeOnPersonChange(newValue, meta, handleChangePersons, persons)
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
            noOptionsMessage={() => t("generic.no_options")}
            formatCreateLabel={(input) => t("generic.create_new", { input })}
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
          <CreatableSelect
            inputValue={inputValue}
            isClearable
            className={classes.eventSelectField}
            isMulti
            styles={selectStyles()}
            menuPortalTarget={document.body}
            noOptionsMessage={() => t("generic.no_options")}
            formatCreateLabel={(input) => t("generic.create_new", { input })}
            menuPlacement="auto"
            menuPosition="absolute"
            onChange={handleChangeTagsSelect}
            onInputChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={t("timeline.tags_placeholder")}
            value={mappedTags}
            options={mappedOptions}
          />
          {displayColorPickerColor ? (
            <div className={classes.popover}>
              <div className={classes.cover} onClick={handleCloseColor} />
              <SketchPicker color={color} onChange={handleChangeColor} />
            </div>
          ) : null}
        </div>
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
                      {`${moment(date).format("DD/MM-YYYY")}, kl. ${moment(
                        date
                      ).format("HH:mm")}`}
                    </Typography>
                  </Paper>
                  <Typography variant="h6" className={classes.verticalTitle}>
                    {title}
                  </Typography>
                  <Linkify
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
                        {persons.map(person => (
                          <Tooltip arrow title={person.name} placement="top">
                            <div
                              style={{ cursor: "pointer", margin: 2 }}
                              onClick={() => handleOpenPersonNonEdit(person.id)}
                            >
                              <Avatar
                                style={{ width: 30, height: 30 }}
                                {...JSON.parse(person.icon)}
                              />
                            </div>
                          </Tooltip>
                        ))}
                      </div>
                      {persons.length > 0 && documents.length > 0 && (
                        <div className={classes.personAndDocsDivider} />
                      )}
                      <div className={classes.personDiv}>
                        {documents.map(document => (
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
                onClick={onSave}
              >
                {t("generic.save")}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
