/* eslint-disable no-shadow */
/* eslint-disable no-bitwise */
import React, { useEffect } from 'react';
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
      {outputs.map(output => (
        <>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography>
                {output.condition.label}
              </Typography>
              <MiniFlow elements={output.canvas} />
            </Grid>
            <Grid item xs={6}>
              <div dangerouslySetInnerHTML={{ __html: output.action.output }} />
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
