/* eslint-disable no-useless-escape */
/* eslint-disable no-shadow */
/* eslint-disable no-bitwise */
import React, {
  useEffect, useRef, createRef
} from 'react';
import { useHistory, Prompt } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ReactQuill from 'react-quill';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { MiniFlow } from '@components';
import 'react-quill/dist/quill.bubble.css';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { analyseOutput, saveAnalysis } from './reducers/workspaceActions';
import { reducer } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: 400,
    zIndex: 1,
    position: 'relative',
    backgroundColor: 'white',
    overflow: 'hidden',
    display: 'flex',
    marginBottom: theme.spacing(3),
    borderRadius: theme.rounded.medium,
    boxShadow: theme.shade.light
  },
  drawerPaper: {
    position: 'relative',
    width: '100%',
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  hoverItem: { transition: '1s' },
}));


const WorkspaceAnalysis = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();
  const outputs = useSelector(state => state[reducer].get('outputs')).toJS();
  const quillRefs = useRef(outputs.map(() => createRef()));
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;


  useEffect(() => {
    dispatch(analyseOutput(id));
  }, []);

  const alertUser = e => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => {
      window.removeEventListener('beforeunload', alertUser);
    };
  }, []);

  const save = () => {
    outputs.forEach((output, index) => {
      let content = output.action.output;
      if (!matchpattern.test(content)) {
        content = quillRefs.current[index].current.state.value;
      }

      dispatch(saveAnalysis(id, content, JSON.stringify(output.elements)));
    });
  };


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

  const handleDrawer = () => {
    setOpen(prevVal => !prevVal);
  };

  return (
    <>
      {outputs.map((output, index) => (
        <div id={`analyses-${index}`}>
          <Grid container className={classes.root}>
            <Grid item xs={open ? 5 : 6} style={{ marginBottom: 40, paddingLeft: 20, paddingTop: 20 }} className={classes.hoverItem}>
              <Typography variant="h6" contentEditable>
                {output.conditionLabel}
              </Typography>
              <MiniFlow elements={output.elements} />
            </Grid>
            <Grid item xs={open ? 5 : 6} style={{ paddingTop: 20 }} className={classes.hoverItem}>
              <Typography variant="h6" contentEditable>
                {output.action.label}
              </Typography>
              {matchpattern.test(output.action.output)
                ? (
                  <div style={{
                    height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'
                  }}
                  >
                    <Button variant="contained" color="primary" href={output.action.output} target="_blank">Åben fil</Button>
                  </div>
                )
                : (
                  <ReactQuill
                    placeholder="Note"
                    theme="bubble"
                    value={output.action.output}
                    modules={modules}
                    ref={quillRefs.current[index]}
                  />
                )}
            </Grid>
            {open && (
              <Grid item xs={open ? 2 : 0} className={classes.hoverItem}>
                <Hidden smDown>
                  <Drawer
                    variant="permanent"
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    style={{ height: '100%' }}
                  />
                </Hidden>
              </Grid>
            )}
          </Grid>
        </div>
      ))}

      <Tooltip title="Tidligere versioner">
        <Fab
          variant="extended"
          color="secondary"
          style={{
            position: 'fixed',
            bottom: 30,
            right: 120,
            zIndex: 100,
          }}
          onClick={handleDrawer}
        >
          <AssignmentIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Gem">
        <Fab
          variant="extended"
          color="primary"
          style={{
            position: 'fixed',
            bottom: 30,
            right: 50,
            zIndex: 100,
          }}
          onClick={save}
        >
          <SaveIcon />
        </Fab>
      </Tooltip>
      <Prompt
        when
        message={() => 'Er du sikker på du vil forlade denne side uden at gemme dine ændringer?'}
      />
    </>
  );
};

export default WorkspaceAnalysis;
