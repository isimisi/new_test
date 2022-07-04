import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import classNames from "classnames";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import withStyles from '@mui/styles/withStyles';
import { toggleAction, openAction, playTransitionAction } from "@redux/actions/uiActions";
import { GuideSlider } from "@components";
import LeftSidebarLayout from "./layouts/LeftSidebarLayout";
import styles from "./appStyles-jss";

function Dashboard(props) {
  // Initial header style
  const [openGuide, setOpenGuide] = useState(false);
  const [appHeight, setAppHeight] = useState(0);

  useEffect(() => {
    const { history, loadTransition } = props;

    // Adjust min height
    setAppHeight(window.innerHeight);

    // Set expanded sidebar menu
    const currentPath = history.location.pathname;
    props.initialOpen(currentPath);
    // Play page transition
    loadTransition(true);

    // Execute all arguments when page changes
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        loadTransition(true);
      }, 500);
    });

    return () => {
      if (unlisten != null) {
        unlisten();
      }
    };
  }, []);

  const handleOpenGuide = () => {
    setOpenGuide(true);
  };

  const handleCloseGuide = () => {
    setOpenGuide(false);
  };

  const {
    classes,
    children,
    toggleDrawer,
    sidebarOpen,
    loadTransition,
    pageLoaded,
    mode,
    history,
    gradient,
    deco,
    bgPosition,
    changeMode,
  } = props;

  const parts = history.location.pathname.split("/");
  const place = parts[parts.length - 1].replace("-", " ");
  return (
    <div
      style={{ minHeight: "100vh" }}
      className={classNames(classes.appFrameInner, classes.sideNav, "light-mode")}
    >
      <GuideSlider openGuide={openGuide} closeGuide={handleCloseGuide} />
      <LeftSidebarLayout
        history={history}
        toggleDrawer={toggleDrawer}
        loadTransition={loadTransition}
        changeMode={changeMode}
        sidebarOpen={sidebarOpen}
        pageLoaded={pageLoaded}
        mode={mode}
        gradient={gradient}
        deco={deco}
        bgPosition={bgPosition}
        place={place}
        handleOpenGuide={handleOpenGuide}
      >
        {children}
      </LeftSidebarLayout>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  initialOpen: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
};

const reducer = "ui";
const mapStateToProps = (state) => ({
  sidebarOpen: state[reducer].get("sidebarOpen"),
  pageLoaded: state[reducer].get("pageLoaded"),
  mode: state[reducer].get("type"),
  gradient: false,
  deco: state[reducer].get("decoration"),
  layout: state[reducer].get("layout"),
  bgPosition: "header",
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  toggleDrawer: () => dispatch(toggleAction),
  initialOpen: bindActionCreators(openAction, dispatch),
  loadTransition: bindActionCreators(playTransitionAction, dispatch),
});

const DashboardMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default withStyles(styles)(DashboardMaped);
