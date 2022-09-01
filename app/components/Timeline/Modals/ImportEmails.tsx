import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";
import { useDropzone } from "react-dropzone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { CircularProgress, IconButton, Typography } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
interface Props {
  open: boolean;
  close: () => void;
  loading: boolean;
  handleImportEmails: (files: any[]) => void;
}

function Email(props: Props) {
  const { open, close, handleImportEmails, loading } = props;

  const classes = useStyles();

  const { t } = useTranslation();

  const [files, setFiles] = useState<any[]>([]);

  const handleFileChange = (_files) => {
    setFiles((prevFiles) => [..._files, ...prevFiles]);
  };

  const callback = {
    onDrop: (acceptedFiles) => {
      handleFileChange(
        acceptedFiles.map((_file) =>
          Object.assign(_file, {
            preview: URL.createObjectURL(_file)
          })
        )
      );
    },
    accept: ".eml, .msg"
  };

  const { getRootProps, getInputProps } = useDropzone(callback);

  const removeFile = (index: number) => {
    setFiles((prevFiles) => {
      prevFiles.splice(index, 1);
      return [...prevFiles];
    });
  };

  const thumbs = files.map((_file, index) => (
    <div className={classes.thumb} key={_file.name}>
      <div className={classes.thumbInner}>
        <MailOutlineIcon />
        <Typography style={{ fontSize: 8, textAlign: "center" }}>
          {_file.path}
        </Typography>
        <IconButton
          style={{ position: "absolute", top: 2, right: 2 }}
          size="small"
          onClick={() => removeFile(index)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  ));

  const handleSave = () => {
    handleImportEmails(files);
  };

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch=""
        title={t("timeline.import_mails")}
        closeForm={close}
      >
        <div className={classes.createElementContainer} id="dropZoneOuter">
          <div
            {...getRootProps()}
            className={classes.dropzone2}
            style={{ height: 200, width: "100%", position: "relative" }}
          >
            <input {...getInputProps()} />
            <MailOutlineIcon className={classes.addCircle} />

            <Typography variant="h5">{t("timeline.choose_emails")}</Typography>
            <Typography variant="h5">
              {t("timeline.choose_emails_or_drag")}
            </Typography>
          </div>
          <aside className={classes.thumbsContainer} style={{ marginTop: 16 }}>
            {thumbs}
          </aside>
        </div>
        <div className={css.buttonArea}>
          <Button type="button" onClick={close}>
            {t("generic.close")}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            onClick={handleSave}
            disabled={files.length === 0 || loading}
          >
            {loading ? <CircularProgress /> : t("generic.upload")}
          </Button>
        </div>
      </FloatingPanel>
    </div>
  );
}

export default Email;
