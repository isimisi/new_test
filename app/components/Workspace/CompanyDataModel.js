import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MuiTableCell from '@material-ui/core/TableCell';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InfoIcon from '@material-ui/icons/Info';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import css from '@styles/Form.scss';
import Button from '@material-ui/core/Button';
import FloatingPanel from '../Panel/FloatingPanel';
import styles from './workspace-jss';

const TableCell = withStyles({
  root: {
    borderBottom: 'thin solid #eeeeee',
    padding: 10
  }
})(MuiTableCell);

function CompanyDataModel(props) {
  const {

    open,
    close,
    displayName,
    companyData
  } = props;
  const branch = '';
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        closeForm={close}
        title={'Selskabsdata for ' + displayName}
        extraSize
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<InfoIcon />} label="Generelt" />
          <Tab icon={<AccountBalanceIcon />} label="Seneste regnskabstal" />
        </Tabs>
        <div style={{ maxHeight: 600, overflow: 'auto' }}>
          {value === 1 ? (
            <TableContainer component={Paper} style={{ padding: 14 }}>
              <Table aria-label="caption table">
                <caption>Dette er en eksperimentel feature, og der kan derfor i enkeltstående tilfælde være tale om forkerte nøgletal.</caption>
                <TableBody>
                  {companyData.readableFiancials ? Object.keys(companyData.readableFiancials).map(key => (
                    <TableRow key={key} hover>
                      <TableCell component="th" scope="row" variant="head">
                        {key}
                      </TableCell>
                      <TableCell align="right">{companyData.readableFiancials[key]}</TableCell>
                    </TableRow>
                  ))
                    : (

                      <Typography style={{ textAlign: 'center' }}>
                        Vi kunne ikke finde noget data at vise dig her
                        {' '}
                        {displayName}
                      </Typography>

                    )
                  }
                </TableBody>
              </Table>
            </TableContainer>
          )
            : (
              <TableContainer component={Paper} style={{ padding: 14 }}>
                <Table>
                  <TableBody>
                    {companyData.companyMetaData && Object.keys(companyData.companyMetaData).map(key => (
                      <TableRow key={key} hover>
                        <TableCell component="th" scope="row" variant="head" width="25%">
                          {key}
                        </TableCell>
                        <TableCell align="right">{companyData.companyMetaData[key]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )
          }
        </div>
        <div className={css.buttonArea}>
          {companyData.companyMetaData && (
            <Button
              variant="text"
              color="secondary"
              type="button"
              target="_blank"
              href={`https://datacvr.virk.dk/data/visenhed?enhedstype=virksomhed&id=${companyData?.companyMetaData['CVR-nummer']}`}
            >
            Åben i enhedsvisning for
              {' '}
              {displayName}
              {' '}
            direkte i CVR
            </Button>
          )}
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
