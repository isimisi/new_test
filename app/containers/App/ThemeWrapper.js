import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Loading from '@material-ui/core/LinearProgress';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { bindActionCreators } from 'redux';
import { withStyles, createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  changeThemeAction,
  changeModeAction,
  changeGradientAction,
  changeDecoAction,
  changeBgPositionAction,
  changeLayoutAction,
  changeDirectionAction
} from '@redux/actions/uiActions';
import applicationTheme from '../../styles/theme/applicationTheme';

const styles = {
  root: {
    width: '100%',
    minHeight: '100%',
    marginTop: 0,
    zIndex: 1,
  },
  loading: {
    zIndex: 10,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    opacity: 1,
    transition: 'opacity .5s ease'
  },
  loadingWrap: {
    background: 'none'
  },
  bar: {
    background: 'rgba(255, 255, 255, 0.7)'
  },
  hide: {
    opacity: 0
  }
};

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export const ThemeContext = React.createContext(undefined);

function ThemeWrapper(props) {
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState(
    // eslint-disable-next-line
    createTheme(applicationTheme(props.color, props.mode, props.direction))
  );

  const {
    classes,
    children,
    color,
    direction
  } = props;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
        }
        const diff = Math.random() * 40;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);


  const handleChangeMode = modeParam => {
    const { changeMode } = props;
    setTheme(
      createTheme(
        applicationTheme(color, modeParam, direction)
      )
    );
    changeMode(modeParam);
  };


  return (
    <StylesProvider jss={jss}>
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Loading
            variant="determinate"
            value={progress}
            className={progress >= 100 ? classes.hide : ''}
            classes={{
              root: classes.loading,
              colorPrimary: classes.loadingWrap,
              barColorPrimary: classes.bar
            }}
          />
          <ThemeContext.Provider value={handleChangeMode}>
            {children}
          </ThemeContext.Provider>
        </div>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

ThemeWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
};

const reducer = 'ui';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  color: state[reducer].get('theme'),
  palette: state[reducer].get('palette'),
  mode: state[reducer].get('type'),
  gradient: state[reducer].get('gradient'),
  decoration: state[reducer].get('decoration'),
  bgPosition: state[reducer].get('bgPosition'),
  layout: state[reducer].get('layout'),
  direction: state[reducer].get('direction'),
});

const dispatchToProps = dispatch => ({
  changeTheme: bindActionCreators(changeThemeAction, dispatch),
  changeMode: bindActionCreators(changeModeAction, dispatch),
  changeGradient: bindActionCreators(changeGradientAction, dispatch),
  changeDecoration: bindActionCreators(changeDecoAction, dispatch),
  changeBgPosition: bindActionCreators(changeBgPositionAction, dispatch),
  changeLayout: bindActionCreators(changeLayoutAction, dispatch),
  changeDirection: bindActionCreators(changeDirectionAction, dispatch),
});

const ThemeWrapperMapped = connect(
  mapStateToProps,
  dispatchToProps
)(ThemeWrapper);

export default withStyles(styles)(ThemeWrapperMapped);
