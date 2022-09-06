/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import css from "@styles/Form.scss";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../timeline.jss";
import Button from "@material-ui/core/Button";

import { useAppDispatch, useAppSelector } from "@hooks/redux";

import { nodeTypes } from "@pages/Timelines/constants";

import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { openTag } from "@pages/Timelines/reducers/timelineActions";

interface Props {
  open: boolean;
  close: () => void;
}

function Persons(props: Props) {
  const { open, close } = props;
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const nodeElements = useAppSelector((state) =>
    state.timeline.get("nodes")
  ).toJS();

  const [tags, setTags] = useState<any>([]);

  const handleOpenTag = (tag) => dispatch(openTag(tag));

  useEffect(() => {
    const nodes = nodeElements.filter((e) => nodeTypes.includes(e.type));
    const item: any[] = [];

    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      const { tags: _tags } = node.data;
      for (let z = 0; z < _tags.length; z++) {
        const tag = _tags[z];
        const existingItem = item.find((p) => p.id === tag.id);
        if (!existingItem) {
          item.push({
            ...tag,
            used: 1,
            onClick: () => handleOpenTag(tag.name)
          });
        } else {
          existingItem.used++;
        }
      }
    }

    setTags(item);
  }, []);

  const { t } = useTranslation();

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch=""
        title={t("timeline.tags")}
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
                  <TableCell align="left" />
                  <TableCell align="left">{t("generic.title")}</TableCell>
                  <TableCell align="left" />
                </TableRow>
              </TableHead>
              <TableBody>
                {tags.map((row) => (
                  <TableRow>
                    <TableCell align="left">
                      <div
                        style={{
                          backgroundColor: row.color,
                          width: 12,
                          height: 12,
                          borderRadius: 6,
                          margin: 1
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
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

export default Persons;
