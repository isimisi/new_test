/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable default-case */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { mapSelectOptions, selectStyles } from "@api/ui/helper";
import CreatableSelect from "react-select/creatable";
import {
  labelChange,
  descriptionChange,
  addGroup,
  valuesChange,
} from "@pages/Relationships/reducers/relationshipActions";
import { useTranslation } from "react-i18next";
import ButtonBase from "@material-ui/core/ButtonBase";
import Checkbox from "@material-ui/core/Checkbox";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  field: {
    width: "100%",
    marginBottom: 10,
  },
  fieldBasic: {
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
  },
  inlineWrap: {
    display: "flex",
    flexDirection: "row",
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: "center",
  },
});

function RelationshipForm(props) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const { t } = useTranslation();

  const {
    classes,
    label,
    description,
    group,
    groupsDropDownOptions,
    values,
    useSuggestions,
    changeSuggestions,
  } = props;

  const handleLabelChange = (e) => {
    dispatch(labelChange(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    dispatch(descriptionChange(e.target.value));
  };

  const handleChangeGroups = (value) => {
    dispatch(addGroup(value.value));
  };

  const onValueChanged = (_values) => {
    dispatch(valuesChange(_values || []));
  };

  const createOption = (_label) => ({
    label: _label,
    value: _label,
  });

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setInputValue("");
        dispatch(valuesChange([...values, createOption(inputValue)]));
        event.preventDefault();
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        direction="row"
        justify="center"
      >
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              {t("relationships.relationship_form.name_your")}{" "}
              {t("relationships.relationship_form._relationship")}
            </Typography>
            <div>
              <TextField
                name="label"
                placeholder={t("relationships.relationship_form.name")}
                label={t("relationships.relationship_form.name")}
                className={classes.field}
                onChange={handleLabelChange}
                value={label}
              />
            </div>
            <ButtonBase
              className={classes.field}
              style={{ marginTop: 10, justifyContent: "flex-start" }}
              onClick={changeSuggestions}
            >
              <Checkbox checked={useSuggestions} name="show label" color="primary" />
              <Typography variant="subtitle2">
                {t("relationships.relationship_form.useSuggestions")}
              </Typography>
            </ButtonBase>

            {useSuggestions ? (
              <CreatableSelect
                style={selectStyles}
                className={classes.field}
                noOptionsMessage={() => t("generic.no_options")}
                formatCreateLabel={(input) => t("generic.create_new", { input })}
                inputValue={inputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={onValueChanged}
                onInputChange={(v) => setInputValue(v)}
                onKeyDown={handleKeyDown}
                placeholder={t("relationships.relationship_form.enter_options")}
                value={values}
              />
            ) : null}

            <div className={classes.field}>
              <TextField
                name="description"
                className={classes.field}
                placeholder={t("relationships.relationship_form.desc")}
                label={t("relationships.relationship_form.desc")}
                multiline
                rows={2}
                onChange={handleDescriptionChange}
                value={description}
              />
            </div>
            <div className={classes.field}>
              <Select
                classes={classes}
                styles={selectStyles()}
                inputId="react-select-single-relationship"
                TextFieldProps={{
                  label: "groups",
                  InputLabelProps: {
                    htmlFor: "react-select-single-relationship",
                    shrink: true,
                  },
                  placeholder: t("relationships.relationship_form.select_group"),
                }}
                placeholder={t("relationships.relationship_form.select_group")}
                options={mapSelectOptions(groupsDropDownOptions)}
                value={group && { label: group, value: group }}
                onChange={handleChangeGroups}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

RelationshipForm.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  groupsDropDownOptions: PropTypes.any.isRequired,
  useSuggestions: PropTypes.bool.isRequired,
  changeSuggestions: PropTypes.func.isRequired,
};

export default withStyles(styles)(RelationshipForm);
