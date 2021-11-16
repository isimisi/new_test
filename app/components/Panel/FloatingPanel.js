import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ExpandIcon from '@material-ui/icons/CallMade';
import MinimizeIcon from '@material-ui/icons/CallReceived';
import styles from './panel-jss';

function FloatingPanel(props) {
  const {
    classes,
    openForm,
    closeForm,
    children,
    title,
    extraSize,
    width,
    expanded: initExpanded
  } = props;

  const [expanded, setExpanded] = useState(initExpanded);

  const toggleExpand = () => {
    setExpanded(expand => !expand);
  };

  return (
    <div>
      <div className={
        classNames(
          classes.formOverlay,
          openForm && (isWidthDown('sm', width) || expanded) ? classes.showForm : classes.hideForm
        )}
      />
      <section className={
        classNames(
          !openForm ? classes.hideForm : classes.showForm,
          expanded ? classes.expanded : '',
          classes.floatingForm,
          classes.formTheme,
          extraSize && classes.large,
          'floatingPanel'
        )}
      >
        <header>
          {title}
          <div className={classes.btnOpt}>
            {closeForm && (
              <Tooltip title={expanded ? 'Exit Full Screen' : 'Full Screen'}>
                <IconButton className={classes.expandButton} onClick={() => toggleExpand()} aria-label="Expand">
                  {expanded ? <MinimizeIcon /> : <ExpandIcon />}
                </IconButton>
              </Tooltip>
            )}
            {closeForm && (
              <Tooltip title="Close">
                <IconButton className={classes.closeButton} onClick={() => closeForm()} aria-label="Close">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            )}

          </div>
        </header>
        {children}
      </section>
    </div>
  );
}

FloatingPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  openForm: PropTypes.bool.isRequired,
  closeForm: PropTypes.func,
  children: PropTypes.node.isRequired,
  width: PropTypes.string.isRequired,
  title: PropTypes.string,
  extraSize: PropTypes.bool,
  expanded: PropTypes.bool,
};

FloatingPanel.defaultProps = {
  title: 'Add New Item',
  extraSize: false,
  closeForm: null,
  expanded: false
};

const FloatingPanelResponsive = withWidth()(FloatingPanel);
export default withStyles(styles)(FloatingPanelResponsive);
