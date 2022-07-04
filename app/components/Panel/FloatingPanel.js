import React, { useState } from "react";
import PropTypes from "prop-types";
import withStyles from '@mui/styles/withStyles';
import classNames from "classnames";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ExpandIcon from "@mui/icons-material/CallMade";
import MinimizeIcon from "@mui/icons-material/CallReceived";
import styles from "./panel-jss";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

function FloatingPanel(props) {
  const {
    classes,
    openForm,
    closeForm,
    children,
    title,
    extraSize,
    width,
    expanded: initExpanded,
  } = props;

  const [expanded, setExpanded] = useState(initExpanded);

  const toggleExpand = () => {
    setExpanded((expand) => !expand);
  };

  return (
    <div>
      <div
        className={classNames(
          classes.formOverlay,
          openForm && (isWidthDown("sm", width) || expanded)
            ? classes.showForm
            : classes.hideForm
        )}
      />
      <section
        className={classNames(
          !openForm ? classes.hideForm : classes.showForm,
          expanded ? classes.expanded : "",
          classes.floatingForm,
          classes.formTheme,
          extraSize && classes.large,
          "floatingPanel"
        )}
        style={{ ...(width ? { width } : {}) }}
      >
        <header>
          {title}
          <div className={classes.btnOpt}>
            {closeForm && (
              <Tooltip title={expanded ? "Exit Full Screen" : "Full Screen"}>
                <IconButton
                  className={classes.expandButton}
                  onClick={() => toggleExpand()}
                  aria-label="Expand"
                  size="large">
                  {expanded ? <MinimizeIcon /> : <ExpandIcon />}
                </IconButton>
              </Tooltip>
            )}
            {closeForm && (
              <Tooltip title="Close">
                <IconButton
                  className={classes.closeButton}
                  onClick={() => closeForm()}
                  aria-label="Close"
                  size="large">
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
  title: "Add New Item",
  extraSize: false,
  closeForm: null,
  expanded: false,
};

const FloatingPanelResponsive = withWidth()(FloatingPanel);
export default withStyles(styles)(FloatingPanelResponsive);
