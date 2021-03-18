import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import MUIDataTable from 'mui-datatables';

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
  }
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
function AdvFilter(props) {
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
      name: 'Progress',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <LinearProgress variant="determinate" color="secondary" value={value} />
        )
      }
    },
    {
      name: 'Status',
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (value === 'active') {
            return (<Chip label="Active" />);
          }
          if (value === 'non-active') {
            return (<Chip label="Non Active" color="primary" />);
          }
          return (<Chip label="Unknown" />);
        }
      }
    },
    {
      name: 'See Workspace',
      options: {
        filter: true,
        customBodyRender: (value) => (
          <Button variant="contained" color="primary" href={`/app/workspaces/${value}`}>
              Open
          </Button>
        )
      }
    },
    {
      name: 'See Report',
      options: {
        filter: true,
        customBodyRender: (value) => (
          <Button variant="contained" color="secondary" href={`/app/workspaces/${value}`}>
              Open
          </Button>
        )
      }
    },
  ];

  const data = [
    ['Test Workspace', 'This is a test of a workspace', 30, 'active', 1, 1],
    ['Test Workspace', 'This is a test of a workspace', 30, 'active', 2, 2],
    ['Test Workspace', 'This is a test of a workspace', 30, 'active', 3, 3],
    ['Test Workspace', 'This is a test of a workspace', 30, 'active', 4, 4],
    ['Test Workspace', 'This is a test of a workspace', 30, 'active', 5, 5],
    ['Test Workspace', 'This is a test of a workspace', 30, 'active', 6, 6],
    ['Test Workspace', 'This is a test of a workspace', 30, 'active', 7, 7],
    ['Test Workspace', 'This is a test of a workspace', 30, 'active', 8, 8],
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
        title="Your Workspaces"
        data={data}
        columns={columns}
        options={options}
        elevation={10}
      />
    </div>
  );
}

AdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvFilter);
