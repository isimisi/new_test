import { useAppSelector } from "@hooks/redux";
import React from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./document-jss";

import FileUpload from "@components/FileUpload/FileUpload";
import Tooltip from "@material-ui/core/Tooltip";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props {
  file: any;
  handleFileChange: (files: any) => void;
}

const UploadForm = (props: Props) => {
  const { file, handleFileChange } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const doc = useAppSelector(state => state.document.get("document"));

  const download = () => {
    const link = document.createElement("a");
    const url = file ? window.URL.createObjectURL(file) : doc.get("link");

    link.download = file ? file.path : doc.get("title");
    link.href = url;
    link.target = "_blank";
    link.click();
  };

  return (
    <>
      {(doc.get("link") || file) && (
        <div className={classes.flexRow}>
          {file && (
            <Tooltip title={`${t("document.delete_file")}`}>
              <IconButton
                color="primary"
                aria-label="Download fil"
                component="span"
                style={{ marginRight: 20 }}
                onClick={() => handleFileChange(null)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={`${t("document.change_file")}`}>
            <FileUpload minimal handleChangeFile={handleFileChange} />
          </Tooltip>
        </div>
      )}

      <FileUpload
        height={doc.get("link") || file ? 240 : 280}
        handleChangeFile={handleFileChange}
        uploaded={Boolean(doc.get("link")) || Boolean(file)}
        download={download}
      />
    </>
  );
};

export default UploadForm;
