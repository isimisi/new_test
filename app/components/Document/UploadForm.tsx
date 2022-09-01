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
    const data = Uint8Array.from(
      file
        ? file.Body.data
        : doc
          .get("link")
          .get("Body")
          .get("data")
    );
    const content = new Blob([data.buffer], {
      type: file ? file.ContentType : doc.get("link").get("ContentType")
    });

    const encodedUri = window.URL.createObjectURL(content);
    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute("download", doc.get("title"));

    link.click();
  };

  const fileChanges = (_files) => {
    const _file = _files[0];

    _file.arrayBuffer().then(buf => {
      const buffer = Buffer.from(buf);

      const newFile = {
        Body: {
          type: "Buffer",
          data: buffer
        },
        ContentType: _file.type
      };
      handleFileChange(newFile);
    });
  };


  return (
    <>
      {(doc.get("link")?.size > 0 || file) && (
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
            <FileUpload minimal handleChangeFile={fileChanges} />
          </Tooltip>
        </div>
      )}

      <FileUpload
        height={doc.get("link") || file ? 240 : 280}
        handleChangeFile={fileChanges}
        uploaded={Boolean(doc.get("link")) || Boolean(file)}
        download={download}
      />
    </>
  );
};

export default UploadForm;
