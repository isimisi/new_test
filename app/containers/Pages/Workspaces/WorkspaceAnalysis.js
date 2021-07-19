/* eslint-disable no-bitwise */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Editor from '@react-page/editor';
import Paper from '@material-ui/core/Paper';
import { cellPlugins } from '@components/Workspace/Analysis/plugins/cellPlugins';
import { reducer } from './constants';
import { analyseOutput } from './reducers/workspaceActions';
import styles from './workspace-jss';
import '@components/Workspace/Analysis/styles/styles.css';


import '@react-page/editor/lib/index.css';
import '@react-page/plugins-background/lib/index.css';
import '@react-page/plugins-spacer/lib/index.css';
import '@react-page/plugins-image/lib/index.css';
import '@react-page/plugins-slate/lib/index.css';


const WorkspaceAnalysis = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();

  const outputs = useSelector(state => state.getIn([reducer, 'outputs'])).toJS();

  useEffect(() => {
    dispatch(analyseOutput(id));
  }, []);


  const [value, setValue] = useState(null);

  const pluginsWithMargin = cellPlugins.map((p) => ({
    ...p,
    cellStyle: (data) => ({
      paddingLeft: data.paddingLeft,
      paddingRight: data.paddingRight,
      paddingTop: data.paddingTop,
      paddingBottom: data.paddingBottom,
      border: data.border,
    }),
    controls: [
      {
        title: 'Main',
        controls: p.controls,
      },
      {
        title: 'Styling',
        controls: {
          type: 'autoform',
          columnCount: 3,
          schema: {
            properties: {
              paddingLeft: {
                type: 'number',
              },
              paddingRight: {
                type: 'number',
              },
              paddingBottom: {
                type: 'number',
              },
              paddingTop: {
                type: 'number',
              },
              border: {
                type: 'string',
              },
            },
          },
        },
      },
    ],
  }));


  return (

    <Editor
      cellPlugins={pluginsWithMargin}
      value={value}

      onChange={setValue}
    />

  );
};

WorkspaceAnalysis.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkspaceAnalysis);
