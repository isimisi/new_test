import React from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import NoSsr from "@mui/material/NoSsr";
import Select from "react-select";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { mapSelectOptions, selectStyles } from "@api/ui/helper";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { red } from "@api/palette/colorfull";
import CreatableSelect from "react-select/creatable";
import {
  titleChange,
  descriptionChange,
  addAtrribut,
  addGroup,
  removeAtrribut,
} from "@pages/Nodes/reducers/nodeActions";
import { useTranslation } from "react-i18next";

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

function NodeForm(props) {
  const dispatch = useDispatch();
  const {
    classes,
    title,
    description,
    attributes,
    group,
    attributesDropDownOptions,
    groupsDropDownOptions,
  } = props;
  const { t } = useTranslation();

  const handleTitleChange = (e) => {
    dispatch(titleChange(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    dispatch(descriptionChange(e.target.value));
  };

  const handleChange = (value, index, changeType) => {
    const newArray = [...attributes];
    newArray[index] = { ...newArray[index], [changeType]: value };
    dispatch(addAtrribut(newArray));
  };

  const handleNewRow = (attribut, value) => {
    const newRow = { ...attribut };
    newRow.label = value.label;
    newRow.type = value.type || "Value";
    newRow.selectionOptions = value.selectionOptions || null;

    const i = attributes.length - 1;
    const mutableArray = [...attributes];
    mutableArray.splice(i, 0, newRow);

    dispatch(addAtrribut(mutableArray));
  };

  const handleChangeGroups = (value) => {
    dispatch(addGroup(value.value));
  };

  const handleDeleteAttribute = (a, i) => {
    dispatch(removeAtrribut(i, a.node_attribut_id));
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Grid
        container
        spacing={3}
        alignItems="flex-start"
        direction="row"
        justifyContent="center"
      >
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <Typography variant="h5" component="h3">
              {t("nodes.node-form.name_your")} {t("nodes.node-form._element")}
            </Typography>
            <div>
              <TextField
                name="title"
                placeholder={t("nodes.node-form.name")}
                label={t("nodes.node-form.name")}
                className={classes.field}
                onChange={handleTitleChange}
                value={title}
              />
            </div>
            <div className={classes.field}>
              <TextField
                name="description"
                className={classes.field}
                placeholder={t("nodes.node-form.desc")}
                label={t("nodes.node-form.desc")}
                multiline
                rows={2}
                onChange={handleDescriptionChange}
                value={description}
              />
            </div>
            {attributes.map((attribut, index) => (
              <div className={classes.inlineWrap}>
                <div className={classes.field}>
                  <CreatableSelect
                    styles={selectStyles()}
                    placeholder={t("nodes.node-form.select_standard_look")}
                    options={attributesDropDownOptions}
                    value={
                      attribut.label && { label: attribut.label, value: attribut.label }
                    }
                    isDisabled={Boolean(attribut.label)}
                    isOptionDisabled={(option) =>
                      attributes.map((a) => a.label).includes(option.label)
                    }
                    onChange={(value) => handleNewRow(attribut, value)}
                  />
                </div>
                {attribut.label && (
                  <>
                    <div className={classes.field} style={{ marginLeft: 20 }}>
                      {attribut.type === "Value" ? (
                        <TextField
                          value={attribut.value}
                          placeholder={t("nodes.node-form.value")}
                          onChange={(e) => handleChange(e.target.value, index, "value")}
                        />
                      ) : (
                        <CreatableSelect
                          placeholder="Værdi"
                          options={JSON.parse(attribut.selectionOptions)}
                          value={
                            attribut.value && {
                              label: attribut.value,
                              value: attribut.value,
                            }
                          }
                          onChange={(value) => handleChange(value.value, index, "value")}
                        />
                      )}
                    </div>
                    <IconButton
                      style={{ color: `${red}55`, bottom: 5 }}
                      onClick={() => handleDeleteAttribute(attribut, index)}
                      size="large">
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </div>
            ))}
            <div className={classes.field}>
              <NoSsr>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  inputId="react-select-single-nodeform"
                  TextFieldProps={{
                    label: t("nodes.node-form.select_group"),
                    InputLabelProps: {
                      htmlFor: "react-select-single-nodeform",
                      shrink: true,
                    },
                    placeholder: t("nodes.node-form.select_group"),
                  }}
                  placeholder={t("nodes.node-form.select_group")}
                  options={mapSelectOptions(groupsDropDownOptions)}
                  value={group && { label: group, value: group }}
                  onChange={handleChangeGroups}
                />
              </NoSsr>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

NodeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  attributes: PropTypes.any.isRequired,
  group: PropTypes.string.isRequired,
  attributesDropDownOptions: PropTypes.any.isRequired,
  groupsDropDownOptions: PropTypes.any.isRequired,
};

export default withStyles(styles)(NodeForm);
