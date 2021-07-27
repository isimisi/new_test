/* eslint-disable no-shadow */
/* eslint-disable no-bitwise */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { reducer } from './constants';
import { analyseOutput } from './reducers/workspaceActions';
import styles from './workspace-jss';
import { MiniFlow } from '@components';

const elements = [{
  id: '279',
  type: 'custom',
  data: {
    label: 'Selskab', displayName: 'KNO Holding ApS', figur: null, unitNumber: '4008840832', attributes: [], backgroundColor: 'rgba(255, 255, 255, 1)', borderColor: 'rgba(0, 0, 0, 1)'
  },
  position: { x: 21, y: 152 }
}, {
  id: '280',
  type: 'custom',
  data: {
    label: 'Person', displayName: 'Kean Nøbølle Ottesen', figur: null, unitNumber: '4008840831', attributes: [], backgroundColor: 'rgba(255, 255, 255, 1)', borderColor: 'rgba(0, 0, 0, 1)'
  },
  position: { x: 30, y: 32 }
}, {
  id: '281',
  type: 'custom',
  data: {
    label: 'Selskab', displayName: 'Juristic ApS', figur: null, unitNumber: '4008862861', attributes: [], backgroundColor: 'rgba(255, 255, 255, 1)', borderColor: 'rgba(0, 0, 0, 1)'
  },
  position: { x: 28, y: 250 }
}, {
  arrowHeadType: false,
  animated: false,
  sourceHandle: 'bottom',
  data: {
    label: 'Ejerskab',
    value: '100%',
    showLabel: false,
    color: {
      r: 0, g: 0, b: 0, a: 1
    },
    showArrow: false,
    animated: false,
    lineThrough: false,
    stroke: false
  },
  target: '279',
  style: { stroke: 'rgba(0, 0, 0, 1)' },
  label: '100%',
  labelBgPadding: [0, 0],
  targetHandle: 'top',
  type: 'default',
  source: '280',
  id: '273',
  labelStyle: {}
}, {
  arrowHeadType: false,
  animated: true,
  sourceHandle: 'bottom',
  data: {
    label: 'Ejerskab',
    value: '33,33-49,99%',
    showLabel: false,
    color: {
      r: 0, g: 0, b: 0, a: 1
    },
    showArrow: false,
    animated: true,
    lineThrough: false,
    stroke: false
  },
  target: '281',
  style: { stroke: 'rgba(0, 0, 0, 1)' },
  label: '33,33-49,99%',
  labelBgPadding: [0, 0],
  targetHandle: 'top',
  type: 'default',
  source: '279',
  id: '274',
  labelStyle: {}
}, {
  arrowHeadType: false,
  animated: false,
  sourceHandle: 'rightTop',
  data: {
    label: 'hej med dig',
    value: 'nej',
    showLabel: true,
    color: {
      r: 0, g: 0, b: 0, a: 1
    },
    showArrow: false,
    animated: false,
    lineThrough: false,
    stroke: false
  },
  target: '281',
  style: { stroke: 'rgba(0, 0, 0, 1)' },
  labelBgPadding: [0, 0],
  targetHandle: 'rightBottom',
  type: 'custom',
  source: '279',
  id: '279',
  labelStyle: {}
}];


const WorkspaceAnalysis = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();

  const outputs = useSelector(state => state.getIn([reducer, 'outputs'])).toJS();

  useEffect(() => {
    dispatch(analyseOutput(id));
  }, []);

  const test = [1, 2, 3, 4];

  return (
    <Paper style={{
      paddingTop: 30,
      paddingBottom: 30,
      paddingLeft: 15,
      paddingRight: 15,
      minHeight: '87vh'
    }}
    >
      {[1, 2].map(output => (
        <>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography>
          Condition name
              </Typography>
              <MiniFlow elements={elements} />
            </Grid>
            <Grid item xs={6}>
              {/* <div dangerouslySetInnerHTML={{ __html: output.output }} /> */}
              <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum congue ipsum sed dictum. Cras lacinia diam id aliquam tristique. Nam sed venenatis quam. Phasellus augue elit, ullamcorper hendrerit sem ut, efficitur volutpat purus. Nulla cursus malesuada metus, ac ultricies est. Aenean ut pellentesque lorem. Donec vel mi ac lorem lacinia cursus. Nam lobortis tempus ultricies. Nulla id lacus ipsum. Aliquam ut tincidunt libero, sit amet facilisis mi. Proin quis blandit ipsum. Suspendisse cursus semper scelerisque. Mauris rutrum velit augue, at pharetra ex suscipit id.

Mauris dapibus suscipit dui eu faucibus. Nullam id fringilla est. Proin ornare diam nec nisl placerat rutrum. Aliquam erat volutpat. Phasellus maximus accumsan eleifend. Mauris ullamcorper velit nec ante accumsan, a mattis libero tristique. In vel imperdiet dui, ut gravida mauris. Nam lacinia magna a enim dapibus faucibus. Cras posuere nisi et urna tristique ultricies. Nunc mauris purus, pharetra et ultricies sed, aliquet a orci. Donec tellus tellus, convallis vitae rhoncus eget, commodo nec erat.
              </div>

            </Grid>
          </Grid>
          <Divider style={{ margin: 20 }} />
        </>
      ))}
    </Paper>
  );
};

WorkspaceAnalysis.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkspaceAnalysis);
