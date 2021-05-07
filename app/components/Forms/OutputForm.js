import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import { Map } from 'immutable';
import Tooltip from '@material-ui/core/Tooltip';
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
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


const mapSelectOptions = (options) => options.map(suggestion => ({
  value: suggestion.value,
  label: (
    <>
      <Tooltip title={suggestion.label}>
        <div style={{ width: '100%', height: '100%' }}>
          <span style={{ paddingRight: '5px' }}>{suggestion.value}</span>
        </div>
      </Tooltip>
    </>
  ),
}));

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  select: {
    width: '20%',
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
    justifyContent: 'space-between',
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
    condition,
    onConditionChange,
    conditionsDropDownOptions,
    onEditorStateChange
  } = props;

  const theme = useTheme();
  const [activeToggleButton, setActiveToggleButton] = useState('Upload a document');

  const handleChange = (event, value) => {
    setActiveToggleButton(value);
  };

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
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
              <div className={classes.conditionWrap} style={{ width: '100%' }}>
                <div className={classes.select}>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    inputId="react-select-single"
                    options={mapSelectOptions(conditionsDropDownOptions)}
                    value={condition && { label: condition, value: condition }}
                    onChange={(value) => onConditionChange(value.value)}
                  />
                </div>
                <Typography variant="p">Choose a condition</Typography>
              </div>
              <div className={classes.conditionWrap}>
                {outputFile.length > 0 && (
                  <div className={classes.conditionWrap}>
                    <Tooltip title="Delete uploaded file">
                      <IconButton
                        color="primary"
                        aria-label="download file"
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
                  <ToggleButton value="Upload a document">
                    <InsertDriveFileIcon />
                  </ToggleButton>
                  <ToggleButton value="Draft a document">
                    <EditIcon />
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            {activeToggleButton === 'Upload a document' ? (
              outputFile.length > 0
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
                        Press save to preview your document
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
  condition: PropTypes.string.isRequired,
  onConditionChange: PropTypes.func.isRequired,
  onEditorStateChange: PropTypes.func.isRequired,
  conditionsDropDownOptions: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default withStyles(styles)(OutputForm);
