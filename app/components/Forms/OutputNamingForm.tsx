/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
import React from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { selectStyles, mapSelectOptions } from "@api/ui/helper";
import NoSsr from "@material-ui/core/NoSsr";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import CreatableSelect from "react-select/creatable";
import { hanldeOnChange, tagMapping } from "@components/Tags/constants";
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
  groupsDropDownOptions: any[];
  onTitleChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
  onGroupChange: (val: string) => void;
  tags: MixedTagOptions[];
  changeTags: (tags: MixedTagOptions[]) => void;
  tagOptions: MixedTagOptions[];
}

const OutputNamingForm = (props: Props) => {
  const theme = useTheme();
  const classes = useStyles();

  const {
    title,
    description,
    group,
    groupsDropDownOptions,
    onTitleChange,
    onDescriptionChange,
    onGroupChange,
    tags,
    changeTags,
    tagOptions
  } = props;
  const { t } = useTranslation();

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
              {t("output.OutputNamingForm.name_output")}
            </Typography>
            <div>
              <TextField
                name="title"
                placeholder={t("output.OutputNamingForm.title")}
                label={t("output.OutputNamingForm.title")}
                className={classes.field}
                onChange={e => onTitleChange(e.target.value)}
                value={title}
              />
            </div>
            <div className={classes.field}>
              <TextField
                name="description"
                className={classes.field}
                placeholder={t("output.OutputNamingForm.desc")}
                label={t("output.OutputNamingForm.desc")}
                multiline
                rows={2}
                onChange={e => onDescriptionChange(e.target.value)}
                value={description}
              />
            </div>
            <div className={classes.field}>
              <NoSsr>
                <Select
                  classes={classes}
                  styles={selectStyles()}
                  inputId="react-select-single-output"
                  TextFieldProps={{
                    label: t("output.OutputNamingForm.groups"),
                    InputLabelProps: {
                      htmlFor: "react-select-single-output",
                      shrink: true
                    },
                    placeholder: t("output.OutputNamingForm.groups")
                  }}
                  placeholder={t("output.OutputNamingForm.groups")}
                  options={mapSelectOptions(groupsDropDownOptions)}
                  value={group && { label: group, value: group }}
                  onChange={v => onGroupChange(v.value)}
                />
              </NoSsr>
            </div>
            <div
              className={classes.field}
              style={{ marginTop: theme.spacing(2) }}
            >
              <CreatableSelect
                styles={selectStyles()}
                isMulti
                noOptionsMessage={() => t("generic.no_options")}
                formatCreateLabel={input => t("generic.create_new", { input })}
                isClearable
                value={tags.map(tagMapping)}
                onChange={(newValue, meta) =>
                  hanldeOnChange(newValue, meta, changeTags, tags)
                }
                inputId="react-select-tags"
                placeholder="Tilføj tags til dit arbejdsområde"
                options={tagOptions.map(tagMapping)}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default OutputNamingForm;
