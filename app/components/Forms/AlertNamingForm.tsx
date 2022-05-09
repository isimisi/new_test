import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import NoSsr from "@material-ui/core/NoSsr";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { mapSelectOptions, selectStyles } from "@api/ui/helper";
import { useTranslation } from "react-i18next";
import { SelectOptions } from "@customTypes/data";
import CreatableSelect from "react-select/creatable";
import { hanldeOnChange, tagMapping } from "@components/Tags/constants";
import {
  titleChange,
  descriptionChange,
  addGroup
} from "../../containers/Pages/Alerts/reducers/alertActions";
import { MixedTagOptions } from "@customTypes/reducers/tags";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: "100%",
    marginBottom: 10
  },
  fieldBasic: {
    width: "100%",
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: "flex",
    flexDirection: "row"
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: "center"
  }
}));

interface Props {
  title: string;
  description: string;
  group: string;
  groupsDropDownOptions: SelectOptions;
  tags: MixedTagOptions[];
  changeTags: (tags: MixedTagOptions) => void;
  tagOptions: MixedTagOptions[];
}

const AlertNamingForm = (props: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    title,
    description,
    group,
    groupsDropDownOptions,
    tags,
    changeTags,
    tagOptions
  } = props;

  const handleTitleChange = e => {
    dispatch(titleChange(e.target.value));
  };

  const handleDescriptionChange = e => {
    dispatch(descriptionChange(e.target.value));
  };

  const handleChangeGroups = value => {
    dispatch(addGroup(value.value));
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
              {t("alert-naming-form.red_flag_content")}
            </Typography>
            <div>
              <TextField
                name="title"
                placeholder={t("alert-naming-form.red_flag_title")}
                label={t("alert-naming-form.red_flag_title")}
                className={classes.field}
                onChange={handleTitleChange}
                value={title}
              />
            </div>
            <div>
              <TextField
                name="description"
                className={classes.field}
                placeholder={t("alert-naming-form.red_flag_desc")}
                label={t("alert-naming-form.red_flag_desc")}
                multiline
                onChange={handleDescriptionChange}
                value={description}
              />
            </div>
            <div className={classes.field}>
              <NoSsr>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  inputId="react-select-single-alert-group"
                  TextFieldProps={{
                    label: t("alert-naming-form.red_flag_groups"),
                    InputLabelProps: {
                      htmlFor: "react-select-single-alert-group",
                      shrink: true
                    },
                    placeholder: t("alert-naming-form.red_flag_groups")
                  }}
                  placeholder={t("alert-naming-form.red_flag_groups")}
                  options={mapSelectOptions(groupsDropDownOptions)}
                  value={group && { label: group, value: group }}
                  onChange={handleChangeGroups}
                />
              </NoSsr>
            </div>
            <div className={classes.field}>
              <CreatableSelect
                styles={selectStyles()}
                isMulti
                isClearable
                value={tags.map(tagMapping)}
                onChange={(newValue, meta) =>
                  hanldeOnChange(newValue, meta, changeTags, tags)
                }
                inputId="react-select-tags"
                placeholder={t("tags.add_tag")}
                options={tagOptions.map(tagMapping)}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AlertNamingForm;
