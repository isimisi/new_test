import React, { Fragment } from "react";
import { PropTypes } from "prop-types";
import classNames from "classnames";
import Fade from "@material-ui/core/Fade";
import { withStyles } from "@material-ui/core/styles";
import { Header, Sidebar } from "@components";
import dataMenu from "@api/ui/menu";
import Decoration from "../Decoration";
import styles from "../appStyles-jss";
import Loader from "@components/Loading/LongLoader";

function LeftSidebarLayout(props) {
  const {
    classes,
    children,
    toggleDrawer,
    sidebarOpen,
    loadTransition,
    pageLoaded,
    mode,
    gradient,
    deco,
    history,
    bgPosition,
    changeMode,
    place,
  } = props;

  const isTimeline = history.location.pathname.includes("timelines/");

  const isWorkspace =
    (history.location.pathname.includes("workspaces/") &&
      !history.location.pathname.includes("analysis")) ||
    isTimeline;

  return (
    <Fragment>
      {!isWorkspace && (
        <Header
          toggleDrawerOpen={toggleDrawer}
          margin={sidebarOpen}
          gradient={gradient}
          position="left-sidebar"
          changeMode={changeMode}
          mode={mode}
          title={place}
          history={history}
        />
      )}
      <Sidebar
        open={sidebarOpen}
        toggleDrawerOpen={toggleDrawer}
        loadTransition={loadTransition}
        dataMenu={dataMenu}
        leftSidebar
      />
      <main
        className={classNames(
          classes.content,
          !sidebarOpen
            ? isWorkspace
              ? classes.contentPaddingLeftWorkspace
              : classes.contentPaddingLeft
            : "",
          isWorkspace ? classes.contentPaddingNone : ""
        )}
        id="mainContent"
      >
        <Decoration
          mode={mode}
          gradient={gradient}
          decoration={deco}
          bgPosition={bgPosition}
          horizontalMenu={false}
        />
        <section
          className={classNames(
            classes.mainWrap,
            classes.sidebarLayout,
            isWorkspace ? classes.wrapSidebarPaddingNone : ""
          )}
        >
          {!pageLoaded && (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#F3F5F8",
                position: "absolute",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Loader />
            </div>
          )}
          <Fade in={pageLoaded} {...(pageLoaded ? { timeout: 700 } : {})}>
            <div className={!pageLoaded ? classes.hideApp : ""}>
              {/* Application content will load here */}
              {children}
            </div>
          </Fade>
        </section>
      </main>
    </Fragment>
  );
}

LeftSidebarLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  handleOpenGuide: PropTypes.func.isRequired,
};

export default withStyles(styles)(LeftSidebarLayout);
