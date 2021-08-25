import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  convertFromRaw, convertToRaw,
  EditorState
} from 'draft-js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Map } from 'immutable';
import Tooltip from '@material-ui/core/Tooltip';
import { Editor } from 'react-draft-wysiwyg';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import EditIcon from '@material-ui/icons/Edit';
import Iframe from 'react-iframe';
import Lottie from 'lottie-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FileUpload from '../FileUpload/FileUpload';
import Word from './word.json';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  select: {
    width: '40%',
    marginRight: 20
  },
  dropzone: {
    display: 'flex',
    width: '100%',
    height: 400,
    backgroundColor: theme.palette.type === 'dark' ? '#303030' : '#F7F8FA',
    borderRadius: theme.rounded.small,
    border: theme.palette.type === 'dark' ? '1px solid #606060' : '1px solid #F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  addCircle: {
    width: '30%',
    height: '30%',
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  conditionWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textEditor: {
    background: theme.palette.background.paper,
    minHeight: 400,
    border: `1px solid ${theme.palette.divider}`,
    padding: '0 10px',
    color: theme.palette.text.primary,
    borderRadius: theme.rounded.small
  },
  toolbarEditor: {
    borderRadius: theme.rounded.small,
    background: theme.palette.background.default,
    border: 'none',
    '& > div': {
      background: theme.palette.background.paper,
      '& img': {
        filter: theme.palette.type === 'dark' ? 'invert(100%)' : 'invert(0%)'
      },
      '& a': {
        color: theme.palette.text.primary,
        '& > div': {
          borderTopColor: theme.palette.text.primary,
        }
      }
    }
  },
  lottie: {
    width: 700 / 1.5,
    height: 700 / 1.5,
    [theme.breakpoints.down('sm')]: {
      width: 400 / 1.5,
      height: 400 / 1.5,
    },
  },
  lottieContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  }
});

const OutputForm = (props) => {
  const {
    classes,
    title,
    outputFile,
    fileType,
    editorState,
    onFileTypeChange,
    onOutputChange,
    onEditorStateChange,
  } = props;

  const [activeToggleButton, setActiveToggleButton] = useState('Upload et dokument');

  useEffect(() => {
    if (editorState.getCurrentContent().hasText()) {
      setActiveToggleButton('Skab et dokument');
    }
  }, []);

  const handleChange = (event, value) => {
    setActiveToggleButton(value);
  };

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = outputFile;
    link.download = `${title}`;
    link.click();
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <div className={classes.inlineWrap}>
              <div className={classes.conditionWrap}>
                {outputFile && outputFile.length > 0 && (
                  <div className={classes.conditionWrap}>
                    <Tooltip title="Slet indhold">
                      <IconButton
                        color="primary"
                        aria-label="Download fil"
                        component="span"
                        style={{ marginRight: 20 }}
                        onClick={() => {
                          onFileTypeChange('');
                          onOutputChange(Map(), '');
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <FileUpload
                      minimal
                      handleChangeFile={(_files) => {
                        onFileTypeChange(_files[0].name.split('.')[1]);
                        onOutputChange(_files[0], _files[0].preview);
                      }}
                    />
                  </div>
                )}
                <ToggleButtonGroup size="large" value={activeToggleButton} exclusive onChange={handleChange} style={{ marginLeft: 20 }}>
                  <ToggleButton value="Upload et dokument">
                    <InsertDriveFileIcon />
                  </ToggleButton>
                  <ToggleButton value="Skab et dokument">
                    <EditIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            {activeToggleButton === 'Upload et dokument' ? (
              outputFile && outputFile.length > 0
                ? fileType === 'pdf' || outputFile.includes('https://')
                  ? (
                    <Iframe
                      url={fileType === 'pdf' ? outputFile : `https://docs.google.com/gview?url=${outputFile}&embedded=true`}
                      width="100%"
                      height="900"
                      id={title}
                      style={{ borderRadius: 10 }}
                      display="initial"
                      position="relative"
                    />
                  )
                  : (
                    <div className={classes.lottieContainer}>
                      <Typography variant="h4" component="h2">
                        Tryk gem for at se et preview af dit inhold
                      </Typography>
                      <Lottie animationData={Word} className={classes.lottie} loop={false} onClick={downloadFile} />
                    </div>
                  )
                : (
                  <FileUpload
                    height={485}
                    handleChangeFile={(_files) => {
                      onFileTypeChange(_files[0].name.split('.')[1]);
                      onOutputChange(_files[0], _files[0].preview);
                    }}
                  />
                )
            )
              : (
                <Editor
                  editorState={editorState}
                  editorClassName={classes.textEditor}
                  toolbarClassName={classes.toolbarEditor}
                  onEditorStateChange={onEditorStateChange}
                />
              )}
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
};

OutputForm.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  outputFile: PropTypes.string.isRequired,
  fileType: PropTypes.string.isRequired,
  editorState: PropTypes.any.isRequired,
  onFileTypeChange: PropTypes.func.isRequired,
  onOutputChange: PropTypes.func.isRequired,
  onEditorStateChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(OutputForm);
