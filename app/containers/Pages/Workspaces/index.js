import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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
function Workspaces(props) {
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
      name: 'Tags',
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
          <Button variant="contained" color="secondary" href={`/app/conditions/${value}`}>
              Open
          </Button>
        )
      }
    },
    {
      name: 'Last Edited',
      options: {
        filter: true,
      }
    },
  ];

  const data = [
    ['Test Workspace', 'This is a test of a workspace', 'Test group', 'active', 1, 1, 'Friday at 3:59 pm'],
    ['Test Workspace', 'This is a test of a workspace', 'Test group', 'active', 2, 2, 'Friday at 3:59 pm'],
    ['Test Workspace', 'This is a test of a workspace', 'Test group', 'active', 3, 3, 'Friday at 3:59 pm'],
    ['Test Workspace', 'This is a test of a workspace', 'Test group', 'active', 4, 4, 'Friday at 3:59 pm'],
    ['Test Workspace', 'This is a test of a workspace', 'Test group', 'active', 5, 5, 'Friday at 3:59 pm'],
    ['Test Workspace', 'This is a test of a workspace', 'Test group', 'active', 6, 6, 'Friday at 3:59 pm'],
    ['Test Workspace', 'This is a test of a workspace', 'Test group', 'active', 7, 7, 'Friday at 3:59 pm'],
    ['Test Workspace', 'This is a test of a workspace', 'Test group', 'active', 8, 8, 'Friday at 3:59 pm'],
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

Workspaces.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Workspaces);
