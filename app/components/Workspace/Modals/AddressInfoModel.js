import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MuiTableCell from "@material-ui/core/TableCell";
import FloatingPanel from "../../Panel/FloatingPanel";

const TableCell = withStyles({
  root: {
    borderBottom: "thin solid #eeeeee",
    padding: 10,
  },
})(MuiTableCell);

function AddressInfoModel(props) {
  const { open, close, addressInfo } = props;

  return (
    <div>
      <FloatingPanel openForm={open} closeForm={close} title="Addresseinformation">
        <div style={{ maxHeight: 600, overflow: "auto" }}>
          <TableContainer component={Paper} style={{ padding: 14 }}>
            <Table>
              <TableBody>
                {addressInfo &&
                  Object.keys(addressInfo).map((key) => (
                    <TableRow key={key} hover>
                      <TableCell component="th" scope="row" variant="head" width="25%">
                        {key}
                      </TableCell>
                      <TableCell align="right">{addressInfo[key]}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </FloatingPanel>
    </div>
  );
}

AddressInfoModel.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  addressInfo: PropTypes.object.isRequired,
};
export default AddressInfoModel;
