import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import colorfull from '@api/palette/colorfull';
import TextField from '@mui/material/TextField';
import CounterWidget from '../Counter/CounterWidget';
import styles from './group-jss';
import { useTranslation } from 'react-i18next';


const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  const {t} = useTranslation();

  const categories = [
    t('groups.group-details.output'),
    t('groups.group-details.red_flags'),
    t('groups.group-details.connections'),
    t('groups.group-details.conditions'),
    t('groups.group-details.elements'),
    t('groups.group-details.features'),
    t('groups.group-details.workspace')
  ];

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
          <IconButton color="inherit" onClick={() => close()} aria-label="Close" size="large">
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
          justifyContent="flex-start"
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
