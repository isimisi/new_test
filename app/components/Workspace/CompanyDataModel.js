import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MuiTableCell from '@material-ui/core/TableCell';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InfoIcon from '@material-ui/icons/Info';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import css from '@styles/Form.scss';
import Button from '@material-ui/core/Button';
import MoneyIcon from '@material-ui/icons/Money';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import Typography from '@material-ui/core/Typography';
import styles from './workspace-jss';
import FloatingPanel from '../Panel/FloatingPanel';

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
    companyData
  } = props;
  const branch = '';
  const [value, setValue] = React.useState(0);

  const tabs = ['Virksomhedsdata', 'Balance', 'Resultat', 'Pengestrøm', 'Nøgletal'];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(companyData);

  return (
    <div>
      <FloatingPanel
        openForm={open}
        branch={branch}
        closeForm={close}
        title={'Selskabsdata for ' + companyData.navn}
        extraSize
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          aria-label="icon label tabs example"
        >
          <Tab icon={<InfoIcon />} label="Generelt" />
          <Tab icon={<SyncAltIcon />} label="Balance" />
          <Tab icon={<AccountBalanceIcon />} label="Resultat" />
          <Tab icon={<MoneyIcon />} label="Pengestrøm" />
          <Tab icon={<TrendingUpIcon />} label="Nøgletal" />
        </Tabs>
        <div style={{ maxHeight: 600, overflow: 'auto' }}>
          <TableContainer component={Paper} style={{ padding: 14 }}>
            <Table>
              <TableBody>
                {companyData[tabs[value]] && Object.keys(companyData[tabs[value]]).length > 0 ? Object.keys(companyData[tabs[value]]).map(key => (
                  companyData[tabs[value]][key] && (
                    <TableRow key={key} hover>
                      <TableCell component="th" scope="row" variant="head" width="25%">
                        {key}
                      </TableCell>
                      <TableCell align="right">{companyData[tabs[value]][key]}</TableCell>
                    </TableRow>
                  )
                )) : (
                  <Typography style={{ textAlign: 'center' }}>
                        Vi kunne ikke finde noget data at vise dig på
                    {' '}
                    {companyData.navn}
                  </Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {/* <div className={css.buttonArea}>
          {companyData.companyMetaData && (
            <Button
              variant="text"
              color="primary"
              type="button"
              target="_blank"
              href={`https://datacvr.virk.dk/data/visenhed?enhedstype=virksomhed&id=${companyData?.companyMetaData['CVR-nummer']}`}
            >
            Åben i enhedsvisning for
              {' '}
              {companyData.navn}
              {' '}
            direkte i CVR
            </Button>
          )}
        </div> */}
      </FloatingPanel>
    </div>
  );
}

CompanyDataModel.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  companyData: PropTypes.object.isRequired
};


export default withStyles(styles)(CompanyDataModel);
