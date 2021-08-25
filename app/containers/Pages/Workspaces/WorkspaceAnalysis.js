/* eslint-disable no-shadow */
/* eslint-disable no-bitwise */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ReactQuill from 'react-quill';
import { reducer } from './constants';
import { analyseOutput } from './reducers/workspaceActions';
import { MiniFlow } from '@components';
import 'react-quill/dist/quill.bubble.css';

const WorkspaceAnalysis = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();

  const outputs = useSelector(state => state[reducer].get('outputs')).toJS();

  useEffect(() => {
    dispatch(analyseOutput(id));
  }, []);

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' },
        { indent: '-1' }, { indent: '+1' }],
      ['link'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: true,
    }
  };


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
          <Grid container spacing={3} style={{ height: 400 }}>
            <Grid item xs={6} style={{ marginBottom: 40 }}>
              <Typography variant="h6" contentEditable>
                {output.conditionLabel}
              </Typography>
              <MiniFlow elements={output.elements} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" contentEditable>
                {output.action.label}
              </Typography>
              <ReactQuill
                placeholder="Note"
                theme="bubble"
                value={output.action.output}
                modules={modules}
              />
            </Grid>
          </Grid>
          <Divider style={{ margin: 20 }} />
        </>
      ))}
    </Paper>
  );
};

export default WorkspaceAnalysis;
