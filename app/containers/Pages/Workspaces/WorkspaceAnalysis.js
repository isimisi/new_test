/* eslint-disable no-useless-escape */
/* eslint-disable no-shadow */
/* eslint-disable no-bitwise */
import React, {
  useEffect, useState
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
import { MiniFlow, Notification } from '@components';
import 'react-quill/dist/quill.bubble.css';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { reducer } from './constants';

import {
  analyseOutput, saveAnalysis, closeNotifAction, revisionHistory, analysisTextChange
} from './reducers/workspaceActions';


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
  drawerContent: {
    padding: 10
  },
}));


const WorkspaceAnalysis = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();
  const outputs = useSelector(state => state[reducer].get('outputs')).toJS();
  const revisionHistoryList = useSelector(state => state[reducer].get('revisionHistory')).toJS();

  const messageNotif = useSelector(state => state[reducer].get('message'));
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [activeRevision, setActiveRevision] = useState({});


  const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;


  useEffect(() => {
    dispatch(analyseOutput(id));
    dispatch(revisionHistory(id));
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

  const handleQuillChange = (v, index) => {
    dispatch(analysisTextChange(v, index));
  };

  const removePositionFromElements = (elements) => ([...elements].map(x => {
    const { position, ...rest } = x;
    return { ...rest };
  }));

  const handleDrawer = () => {
    setOpen(prevVal => {
      outputs.forEach((x, i) => {
        const revisionHistoryItem = revisionHistoryList[JSON.stringify(removePositionFromElements(x.elements))];

        if (revisionHistoryItem) {
          const firstRevisionIndex = revisionHistoryItem.findIndex(x => x.revision_number === 0);
          const lastRevisionIndex = revisionHistoryItem.findIndex((r, i) => {
            if (activeRevision[JSON.stringify(removePositionFromElements(x.elements))]) {
              return r.id === activeRevision[JSON.stringify(removePositionFromElements(x.elements))];
            }

            return firstRevisionIndex === 0 ? i === revisionHistoryItem.length - 1 : i === 0;
          });
          const revision = revisionHistoryItem[lastRevisionIndex];


          handleQuillChange(revision[prevVal ? 'output' : 'htmlDiffString'], i);
        }
      });

      return !prevVal;
    });
  };

  const save = () => {
    if (open) {
      handleDrawer();
    }

    outputs.forEach((output) => {
      dispatch(saveAnalysis(id, output.action.output, JSON.stringify(output.elements)));
    });
  };


  const handleSelectRevision = (key, value, index) => {
    const currRevisoion = { ...activeRevision };
    currRevisoion[key] = value;
    setActiveRevision(currRevisoion);


    const revisionString = revisionHistoryList[key].find(x => x.id === value).htmlDiffString;

    handleQuillChange(revisionString, index);
  };

  return (
    <>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      {outputs.map((output, index) => (
        <Grid container className={classes.root}>
          <Grid item xs={open && !matchpattern.test(output.action.output) ? 5 : 6} style={{ marginBottom: 40, paddingLeft: 20, paddingTop: 20 }}>
            <Typography variant="h6">
              {output.conditionLabel}
            </Typography>
            <MiniFlow elements={output.elements} />
          </Grid>
          <Grid item xs={open && !matchpattern.test(output.action.output) ? 5 : 6} style={{ paddingTop: 20 }}>
            <Typography variant="h6">
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
                  onChange={(v) => handleQuillChange(v, index)}
                  modules={modules}
                />
              )}
          </Grid>
          {open && (
            <Grid item xs={open && !matchpattern.test(output.action.output) ? 2 : 0} style={{ display: matchpattern.test(output.action.output) && 'none' }}>
              <Hidden smDown>
                <Drawer
                  variant="permanent"
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  style={{ height: '100%' }}
                >
                  <List style={{ padding: 0 }}>
                    {revisionHistoryList[JSON.stringify(removePositionFromElements(output.elements))]?.reverse().map((list, revisionIndex) => (
                      <ListItem
                        button
                        selected={activeRevision[JSON.stringify(removePositionFromElements(output.elements))] ? activeRevision[JSON.stringify(removePositionFromElements(output.elements))] === list.id : revisionIndex === 0}
                        key={list.id.toString()}
                        activeClassName={classes.active}
                        onClick={() => handleSelectRevision(JSON.stringify(removePositionFromElements(output.elements)), list.id, index)}
                      >
                        <ListItemText
                          primaryTypographyProps={{ variant: 'body1', style: { fontSize: 12 } }}
                          primary={list.created_at}
                          secondary={list.user.firstName + ' ' + list.user.lastName}
                        />
                      </ListItem>
                    ))}
                  </List>

                </Drawer>
              </Hidden>
            </Grid>
          )}
        </Grid>
      ))}

      <Tooltip title="Tidligere versioner">
        <Fab
          variant="extended"
          color="secondary"
          disabled={Object.keys(revisionHistoryList).length === 0}
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
