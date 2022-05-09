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
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import CreatableSelect from "react-select/creatable";
import EditIcon from "@material-ui/icons/Edit";
import { selectStyles } from "@api/ui/helper";

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
import { TimelineNode } from "@customTypes/reducers/timeline";
import { useTheme } from "@material-ui/core/styles";

interface Props {
  open: boolean;
  close: () => void;
  onSave: () => void;
  personOptions: MixedPersonOptions[];
  documentOptions: DocumentCleanOption[];
  openPerson: (id: string, name?: string) => void;
  openDocument: (id: string, name?: string) => void;
  timelineNode: TimelineNode;
  changeTimelineNode: (
    attr: keyof TimelineNode,
    val: TimelineNode[keyof TimelineNode]
  ) => void;
  handleDelete: () => void;
  isUpdatingNode: boolean;
}

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
    isUpdatingNode
  } = props;
  const classes = useStyles();

  const branch = "";
  const { t } = useTranslation();
  const { date, title, description, persons, documents } = timelineNode;
  const theme = useTheme();
  const handleSetDate = d => changeTimelineNode("date", d);
  const labelChange = e => changeTimelineNode("title", e.target.value);
  const descriptionChange = e =>
    changeTimelineNode("description", e.target.value);

  const handleChangePersons = (p: MixedPersonOptions[]) => {
    changeTimelineNode("persons", p);
  };

  const handleChangeDocuments = (p: MixedDocumentOptions[]) =>
    changeTimelineNode("documents", p);

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

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        title={t("timeline.create_element")}
        expanded
        closeForm={close}
      >
        <div>
          <div className={classes.createElementContainer}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="inline"
                format="MM/dd/yyyy"
                label={t("timeline.date")}
                placeholder={t("timeline.date")}
                value={date}
                className={classes.eventField}
                onChange={handleSetDate}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
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
