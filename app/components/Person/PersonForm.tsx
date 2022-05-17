import React from "react";

import { hanldeOnChange, tagMapping } from "@components/Tags/constants";
import { fromJS } from "immutable";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { Typography, TextField } from "@material-ui/core";
import { changePerson } from "../../containers/Pages/Persons/reducers/personActions";
import { useTranslation } from "react-i18next";
import useStyles from "./person-jss";
import { mapSelectOptions, selectStyles } from "@api/ui/helper";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";

interface Props {
  isUpdatingNode?: boolean;
}

const PersonForm = ({ isUpdatingNode = true }: Props) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const tagOptions = useAppSelector(state => state.tags.get("tags")).toJS();
  const person = useAppSelector(state => state.person.get("person"));

  const groupsDropDownOptions = useAppSelector(state =>
    state.person.get("groupsDropDownOptions")
  ).toJS();
  const { t } = useTranslation();

  const handleNameChange = e => {
    dispatch(changePerson(e.target.value, "name"));
  };

  const handleAffiliationChange = e => {
    dispatch(changePerson(e.target.value, "affiliation"));
  };

  const handleDescriptionChange = e => {
    dispatch(changePerson(e.target.value, "description"));
  };

  const handleCompanyChange = e => {
    dispatch(changePerson(e.target.value, "company"));
  };
  const handleEmailChange = e => {
    dispatch(changePerson(e.target.value, "email"));
  };
  const handlePhoneChange = e => {
    dispatch(changePerson(e.target.value, "phone"));
  };
  const handleAddressChange = e => {
    dispatch(changePerson(e.target.value, "address"));
  };

  const handleChangeTags = (tags: any) => {
    dispatch(changePerson(fromJS(tags), "tags"));
  };

  const handleChangeGroups = (group: any) => {
    dispatch(changePerson(group.value, "group"));
  };

  return (
    <>
      <TextField
        name="name"
        placeholder={t("person.name")}
        label={t("person.name")}
        onChange={handleNameChange}
        className={classes.field}
        value={person.get("name")}
        disabled={!isUpdatingNode}
      />
      <TextField
        name="description"
        className={classes.field}
        placeholder={t("nodes.node-form.desc")}
        label={t("nodes.node-form.desc")}
        multiline
        rows={2}
        onChange={handleDescriptionChange}
        value={person.get("description")}
        disabled={!isUpdatingNode}
      />
      <TextField
        name="Affiliation"
        className={classes.field}
        placeholder={t("person.affiliation")}
        label={t("person.affiliation")}
        onChange={handleAffiliationChange}
        value={person.get("affiliation")}
        disabled={!isUpdatingNode}
      />
      <TextField
        name="company"
        className={classes.field}
        placeholder={t("person.company")}
        label={t("person.company")}
        onChange={handleCompanyChange}
        value={person.get("company")}
        disabled={!isUpdatingNode}
      />
      <TextField
        name="email"
        className={classes.field}
        placeholder={t("email")}
        label={t("email")}
        onChange={handleEmailChange}
        value={person.get("email")}
        disabled={!isUpdatingNode}
      />
      <TextField
        name="phone"
        className={classes.field}
        placeholder={t("phone")}
        label={t("phone")}
        onChange={handlePhoneChange}
        value={person.get("phone")}
        disabled={!isUpdatingNode}
      />
      <TextField
        name="address"
        className={classes.field}
        placeholder={t("address")}
        label={t("address")}
        onChange={handleAddressChange}
        value={person.get("address")}
        disabled={!isUpdatingNode}
      />
      <div className={classes.field} style={{ marginTop: 16 }}>
        <CreatableSelect
          styles={selectStyles()}
          isMulti
          isClearable
          value={person
            .get("tags")
            .toJS()
            .map(tagMapping)}
          onChange={(newValue, meta) =>
            hanldeOnChange(
              newValue,
              meta,
              handleChangeTags,
              person.get("tags").toJS()
            )
          }
          inputId="react-select-tags"
          placeholder={t("tags.add_tag")}
          options={tagOptions.map(tagMapping)}
          isDisabled={!isUpdatingNode}
        />
      </div>
      <div className={classes.field} style={{ marginTop: 16 }}>
        <Select
          styles={selectStyles}
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
            person.get("group") && {
              label: person.get("group"),
              value: person.get("group")
            }
          }
          onChange={handleChangeGroups}
          isDisabled={!isUpdatingNode}
        />
      </div>
    </>
  );
};

export default PersonForm;
