import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import styles from './alert-jss';
import { data, columns, options } from './constants';

const Alerts = (props) => {
  const { classes } = props;

  return (
    <div className={classes.table}>
      <MUIDataTable
        title="Your Red Flags"
        data={data}
        columns={columns}
        options={options}
        elevation={10}
      />
      <Tooltip title="New Alert">
        <Fab variant="extended" color="primary" className={classes.addBtn}>
            Create new Alert
        </Fab>
      </Tooltip>
    </div>
  );
};

Alerts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Alerts);
