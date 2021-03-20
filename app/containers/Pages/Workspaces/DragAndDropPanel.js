/* eslint-disable no-param-reassign */
import React, { useRef } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './workspace-jss';
import DndCard from '../../../components/Cards/DndCard';

export const ItemTypes = {
  NODE: 'node'
};


const onDragStart = (event, nodeType) => {
  console.log(event, 'sads');
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const DrapAndDropPanel = (props) => {
  const { classes } = props;


  const testData = [
    {
      id: 'Leverandør',
      title: 'Leverandør',
      type: 'test',
      label: 'TEST',
      cardStyle: {
        margin: 'auto',
        marginBottom: 5
      },
      description: 'Dette er en leverandør node',
      tags: [
        { title: 'Error', color: 'white', bgcolor: '#F44336' },
        { title: 'Warning', color: 'white', bgcolor: '#FF9800' },
      ]
    },
    {
      id: 'datterSelskab',
      title: 'Datter Selskab',
      label: 'TEST',
      type: 'test',
      cardStyle: {
        margin: 'auto',
        marginBottom: 5
      },
      description: 'Dette er en leverandør node',
      tags: [
        { title: 'Info', color: 'white', bgcolor: '#0288D1' },
        { title: 'Success', color: 'white', bgcolor: '#388E3C' },
      ]
    }
  ];

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.NODE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));


  // (event) => onDragStart(event, data.type)
  return (
    <Grid
      xs={4}
      item
      className={classes.paperGlass}
    >
      {testData.map((data => (
        <DndProvider backend={HTML5Backend} key={data.id}>
          <div
            ref={drag}
            style={{
              opacity: isDragging ? 0.5 : 1,
              borderRadius: 10,
              boxShadow: '1px 3px 1px #9E9E9E',
              backgroundColor: 'white',
              marginTop: 20
            }}
          >
            <DndCard title={data.title} label={data.label} description={data.description} tags={data.tags} />
          </div>
        </DndProvider>
      )))}
    </Grid>
  );
};

DrapAndDropPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrapAndDropPanel);
