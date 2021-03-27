import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import MUIDataTable from 'mui-datatables';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  table: {
    '& > div': {
      overflow: 'auto'
    },
    '& table': {
      '& td': {
        wordBreak: 'keep-all'
      },
      [theme.breakpoints.down('md')]: {
        '& td': {
          height: 60,
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }
    }
  },
  addBtn: {
    position: 'fixed',
    bottom: 30,
    right: 50,
    zIndex: 100,
  },
});


function Alerts(props) {
  const columns = [
    {
      name: 'Title',
      options: {
        filter: true
      }
    },
    {
      name: 'Description',
      options: {
        filter: true,
      }
    },
    {
      name: 'Group',
      options: {
        filter: true,
      }
    },
    {
      name: 'See Alert',
      options: {
        filter: true,
        customBodyRender: (value) => (
          <Button variant="contained" color="primary" href={`/app/alerts/${value}`}>
              Open
          </Button>
        )
      }
    },
    {
      name: 'Last edited',
      options: {
        filter: true,
      }
    },
  ];

  const data = [
    ['Test Alert', 'This is a test of a Alert', 'Test Group', 1, 'Friday at 3:59 pm'],
    ['Test Alert', 'This is a test of a Alert', 'Test Group', 2, 'Friday at 3:59 pm'],
    ['Test Alert', 'This is a test of a Alert', 'Test Group', 3, 'Friday at 3:59 pm'],
    ['Test Alert', 'This is a test of a Alert', 'Test Group', 4, 'Friday at 3:59 pm'],
    ['Test Alert', 'This is a test of a Alert', 'Test Group', 5, 'Friday at 3:59 pm'],
    ['Test Alert', 'This is a test of a Alert', 'Test Group', 6, 'Friday at 3:59 pm'],
    ['Test Alert', 'This is a test of a Alert', 'Test Group', 7, 'Friday at 3:59 pm'],
    ['Test Alert', 'This is a test of a Alert', 'Test Group', 8, 'Friday at 3:59 pm'],
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'stacked',
    print: true,
    rowsPerPage: 10,
    page: 0
  };

  const { classes } = props;

  return (
    <div className={classes.table}>
      <MUIDataTable
        title="Your Alerts"
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
}

Alerts.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Alerts);
