/* eslint-disable no-plusplus */
/* eslint-disable default-case */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  CircularProgress,
  Fab,
  IconButton,
  TextField
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import useStyles from "../timeline.jss";
import CreatableSelect from "react-select/creatable";
import EditIcon from "@material-ui/icons/Edit";
import EmailIcon from "@material-ui/icons/Email";
import { selectStyles } from "@api/ui/helper";
import { Editor } from "react-draft-wysiwyg";
import React, { KeyboardEventHandler, useState } from "react";
import { useTranslation } from "react-i18next";

import { SketchPicker, ColorResult } from "react-color";
import { ITimelineNode, TimelineNode } from "@customTypes/reducers/timeline";
import { MixedPersonOptions } from "@customTypes/reducers/person";
import {
  DocumentCleanOption,
  MixedDocumentOptions
} from "@customTypes/reducers/document";
import daLocale from "date-fns/locale/da";
import enLocale from "date-fns/locale/en-US";
import { useAppSelector } from "@hooks/redux";
import { useDropzone } from "react-dropzone";
import { baseUrl } from "@api/constants";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { hanldeOnDocumentChange } from "@pages/Documents/constants";
import { hanldeOnPersonChange, personMapping } from "@pages/Persons/constants";
import ReactDOM from "react-dom";
import { isNode } from "react-flow-renderer";
import moment from "moment";


interface Props {
  personOptions: MixedPersonOptions[];
  documentOptions: DocumentCleanOption[];
  openPerson: (id: string, name?: string) => void;
  openDocument: (id: string, name?: string) => void;
  timelineNode: ITimelineNode;
  changeTimelineNode: (
    attr: keyof TimelineNode,
    val: TimelineNode[keyof TimelineNode]
  ) => void;
  showMailButton: boolean;
  dontShowContent?: boolean;
  handleSplit?: (node: ITimelineNode) => void;
}

const localeMap = {
  en: enLocale,
  da: daLocale
};

const CreateForm = (props: Props) => {
  const {
    personOptions,
    documentOptions,
    openPerson,
    openDocument,
    timelineNode,
    changeTimelineNode,
    showMailButton,
    dontShowContent,
    handleSplit
  } = props;

  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const elementsTagOptions = useAppSelector(state => state.timeline.get("elementsTagOptions")).toJS();

  const date = timelineNode.get("date");
  const time = timelineNode.get("time");

  const title = timelineNode.get("title");
  const description = timelineNode.get("description");
  const content = timelineNode.get("content");
  const persons = timelineNode.get("persons").toJS();
  const documents = timelineNode.get("documents").toJS();
  const tags = timelineNode.get("tags").toJS();

  const loadingsP = useAppSelector(state => state.person.get("loadings"));
  const loadingsD = useAppSelector(state => state.document.get("loadings"));

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

  const handleChangeTags = (value) => {
    changeTimelineNode("tags", value);
  };

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
        const newTags = tags.filter(tag => tag.name !== meta.removedValue.value);
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
        setInputValue(val.find(x => x.__isNew__).value);
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

  const downHaveTime = moment(time).format("HH:mm") === "00:00";


  return (
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
          autoOk
          className={classes.eventField}
          invalidDateMessage={t("dates.invalid")}
          maxDateMessage={t("dates.max")}
          minDateMessage={t("dates.min")}
          format="dd/MM-yyyy"
          cancelLabel={t("timeline.cancel")}
          onChange={handleSetDate}
        />
        <KeyboardTimePicker
          label={t("timeline.time")}
          placeholder={t("timeline.time")}
          value={downHaveTime ? null : time}
          autoOk
          invalidDateMessage={t("dates.time_invalid")}
          maxDateMessage={t("dates.max")}
          minDateMessage={t("dates.min")}
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
      {!dontShowContent && (
        <div className={classes.eventSelectField}>
          {showMailButton ? (
            <>
              <Button type="button" onClick={handleRemoveEmail}>
                <DeleteIcon />
                {t("timeline.delete_email")}
              </Button>
              {handleSplit && (
                <Button
                  type="button"
                  onClick={() => handleSplit(timelineNode)}
                  style={{ marginLeft: 10 }}
                >
                  {t("emails.split")}
                </Button>
              )}
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
      )}
      <CreatableSelect
        styles={selectStyles()}
        className={classes.eventSelectField}
        isClearable
        isMulti
        isLoading={loadingsP.get("main")}
        menuPortalTarget={document.body}
        noOptionsMessage={() => t("generic.no_options")}
        formatCreateLabel={(input) => t("generic.create_new", { input })}
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
        noOptionsMessage={() => t("generic.no_options")}
        formatCreateLabel={(input) => t("generic.create_new", { input })}
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
        inputId="react-select-documents"
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
          <div
            className={classes.cover}
            onClick={handleCloseColor}
          />
          <SketchPicker color={color} onChange={handleChangeColor} />
        </div>
      ) : null}
    </div>
  );
};

export default CreateForm;
