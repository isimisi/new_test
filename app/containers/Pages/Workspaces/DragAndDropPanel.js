/* eslint-disable no-param-reassign */
import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Star from '@material-ui/icons/Star';
import SearchIcon from '@material-ui/icons/Search';
import styles from './workspace-jss';
import testData from './TestData';

const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const DrapAndDropPanel = (props) => {
  const { classes } = props;
  const [filter, setFilter] = useState('all');

  const handleChange = (event, value) => {
    setFilter(value);
  };


  return (
    <Fragment>
      <Drawer
        variant="permanent"
        anchor="left"
        open
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div>
          <div className={classes.toolbar}>
            <div className={classes.flex}>
              <div className={classes.searchWrapper}>
                <div className={classes.search}>
                  <SearchIcon />
                </div>
                <input className={classes.input} onChange={(event) => console.log(event)} placeholder="Search" />
              </div>
            </div>
          </div>
          <div className={classes.total}>
            {testData.length}
            &nbsp;
            Nodes
          </div>
          {testData.map((data => (
            <ListItem
              button
              key={data.id}
              onDragStart={(event) => onDragStart(event, data.type)}
              draggable
              onClick={() => console.log('give me info of the node')}
            >
              <ListItemText primary={data.title} secondary={data.description} />
            </ListItem>
          )))}
        </div>
      </Drawer>
      <BottomNavigation value={filter} onChange={handleChange} className={classes.bottomFilter}>
        <BottomNavigationAction label="All" value="all" icon={<PermContactCalendar />} />
        <BottomNavigationAction label="Favorites" value="favorites" icon={<Star />} />
      </BottomNavigation>
    </Fragment>
  );
};

DrapAndDropPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrapAndDropPanel);
