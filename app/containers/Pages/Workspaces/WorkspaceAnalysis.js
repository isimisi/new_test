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
import test from './test.jpg';


const WorkspaceAnalysis = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();

  const outputs = useSelector(state => state.getIn([reducer, 'outputs'])).toJS();

  useEffect(() => {
    dispatch(analyseOutput(id));
  }, []);


  return (
    <Paper style={{
      paddingTop: 30,
      paddingBottom: 30,
      paddingLeft: 15,
      paddingRight: 15,
      minHeight: '87vh'
    }}
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography>
          Condition name
          </Typography>
          <img src={test} />
        </Grid>
        <Grid item xs={6}>
          <Typography>
        orem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquam sagittis nisi, in sollicitudin metus tempus eget. Sed at arcu lectus. Donec nulla tellus, lacinia ac dolor at, mattis commodo lectus. Donec cursus velit in pretium ullamcorper. Nullam at venenatis libero. In hac habitasse platea dictumst. Ut at elementum ex. Proin lacus sapien, fermentum finibus magna sed, lacinia vestibulum felis. Etiam sem nunc, aliquet ac velit quis, efficitur iaculis nisi. Nulla sagittis sapien eu ornare facilisis. Mauris suscipit diam quam, eget semper mauris dignissim sit amet. Vivamus luctus, augue congue lacinia consequat, nisi velit mollis nisl, quis tempus purus augue ac tellus. Vivamus efficitur ante in odio mattis, sed ultricies lectus auctor. Nam vehicula mauris at erat faucibus hendrerit. Nam eu tempor lacus. Pellentesque sit amet mi erat.

In enim neque, consectetur varius auctor vitae, gravida ac tellus. Vestibulum a rutrum lectus, in semper tellus. Nullam placerat tortor vitae arcu finibus, sed feugiat dui dapibus. Duis nulla massa, consequat in sodales convallis, commodo vitae arcu. Sed faucibus eros non tellus interdum, ultrices ullamcorper tellus faucibus. Morbi ex lorem, congue sit amet varius vel, ultrices sit amet dui. Proin enim nisi, congue eu tellus ut, rutrum tempus justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent ac elementum leo. Ut rhoncus, massa efficitur malesuada viverra, erat erat efficitur enim, in laoreet lorem mi ac ipsum. Maecenas eget quam id tellus tempus consectetur a non leo. In finibus eu enim at elementum. In eget urna quam. Integer finibus feugiat dolor id auctor. Pellentesque tempor erat eget massa facilisis, eget commodo nisl euismod.
          </Typography>
        </Grid>
      </Grid>
      <Divider style={{ margin: 20 }} />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <img src={test} />
        </Grid>
        <Grid item xs={6}>
          <Typography>
        orem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquam sagittis nisi, in sollicitudin metus tempus eget. Sed at arcu lectus. Donec nulla tellus, lacinia ac dolor at, mattis commodo lectus. Donec cursus velit in pretium ullamcorper. Nullam at venenatis libero. In hac habitasse platea dictumst. Ut at elementum ex. Proin lacus sapien, fermentum finibus magna sed, lacinia vestibulum felis. Etiam sem nunc, aliquet ac velit quis, efficitur iaculis nisi. Nulla sagittis sapien eu ornare facilisis. Mauris suscipit diam quam, eget semper mauris dignissim sit amet. Vivamus luctus, augue congue lacinia consequat, nisi velit mollis nisl, quis tempus purus augue ac tellus. Vivamus efficitur ante in odio mattis, sed ultricies lectus auctor. Nam vehicula mauris at erat faucibus hendrerit. Nam eu tempor lacus. Pellentesque sit amet mi erat.

In enim neque, consectetur varius auctor vitae, gravida ac tellus. Vestibulum a rutrum lectus, in semper tellus. Nullam placerat tortor vitae arcu finibus, sed feugiat dui dapibus. Duis nulla massa, consequat in sodales convallis, commodo vitae arcu. Sed faucibus eros non tellus interdum, ultrices ullamcorper tellus faucibus. Morbi ex lorem, congue sit amet varius vel, ultrices sit amet dui. Proin enim nisi, congue eu tellus ut, rutrum tempus justo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Praesent ac elementum leo. Ut rhoncus, massa efficitur malesuada viverra, erat erat efficitur enim, in laoreet lorem mi ac ipsum. Maecenas eget quam id tellus tempus consectetur a non leo. In finibus eu enim at elementum. In eget urna quam. Integer finibus feugiat dolor id auctor. Pellentesque tempor erat eget massa facilisis, eget commodo nisl euismod.
          </Typography>
        </Grid>
      </Grid>

    </Paper>
  );
};

WorkspaceAnalysis.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkspaceAnalysis);
