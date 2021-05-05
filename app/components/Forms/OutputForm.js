import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState } from 'draft-js';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import EditIcon from '@material-ui/icons/Edit';
import Iframe from 'react-iframe';
import FileUpload from '../FileUpload/FileUpload';


const conditionOptions = [
  { label: 'Condition 1' },
  { label: 'Condition 2' },
  { label: 'Condition 3' },
  { label: 'Condition 4' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
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
  addBtn: {
    position: 'fixed',
    bottom: 30,
    right: 50,
    zIndex: 100,
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
});

const content = {
  blocks: [{
    key: '637gr',
    text: '',
    type: 'unstyled',
    depth: 0,
    inlineStyleRanges: [],
    entityRanges: [],
    data: {}
  }],
  entityMap: {}
};

const OutputForm = (props) => {
  const theme = useTheme();
  const [conditionValue, setConditionValue] = useState(null);
  const contentBlock = convertFromRaw(content);
  const tempEditorState = EditorState.createWithContent(contentBlock);
  const [dataEditorState, setEditorState] = useState(tempEditorState);
  const [files, setFiles] = useState([]);
  const [activeToggleButton, setActiveToggleButton] = React.useState('Upload a document');

  const handleChange = (event, value) => {
    setActiveToggleButton(value);
  };

  const onEditorStateChange = editorStateParam => {
    setEditorState(editorStateParam);
  };

  const {
    classes,
  } = props;

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
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
                    options={conditionOptions}
                    value={conditionValue}
                    onChange={(value) => setConditionValue(value)}
                  />
                </div>
                <Typography variant="p">Choose a condition</Typography>
              </div>
              <div className={classes.conditionWrap}>
                {files.length > 0 && (
                  <FileUpload
                    minimal
                    files={files}
                    handleChangeFile={(_files) => {
                      setFiles(_files);
                    }}
                  />
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
              files.length > 0
                ? (
                  <Iframe
                    url={files[0].preview}
                    width="100%"
                    height="900"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                  />
                )
                : (
                  <FileUpload
                    height={485}
                    files={files}
                    handleChangeFile={(_files) => {
                      setFiles(_files);
                    }}
                  />
                )
            )
              : (
                <Editor
                  editorState={dataEditorState}
                  editorClassName={classes.textEditor}
                  toolbarClassName={classes.toolbarEditor}
                  onEditorStateChange={onEditorStateChange}
                />
              )}
          </Paper>
        </Grid>
      </Grid>
      <div>
        <Tooltip title="Save">
          <Fab variant="extended" color="primary" className={classes.addBtn}>
            Save Condition
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
};

OutputForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutputForm);
