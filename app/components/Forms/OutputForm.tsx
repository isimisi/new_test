import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";
import { Map } from "immutable";
import Tooltip from "@material-ui/core/Tooltip";
import { Editor } from "react-draft-wysiwyg";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import EditIcon from "@material-ui/icons/Edit";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FileUpload from "../FileUpload/FileUpload";
import NoteAdd from "@material-ui/icons/NoteAdd";

import { MyTheme } from "@customTypes/styling";

import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme: MyTheme) => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  select: {
    width: "40%",
    marginRight: 20
  },
  dropzone: {
    display: "flex",
    width: "100%",
    height: 400,
    backgroundColor: theme.palette.type === "dark" ? "#303030" : "#F7F8FA",
    borderRadius: theme.rounded.small,
    border:
      theme.palette.type === "dark" ? "1px solid #606060" : "1px solid #F1F1F1",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  addCircle: {
    width: "30%",
    height: "30%"
  },
  inlineWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 40
  },
  conditionWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  textEditor: {
    background: theme.palette.background.paper,
    minHeight: 400,
    border: `1px solid ${theme.palette.divider}`,
    padding: "0 10px",
    color: theme.palette.text.primary,
    borderRadius: theme.rounded.small
  },
  toolbarEditor: {
    borderRadius: theme.rounded.small,
    background: theme.palette.background.default,
    border: "none",
    "& > div": {
      background: theme.palette.background.paper,
      "& img": {
        filter: theme.palette.type === "dark" ? "invert(100%)" : "invert(0%)"
      },
      "& a": {
        color: theme.palette.text.primary,
        "& > div": {
          borderTopColor: theme.palette.text.primary
        }
      }
    }
  },
  lottie: {
    width: 700 / 1.5,
    height: 700 / 1.5,
    [theme.breakpoints.down("sm")]: {
      width: 400 / 1.5,
      height: 400 / 1.5
    }
  },
  lottieContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%"
  }
}));

interface Props {
  title: string;
  outputFile: any;
  editorState: any;
  onEditorStateChange: (v: any) => void;

  onOutputChange: (f: any) => void;
}

const OutputForm = (props: Props) => {
  const {
    title,
    outputFile,
    editorState,

    onOutputChange,
    onEditorStateChange
  } = props;

  const { t } = useTranslation();

  const classes = useStyles();

  const [activeToggleButton, setActiveToggleButton] = useState(
    "Upload et dokument"
  );

  useEffect(() => {
    if (editorState.getCurrentContent().hasText()) {
      setActiveToggleButton("Skab et dokument");
    }
  }, []);

  const handleChange = (event, value) => {
    setActiveToggleButton(value);
  };

  const downloadFile = () => {
    console.log(outputFile);
    const data = Uint8Array.from(outputFile.Body.data);
    const { file_type } = outputFile.Metadata;
    const content = new Blob([data.buffer], { type: outputFile.ContentType });
    const encodedUri = window.URL.createObjectURL(content);

    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", file_type ? `${title}.${file_type}` : title);

    link.click();
  };

  const handleChangeFiles = (_files: File[]) => {
    const file = _files[0];

    file.arrayBuffer().then(buf => {
      const buffer = Buffer.from(buf);

      const newFile = {
        file,
        Body: {
          type: "Buffer",
          data: buffer
        },
        Metadata: {},
        ContentType: file.type
      };
      onOutputChange(newFile);
    });
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
            <div className={classes.inlineWrap}>
              <div className={classes.conditionWrap}>
                {Object.keys(outputFile).length !== 0 && (
                  <div className={classes.conditionWrap}>
                    <Tooltip title="Slet indhold">
                      <IconButton
                        color="primary"
                        aria-label="Download fil"
                        component="span"
                        style={{ marginRight: 20 }}
                        onClick={() => {
                          onOutputChange(Map());
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <FileUpload minimal handleChangeFile={handleChangeFiles} />
                  </div>
                )}
                <ToggleButtonGroup
                  size="large"
                  value={activeToggleButton}
                  exclusive
                  onChange={handleChange}
                  style={{ marginLeft: 20 }}
                >
                  <ToggleButton value="Upload et dokument">
                    <InsertDriveFileIcon />
                  </ToggleButton>
                  <ToggleButton value="Skab et dokument">
                    <EditIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            {activeToggleButton === "Upload et dokument" ? (
              Object.keys(outputFile).length !== 0 ? (
                <ButtonBase
                  className={classes.lottieContainer}
                  onClick={downloadFile}
                >
                  <Typography style={{ fontSize: 30 }}>
                    {t("output.download_file")}
                  </Typography>
                  <NoteAdd style={{ width: 100, height: 100 }} />
                </ButtonBase>
              ) : (
                <FileUpload height={485} handleChangeFile={handleChangeFiles} />
              )
            ) : (
              <Editor
                editorState={editorState}
                editorClassName={classes.textEditor}
                toolbarClassName={classes.toolbarEditor}
                onEditorStateChange={onEditorStateChange}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default OutputForm;
