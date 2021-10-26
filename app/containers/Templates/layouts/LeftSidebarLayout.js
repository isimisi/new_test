import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import {
  Header,
  Sidebar,
} from '@components';
import dataMenu from '@api/ui/menu';
import Decoration from '../Decoration';
import styles from '../appStyles-jss';

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
    handleOpenGuide
  } = props;

  return (
    <Fragment>
      <Header
        toggleDrawerOpen={toggleDrawer}
        margin={sidebarOpen}
        gradient={gradient}
        position="left-sidebar"
        changeMode={changeMode}
        mode={mode}
        title={place}
        history={history}
        openGuide={handleOpenGuide}
      />
      <Sidebar
        open={sidebarOpen}
        toggleDrawerOpen={toggleDrawer}
        loadTransition={loadTransition}
        dataMenu={dataMenu}
        leftSidebar
      />
      <main className={classNames(classes.content, !sidebarOpen ? classes.contentPaddingLeft : '')} id="mainContent">
        <Decoration
          mode={mode}
          gradient={gradient}
          decoration={deco}
          bgPosition={bgPosition}
          horizontalMenu={false}
        />
        <section className={classNames(classes.mainWrap, classes.sidebarLayout)}>
          { !pageLoaded && (<img src="https://app-juristic-media.s3.eu-north-1.amazonaws.com/spinner.gif" alt="spinner" className={classes.circularProgress} />) }
          <Fade
            in={pageLoaded}
            {...(pageLoaded ? { timeout: 700 } : {})}
          >
            <div className={!pageLoaded ? classes.hideApp : ''}>
              {/* Application content will load here */}
              { children }
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
  handleOpenGuide: PropTypes.func.isRequired
};

export default (withStyles(styles)(LeftSidebarLayout));
