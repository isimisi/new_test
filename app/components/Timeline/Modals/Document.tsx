/* eslint-disable no-param-reassign */
import React, { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { Document as TDocument } from "@customTypes/reducers/document";
import DocumentForm from "@components/Document/DocumentForm";
import UploadForm from "@components/Document/UploadForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import NodesTable from "../Util/NodesTable";
import { isNode } from "react-flow-renderer";
import DocumentCard from "../Util/DocumentCard";
import { downloadDocument } from "@pages/Timelines/reducers/timelineActions";
import { useAuth0, User } from "@auth0/auth0-react";
import { putDocument } from "@pages/Documents/reducers/documentActions";

interface Props {
  open: boolean;
  close: () => void;
  onSave: (document: TDocument, stopLoading: () => void) => void;
}

const Document = (props: Props) => {
  const { open, close, onSave } = props;

  const classes = useStyles();

  const document = useAppSelector(state => state.document.get("document"));
  const isUpdatingNode = useAppSelector(state =>
    state.timeline.get("isUpdatingNode")
  );
  const elements = useAppSelector(state =>
    state.timeline.get("elements")
  ).toJS();

  const nodes = useMemo(
    () =>
      elements
        .filter((e): e is Node => isNode(e))
        .filter(
          n =>
            n.data.documents &&
            n.data.documents.some(p => p.id === document.get("id"))
        ),
    [elements, document]
  );

  const { t } = useTranslation();

  const [file, setFile] = useState<any | null>(null);

  const [loading, setLoading] = useState(false);
  const stopLoading = () => setLoading(false);

  const handleFileChange = _file => {
    if (_file) {
      setFile(_file);
    } else {
      setFile(null);
    }
  };

  const [edit, setEdit] = useState(false);
  const handleEdit = () => setEdit(true);
  const closeEdit = () => setEdit(false);

  const dispatch = useAppDispatch();
  const user = useAuth0().user as User;

  const download = () => {
    dispatch(downloadDocument(user, document.get("title"), document.get("id")));
  };

  const handleSave = () => {
    const modifiedDocument = document.toJS();

    if (edit) {
      dispatch(
        putDocument(
          user,
          modifiedDocument.id,
          modifiedDocument,
          file,
          undefined,
          closeEdit
        )
      );
    } else {
      modifiedDocument.file = file;
      setLoading(true);
      onSave(modifiedDocument, stopLoading);
    }
  };

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch=""
        title={t("document.form_header")}
        expanded
        width="60%"
        closeForm={close}
      >
        <div
          className={classes.createElementContainer}
          style={{ maxHeight: "60vh" }}
        >
          {isUpdatingNode || edit ? (
            <>
              <DocumentForm />
              <UploadForm file={file} handleFileChange={handleFileChange} />
            </>
          ) : (
            <DocumentCard
              download={download}
              document={document}
              handleEdit={handleEdit}
            />
          )}

          <div style={{ margin: 30 }} />
          {!edit && !isUpdatingNode && (
            <NodesTable
              nodes={nodes}
              t={t}
              name={document.get("title")}
              close={close}
            />
          )}
        </div>
        <div className={css.buttonArea}>
          <Button type="button" onClick={close}>
            {t("workspaces.workspace-form.btn_cnx")}
          </Button>

          {(isUpdatingNode || edit) && (
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
          )}
        </div>
      </FloatingPanel>
    </div>
  );
};

export default Document;
