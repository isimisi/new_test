import React from "react";
import { useTranslation } from "react-i18next";
import CreatableSelect from "react-select/creatable";
import { selectStyles, mapSelectOptions } from "@api/ui/helper";
import { hanldeOnChange, tagMapping } from "@components/Tags/constants";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import useStyles from "./document-jss";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { changeDocument } from "../../containers/Pages/Documents/reducers/documentActions";
import { fromJS } from "immutable";

interface Props {
  isUpdatingNode?: boolean;
}

const DocumentForm = ({ isUpdatingNode = true }: Props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const tagOptions = useAppSelector(state => state.tags.get("tags")).toJS();
  const groupsDropDownOptions = useAppSelector(state =>
    state.document.get("groupsDropDownOptions")
  ).toJS();
  const doc = useAppSelector(state => state.document.get("document"));

  const handleTitleChange = e => {
    dispatch(changeDocument(e.target.value, "title"));
  };

  const handleDescriptionChange = e => {
    dispatch(changeDocument(e.target.value, "description"));
  };
  const handleChangeTags = tags => {
    dispatch(changeDocument(fromJS(tags), "tags"));
  };

  const handleChangeGroups = (group: any) => {
    dispatch(changeDocument(group.value, "group"));
  };

  return (
    <>
      <TextField
        name="title"
        placeholder={t("document.title")}
        label={t("document.title")}
        fullWidth
        onChange={handleTitleChange}
        value={doc.get("title")}
        disabled={!isUpdatingNode}
      />
      <TextField
        name="description"
        className={classes.field}
        placeholder={t("nodes.node-form.desc")}
        label={t("nodes.node-form.desc")}
        multiline
        fullWidth
        rows={2}
        onChange={handleDescriptionChange}
        value={doc.get("description")}
        disabled={!isUpdatingNode}
      />
      <div className={classes.field}>
        <CreatableSelect
          styles={selectStyles()}
          isMulti
          isDisabled={!isUpdatingNode}
          isClearable
          value={doc
            .get("tags")
            .toJS()
            .map(tagMapping)}
          onChange={(newValue, meta) =>
            hanldeOnChange(
              newValue,
              meta,
              handleChangeTags,
              doc.get("tags").toJS()
            )
          }
          inputId="react-select-tags"
          placeholder={t("tags.add_tag")}
          options={tagOptions.map(tagMapping)}
        />
      </div>
      <div className={classes.field}>
        <Select
          classes={classes}
          styles={selectStyles}
          isDisabled={!isUpdatingNode}
          inputId="react-select-single-nodeform"
          TextFieldProps={{
            label: t("nodes.node-form.select_group"),
            InputLabelProps: {
              htmlFor: "react-select-single-nodeform",
              shrink: true
            },
            placeholder: t("nodes.node-form.select_group")
          }}
          placeholder={t("nodes.node-form.select_group")}
          options={mapSelectOptions(groupsDropDownOptions)}
          value={
            doc.get("group") && {
              label: doc.get("group"),
              value: doc.get("group")
            }
          }
          onChange={handleChangeGroups}
        />
      </div>
    </>
  );
};

export default DocumentForm;
