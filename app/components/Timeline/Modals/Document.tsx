/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";
import { useAppSelector } from "@hooks/redux";
import { Document as TDocument } from "@customTypes/reducers/document";
import DocumentForm from "@components/Document/DocumentForm";
import UploadForm from "@components/Document/UploadForm";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  open: boolean;
  close: () => void;
  onSave: (document: TDocument, stopLoading: () => void) => void;
}

const Document = (props: Props) => {
  const { open, close, onSave } = props;

  const classes = useStyles();

  const document = useAppSelector(state => state.document.get("document"));

  const { t } = useTranslation();

  const [file, setFile] = useState<any | null>(null);

  const [loading, setLoading] = useState(false);
  const stopLoading = () => setLoading(false);

  const handleFileChange = _files => {
    if (_files) {
      setFile(_files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSave = () => {
    const modifiedDocument = document.toJS();
    modifiedDocument.file = file;
    setLoading(true);
    onSave(modifiedDocument, stopLoading);
  };

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch=""
        title={t("person.form_header")}
        expanded
        closeForm={close}
      >
        <div className={classes.createElementContainer}>
          <DocumentForm />
          <UploadForm file={file} handleFileChange={handleFileChange} />
        </div>
        <div className={css.buttonArea}>
          <Button type="button" onClick={close}>
            {t("workspaces.workspace-form.btn_cnx")}
          </Button>

          <Button
            variant="contained"
            color="secondary"
            type="button"
            disabled={loading}
            onClick={handleSave}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              t("workspaces.workspace-form.btn_save")
            )}
          </Button>
        </div>
      </FloatingPanel>
    </div>
  );
};

export default Document;
