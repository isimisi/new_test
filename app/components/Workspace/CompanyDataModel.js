import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './workspace-jss';
import FloatingPanel from '../Panel/FloatingPanel';

function CompanyDataModel(props) {
  const {

    open,
    close,
    displayName,
    companyData
  } = props;
  const branch = '';
  console.log(companyData);
  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        closeForm={close}
        title={'Selskabsdata for ' + displayName}

      >
        <div style={{ padding: 20 }}>
          <TableContainer component={Paper}>
            <Table aria-label="caption table">
              <caption>A basic table example with a caption</caption>
              <TableBody>
                {companyData.readableFiancials && Object.keys(companyData.readableFiancials).map(key => (
                  <TableRow>
                    <TableCell component="th" scope="row" variant="head">
                      {key}
                    </TableCell>
                    <TableCell align="right">{companyData.readableFiancials[key]}</TableCell>
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

CompanyDataModel.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  displayName: PropTypes.string.isRequired,
  companyData: PropTypes.object.isRequired
};


export default withStyles(styles)(CompanyDataModel);
