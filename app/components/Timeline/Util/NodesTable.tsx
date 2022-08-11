import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

import { Node } from "react-flow-renderer";
import Button from "@material-ui/core/Button";
import {
  createElementChange,
  setTimelineNode
} from "@pages/Timelines/reducers/timelineActions";
import { useAppDispatch } from "@hooks/redux";
import Tooltip from "@material-ui/core/Tooltip";
import DescriptionIcon from '@material-ui/icons/Description';

interface Props {
  nodes: Node[];
  t: any;
  name?: string;
  close: () => void;
}

const NodesTable = (props: Props) => {
  const { nodes, t, name, close } = props;
  const dispatch = useAppDispatch();
  const handleOpenNode = id => {
    dispatch(setTimelineNode(id));
    dispatch(createElementChange(true));
    close();
  };
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        {name ? t("timeline.exists_in", { name }) : ""}
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: 0 }}>
        <Table
          aria-label="collapsible table"
          style={{ marginTop: 0 }}
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell width="30%">{t("generic.date")}</TableCell>
              <TableCell align="left">{t("generic.event")}</TableCell>
              <TableCell align="left" />
              <TableCell align="left" />
              <TableCell align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {nodes.map(row => (
              <TableRow>
                <TableCell align="left">
                  {" "}
                  {moment(row.data.date).isValid()
                    ? `${moment(row.data.date).format("DD/MM-YYYY")}${
                      moment(row.data.date).format("HH:mm") === "00:00"
                        ? ""
                        : ", kl."
                    } ${
                      moment(row.data.date).format("HH:mm") === "00:00"
                        ? ""
                        : moment(row.data.date).format("HH:mm")
                    }`
                    : t("node.no_date")}
                </TableCell>
                <TableCell align="left">{row.data.label}</TableCell>
                <TableCell align="left">
                  {row.data.description?.length > 0 && (
                    <Tooltip title={row.data.description}>
                      <DescriptionIcon />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell align="left">
                  <div style={{ display: "flex" }}>
                    {row.data.tags.map(tag => (
                      <Tooltip
                        arrow
                        title={tag.name}
                        placement="top"
                        key={tag.id}
                      >
                        <div
                          style={{
                            backgroundColor: tag.color,
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            margin: 1
                          }}
                        />
                      </Tooltip>
                    ))}
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenNode(row.id)}
                  >
                    {t("columns.btn_open")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default NodesTable;
