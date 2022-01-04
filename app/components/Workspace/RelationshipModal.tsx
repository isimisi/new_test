import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MuiTableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import {
  FlowElement,
  Node,
  getOutgoers,
  getIncomers,
  isEdge,
  Edge
} from 'react-flow-renderer';
import Typography from '@material-ui/core/Typography';
import FloatingPanel from '../Panel/FloatingPanel';

const TableCell = withStyles({
  root: {
    borderBottom: 'thin solid #eeeeee',
    padding: 10
  }
})(MuiTableCell);

interface Props {
  open: boolean;
  close: () => void;
  activeNodeRelations: Node | null;
  elements: FlowElement[];
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
  elements
}: Props) {
  const branch = '';

  const [incommers, setIncommers] = useState<Row[]>([]);
  const [outgoers, setOutgoers] = useState<Row[]>([]);

  useEffect(() => {
    if (activeNodeRelations) {
      const _outgoers = getOutgoers(activeNodeRelations, elements);
      const _incommers = getIncomers(activeNodeRelations, elements);

      setOutgoers(_outgoers.map(o => {
        const relation = elements.filter((x): x is Edge => isEdge(x))
          .find(x => x.source === activeNodeRelations.id && x.target === o.id);

        return (
          {
            element: o.data.displayName,
            relation: relation?.data.label || '',
            value: relation?.data.value || ''
          });
      }));

      setIncommers(_incommers.map(o => {
        const relation = elements.filter((x): x is Edge => isEdge(x))
          .find(x => x.source === o.id && x.target === activeNodeRelations.id);

        return (
          {
            element: o.data.displayName,
            relation: relation?.data.label || '',
            value: relation?.data.value || ''
          });
      }));
    }
  }, [activeNodeRelations, elements]);

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        closeForm={close}
        title={'Relationer for ' + activeNodeRelations?.data.displayName}
        extraSize
      >
        <div style={{ maxHeight: 400, overflow: 'auto' }}>
          {outgoers.length > 0 && (
            <TableContainer component={Paper} style={{ padding: 14 }}>
              <Typography variant="h6" id="tableTitle" component="div">
                Udgående
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Element</TableCell>
                    <TableCell align="right">Relation</TableCell>
                    <TableCell align="right">Værdi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {outgoers.map(row => (
                    <TableRow
                      key={`${row.element}-${row.relation}-${row.value}`}
                    >
                      <TableCell component="th" scope="row">
                        {row.element}
                      </TableCell>
                      <TableCell align="right">{row.relation}</TableCell>
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
                Indgående
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Element</TableCell>
                    <TableCell align="right">Relation</TableCell>
                    <TableCell align="right">Værdi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {incommers.map(row => (
                    <TableRow
                      key={`${row.element}-${row.relation}-${row.value}`}
                    >
                      <TableCell component="th" scope="row">
                        {row.element}
                      </TableCell>
                      <TableCell align="right">{row.relation}</TableCell>
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
