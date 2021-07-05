import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import colorfull from '@api/palette/colorfull';
import TextField from '@material-ui/core/TextField';
import CounterWidget from '../Counter/CounterWidget';
import styles from './group-jss';


const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
  return <Slide direction="up" ref={ref} {...props} />;
});

const categories = [
  'output',
  'red flags',
  'forbindelser',
  'betingelser',
  'elementer',
  'kendetegn',
  'arbejdsområdet'
];

function GroupDetail(props) { // eslint-disable-line
  const {
    classes,
    open,
    close,
    listView,
    activeGroup,
    updateDetail
  } = props;

  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [title, setTitle] = useState(activeGroup.title);
  const [description, setDescription] = useState(activeGroup.description);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={close}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          {!isTitleFocused ? (
            <Typography
              variant="h6"
              noWrap
              color="inherit"
              className={classes.flex}
              onClick={() => {
                setIsTitleFocused(true);
              }}
            >
              {title}
            </Typography>
          ) : (
            <TextField
              className={classes.flex}
              autoFocus
              inputProps={{ className: classes.header }}
              value={title}
              onChange={event => setTitle(event.target.value)}
              onBlur={() => {
                setIsTitleFocused(false);
                updateDetail(title, description);
              }}
            />
          )}
          <IconButton color="inherit" onClick={() => close()} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.detailDescription}>
        <TextField
          style={{ width: '100%' }}
          variant="outlined"
          multiline
          onChange={event => setDescription(event.target.value)}
          value={description}
          onBlur={() => {
            updateDetail(title, description);
          }}
        />
      </div>
      <div className={classes.detailContainer}>
        <Grid
          container
          alignItems="flex-start"
          justify="flex-start"
          direction="row"
          spacing={3}
        >
          {
            categories.map((category, index) => (
              <Grid item md={listView === 'list' ? 12 : 4} sm={listView === 'list' ? 12 : 6} xs={12} key={index.toString()}>
                <CounterWidget
                  color={colorfull[index]}
                  start={0}
                  end={activeGroup[`${category}`] && activeGroup[`${category}`].length}
                  duration={3}
                  title={category}
                />
              </Grid>
            ))
          }
        </Grid>
      </div>

    </Dialog>
  );
}

GroupDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  listView: PropTypes.string.isRequired,
  activeGroup: PropTypes.object.isRequired,
  updateDetail: PropTypes.func.isRequired,
};

export default withStyles(styles)(GroupDetail);
