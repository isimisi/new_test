/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";

import { useAppDispatch, useAppSelector } from "@hooks/redux";

import { User } from "@auth0/auth0-react";
import { nodeTypes } from "@pages/Timelines/constants";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import {
  downloadDocument,
  timelineElementDocumentChange
} from "@pages/Timelines/reducers/timelineActions";
import { showDocument } from "@pages/Documents/reducers/documentActions";
import IconButton from "@material-ui/core/IconButton";

interface Props {
  user: User;
  open: boolean;
  close: () => void;
}

function Documents(props: Props) {
  const { open, close, user } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const nodeElements = useAppSelector((state) =>
    state.timeline.get("nodes")
  ).toJS();

  const [documents, setDocuments] = useState<any>([]);

  const openDocument = () => dispatch(timelineElementDocumentChange(true));
  const handleOpenDocument = (id) => {
    dispatch(showDocument(user, id, openDocument));
  };

  useEffect(() => {
    const nodes = nodeElements.filter((e) => nodeTypes.includes(e.type));
    const item: any[] = [];

    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      const { documents: _documents } = node.data;
      for (let z = 0; z < _documents.length; z++) {
        const document = _documents[z];
        const existingItem = item.find((p) => p.id === document.id);
        if (!existingItem) {
          item.push({
            ...document,
            used: 1,
            onClick: () => handleOpenDocument(document.id)
          });
        } else {
          existingItem.used++;
        }
      }
    }

    setDocuments(item);
  }, []);

  const { t } = useTranslation();

  const download = (title, id) => {
    dispatch(downloadDocument(user, title, id));
  };

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch=""
        title={t("timeline.documents")}
        expanded
        closeForm={close}
      >
        <div
          className={classes.createElementContainer}
          style={{ maxHeight: "60vh" }}
        >
          <TableContainer component={Paper} style={{ marginTop: 0 }}>
            <Table
              aria-label="collapsible table"
              style={{ marginTop: 0 }}
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="left">{t("generic.title")}</TableCell>
                  <TableCell align="left" />
                  <TableCell align="left" />
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((row) => (
                  <TableRow>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="settings"
                        onClick={() => download(row.title, row.id)}
                        disabled={!row.link}
                      >
                        <AttachFileIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={row.onClick}
                      >
                        {t("columns.btn_open")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={css.buttonArea}>
          <Button type="button" onClick={close}>
            {t("workspaces.workspace-form.btn_cnx")}
          </Button>
        </div>
      </FloatingPanel>
    </div>
  );
}

export default Documents;
