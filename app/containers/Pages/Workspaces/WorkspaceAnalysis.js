/* eslint-disable no-shadow */
/* eslint-disable no-bitwise */
import React, { useEffect, useState } from 'react';
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
import {
  Page, Text, View, Image, Document, StyleSheet, usePDF
} from '@react-pdf/renderer';
import { useScreenshot } from 'use-react-screenshot';


const WorkspaceAnalysis = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();
  const [image, takeScreenshot] = useScreenshot();


  const outputs = useSelector(state => state[reducer].get('outputs')).toJS();
  const [images, setImages] = useState([]);
  const [reactFlows, setReactFlows] = useState([]);


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

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  // Create Document Component
  const MyDocument = () => (
    <Document>
      {outputs.map((output, index) => (
        <Page size="A4" style={styles.page}>
          <Text>This is a header</Text>
          <View style={styles.section}>
            <Text>Section #1</Text>
            <Image src={images[index]} />
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      ))}
    </Document>
  );

  const [instance, updateInstance] = usePDF({ document: MyDocument });

  useEffect(() => {
    updateInstance();
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
      <a href={instance.url} download="test.pdf">
      Download
      </a>
      {outputs.map(output => (
        <>
          <Grid container spacing={3} style={{ height: 400 }}>
            <Grid item xs={6} style={{ marginBottom: 40 }}>
              <Typography variant="h6" contentEditable>
                {output.conditionLabel}
              </Typography>
              <MiniFlow elements={output.elements} setMiniFlow={(val) => setReactFlows(prevVal => [...prevVal, val])} />
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
