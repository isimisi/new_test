/* eslint-disable no-bitwise */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Iframe from 'react-iframe';
import Grid from '@material-ui/core/Grid';
import { reducer } from './constants';
import { analyseOutput } from './reducers/workspaceActions';
import styles from './workspace-jss';

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
    <div className={classes.root}>
      <Grid container spacing={3} style={{ alignItems: 'center', justifyContent: 'center' }}>
        {outputs.map((o) => (
          <Grid key={o.id} item xl={6} md={12} style={{ height: '80vh' }}>
            <Iframe
              url={o.output}
              width="100%"
              height="100%"
              display="initial"
              position="relative"
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

WorkspaceAnalysis.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkspaceAnalysis);
