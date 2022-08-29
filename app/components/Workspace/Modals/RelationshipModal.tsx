import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MuiTableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import { getOutgoers, getIncomers, Node } from "react-flow-renderer10";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import FloatingPanel from "../../Panel/FloatingPanel";
import {
  TCustomNode,
  TCustomEdge,
  NodeData
} from "@customTypes/reducers/workspace";

const TableCell = withStyles({
  root: {
    borderBottom: "thin solid #eeeeee",
    padding: 10
  }
})(MuiTableCell);

interface Props {
  open: boolean;
  close: () => void;
  activeNodeRelations: Node<NodeData> | null;
  nodes: TCustomNode[];
  edges: TCustomEdge[];
}

interface Row {
  element: string;
  relation: string;
  value: string;
}

function RelationshipModal({
  open,
  close,
  activeNodeRelations,
  nodes,
  edges
}: Props) {
  const branch = "";
  const { t } = useTranslation();

  const [incommers, setIncommers] = useState<Row[]>([]);
  const [outgoers, setOutgoers] = useState<Row[]>([]);

  useEffect(() => {
    if (activeNodeRelations) {
      const _outgoers = getOutgoers(activeNodeRelations, nodes, edges);
      const _incommers = getIncomers(activeNodeRelations, nodes, edges);

      setOutgoers(
        _outgoers.map((o) => {
          const ot = o as Node<NodeData>;
          const relation: TCustomEdge | undefined = edges.find(
            (x) => x.source === activeNodeRelations.id && x.target === ot.id
          );

          return {
            element: ot.data.displayName || "",
            relation: relation?.data?.label || "",
            value: relation?.data?.value || ""
          };
        })
      );

      setIncommers(
        _incommers.map((o) => {
          const ot = o as Node<NodeData>;
          const relation = edges.find(
            (x) => x.source === ot.id && x.target === activeNodeRelations.id
          );

          return {
            element: ot.data.displayName || "",
            relation: relation?.data?.label || "",
            value: relation?.data?.value || ""
          };
        })
      );
    }
  }, [activeNodeRelations, nodes, edges]);

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        closeForm={close}
        title={
          activeNodeRelations?.data?.displayName
            ? t("workspaces.relations_for", {
              for: activeNodeRelations?.data.displayName
            })
            : t("workspaces.relations")
        }
        extraSize
      >
        <div style={{ maxHeight: 400, overflow: "auto" }}>
          {outgoers.length > 0 && (
            <TableContainer component={Paper} style={{ padding: 14 }}>
              <Typography variant="h6" id="tableTitle" component="div">
                {t("workspaces.relationship_modal.outgoing")}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* @ts-ignore */}
                    <TableCell>
                      {t("workspaces.relationship_modal.elements")}
                    </TableCell>
                    {/* @ts-ignore */}
                    <TableCell align="right">
                      {t("workspaces.relationship_modal.relations")}
                    </TableCell>
                    {/* @ts-ignore */}
                    <TableCell align="right">
                      {t("workspaces.relationship_modal.values")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {outgoers.map((row) => (
                    <TableRow
                      key={`${row.element}-${row.relation}-${row.value}`}
                    >
                      {/* @ts-ignore */}
                      <TableCell component="th" scope="row">
                        {row.element}
                      </TableCell>
                      {/* @ts-ignore */}
                      <TableCell align="right">{row.relation}</TableCell>
                      {/* @ts-ignore */}
                      <TableCell align="right">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {incommers.length > 0 && (
            <TableContainer component={Paper} style={{ padding: 14 }}>
              <Typography variant="h6" id="tableTitle" component="div">
                {t("workspaces.relationship_modal.incomming")}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* @ts-ignore */}
                    <TableCell>
                      {t("workspaces.relationship_modal.elements")}
                    </TableCell>
                    {/* @ts-ignore */}
                    <TableCell align="right">
                      {t("workspaces.relationship_modal.relations")}
                    </TableCell>
                    {/* @ts-ignore */}
                    <TableCell align="right">
                      {t("workspaces.relationship_modal.values")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incommers.map((row) => (
                    <TableRow
                      key={`${row.element}-${row.relation}-${row.value}`}
                    >
                      {/* @ts-ignore */}
                      <TableCell component="th" scope="row">
                        {row.element}
                      </TableCell>
                      {/* @ts-ignore */}
                      <TableCell align="right">{row.relation}</TableCell>
                      {/* @ts-ignore */}
                      <TableCell align="right">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </FloatingPanel>
    </div>
  );
}

export default RelationshipModal;
