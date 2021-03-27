import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { reduxForm } from 'redux-form/immutable';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initAction, clearAction } from '@redux/actions/reduxFormActions';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { useDropzone } from 'react-dropzone';
import NoteAdd from '@material-ui/icons/NoteAdd';
import { useSpring, animated } from 'react-spring';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';

const AnimatedNoteAdd = animated(NoteAdd);


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
    marginBottom: 40,
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


const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1];
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

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

function ReduxFormDemo(props) {
  const theme = useTheme();
  const [conditionValue, setConditionValue] = useState(null);
  const [hover, setHover] = useState(false);
  const [useSpringProps, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }));
  const contentBlock = convertFromRaw(content);
  const tempEditorState = EditorState.createWithContent(contentBlock);
  const [dataEditorState, setEditorState] = useState(tempEditorState);

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

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path}
      {' '}
-
      {' '}
      {file.size}
      {' '}
bytes
    </li>
  ));


  return (
    <div style={{ marginBottom: 20 }}>
      <Grid container spacing={3} alignItems="flex-start" direction="row" justify="center">
        <Grid item xs={12} md={12}>
          <Paper className={classes.root}>
            <div className={classes.inlineWrap}>
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
            <div
              {...getRootProps({ className: classes.dropzone })}
              onMouseMove={({ clientX: x, clientY: y }) => {
                set({ xys: calc(x, y) });
                setHover(true);
              }}
              onMouseLeave={() => {
                set({ xys: [0, 0, 1] });
                setHover(false);
              }}
            >
              <input {...getInputProps()} />
              <AnimatedNoteAdd
                className={classes.addCircle}
                style={{
                  opacity: hover ? 1 : 0.5,
                  color: hover ? theme.palette.primary.main : 'black',
                  transform: useSpringProps.xys.interpolate(trans)
                }}
              />
              <Typography variant="h5">Upload your Output</Typography>
            </div>
            <div>
              <ul>{files}</ul>
            </div>
            <div
              className={classes.inlineWrap}
              style={{
                alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20
              }}
            >
              <Typography variant="h4">
                Or
              </Typography>
            </div>
            <Editor
              editorState={dataEditorState}
              editorClassName={classes.textEditor}
              toolbarClassName={classes.toolbarEditor}
              onEditorStateChange={onEditorStateChange}
            />
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
}

ReduxFormDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction),
});

const ReduxFormMapped = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(ReduxFormDemo);

const reducer = 'initval';
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, 'formValues'])
  }),
  mapDispatchToProps,
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);
