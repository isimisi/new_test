/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import brand from '@api/dummy/brand';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {
  GuideSlider,
  CounterIconsWidget,
  TimelineWidget,
  NewsListWidget,
  PapperBlock,
  Notification
} from '@components';
import FormControl from '@material-ui/core/FormControl';
import Send from '@material-ui/icons/Send';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import Lottie from 'lottie-react';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { loadFromLocalStorage } from '@api/localStorage/localStorage';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import styles from './dashboard-jss';
import {
  closeNotifAction,
  getElementCounts,
  getTimeline,
  postFeatureRequest,
  getUserInfo,
  handleRunIntro,
  changeStepIndex
} from './reducers/dashboardActions';
import UpgradeModal from './UpgradeModal';
import MobileDisclaimer from './MobileDisclaimer';
import {
  postWorkspace, showNotifAction
} from '../Workspaces/reducers/workspaceActions';
import raccoon from '../../../api/ui/raccoon/Clipboard/data.json';


const { plan_id } = loadFromLocalStorage();

const PersonalDashboard = (props) => {
  const title = brand.name + ' - Personal Dashboard';
  const description = brand.desc;
  const { classes, openSubMenu } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const reducer = 'dashboard';
  const elementCounts = useSelector(state => state[reducer].get('elementCounts'));
  const timeline = useSelector(state => state[reducer].get('timeline'));
  const messageNotif = useSelector(state => state.workspace.get('message'));
  const runIntro = useSelector(state => state[reducer].get('runIntro'));
  const introStepIndex = useSelector(state => state[reducer].get('introStepIndex'));
  const workspaces = useSelector(state => state.workspace.get('workspaces')).toJS();


  const [featureValue, setFeatureValue] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [openGuide, setOpenGuide] = useState(false);
  const [showMobileDisclaimer, setShowMobileDisclaimer] = useState(false);


  const handleCloseGuide = () => {
    if (history.location.search.includes('first_visit')) {
      history.push('/app');
    }

    setOpenGuide(false);
  };

  const handleOpenGuide = () => {
    if (introStepIndex !== 0) {
      dispatch(showNotifAction('Find den lille cirkel der blinker og fortsæt hvor du slap fra'));
    } else {
      dispatch(handleRunIntro(true));
    }
  };


  useEffect(() => {
    dispatch(getElementCounts());
    dispatch(getTimeline());
    dispatch(getUserInfo());

    if (history.location.search.includes('upgraded')) {
      setShowUpgrade(true);
    }

    if (history.location.search.includes('first_visit') && !isMobile) {
      handleOpenGuide();
    }

    if (isMobile) {
      setShowMobileDisclaimer(true);
    }
  }, []);

  const handleFeatureChange = (e) => {
    setFeatureValue(e.target.value);
  };

  const handleSubmitFeature = () => {
    dispatch(postFeatureRequest(featureValue, setFeatureValue));
  };


  const createWorkspace = () => {
    dispatch(handleRunIntro(false));
    dispatch(changeStepIndex(0));

    if ((plan_id === 1 && workspaces.length === 10) || (plan_id === 2 && workspaces.length === 50)) {
      dispatch(showNotifAction('Du kan ikke lave flere arbejdsområder. Opgrader for at lave flere.'));
    } else {
      dispatch(postWorkspace(history));
    }
  };

  const handleJoyrideCallback = (data) => {
    const {
      action, index, type, status
    } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      // Need to set our running state to false, so we can restart if we click start again.
      dispatch(handleRunIntro(false));
      dispatch(changeStepIndex(0));
    } else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      const newStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

      if (index === 2) {
        openSubMenu('dataBuilder', undefined);
        setTimeout(() => {
          dispatch(changeStepIndex(newStepIndex));
        }, 400);
      } else if (index === 7) {
        openSubMenu('dataBuilder', undefined);
        setTimeout(() => {
          dispatch(changeStepIndex(newStepIndex));
        }, 400);
      } else {
        dispatch(changeStepIndex(newStepIndex));
      }
    }
  };

  const localeSteps = {
    skip: <Button size="small" style={{ color: '#bbb' }}>Spring over</Button>,
    back: <div>Forrige</div>,
    next: <div>Næste</div>,
  };

  const steps = [
    {
      content: <div style={{
        justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'
      }}
      >
        <h2>Velkommen til Juristic</h2>
        <Lottie
          animationData={raccoon}
          style={{
            width: '50%',
          }}
        />
      </div>,
      locale: localeSteps,
      placement: 'center',
      target: 'body',
    },
    {
      target: '.for_intro_0',
      content: <div style={{ textAlign: 'left' }}>Her er du nu! Forsiden indeholder et overblik over dine seneste arbejdsområder og ændringer.</div>,
      locale: localeSteps,
    },
    {
      target: '.for_intro_1',
      content: <div style={{ textAlign: 'left' }}>Her finder du en oversigt over arbejdsområder. De er kernen af platformen, og det er der, du kan indhente koncerndiagrammer og lave analyser!</div>,
      locale: localeSteps,
    },
    {
      target: '.for_intro_2',
      content: <div style={{ textAlign: 'left' }}>Her finder du en oversigt over de enkelte byggeklodser, som du kan se og redigere. Byggeklodser er en samlet betegnelse for indholdet i arbejdsområdet.</div>,
      locale: localeSteps,
    },
    {
      target: '.for_intro_Betingelser',
      content: <div style={{ textAlign: 'left' }}>Betingelser er den måde, hvorpå du kan programmere Juristic. Tænk på det som logikken bag det juridiske indhold.</div>,
      locale: localeSteps,
      disableBeacon: true,
    },
    {
      target: '.for_intro_Elementer',
      content: <div style={{ textAlign: 'left' }}>Elementer er en anden grundsten. Det kan for eksempelvis være selskaber, personer eller andre interessenter i analysen!</div>,
      locale: localeSteps,
      disableBeacon: true,
    },
    {
      target: '.for_intro_Kendetegn',
      content: <div style={{ textAlign: 'left' }}>Ved at tilføje kendetegn, som fx land eller lignende, kan du gøre logikken i betingelserne eller dine tegninger mere detaljerede!</div>,
      locale: localeSteps,
      disableBeacon: true,
    },
    {
      target: '.for_intro_Forbindelser',
      content: <div style={{ textAlign: 'left' }}>Forbindelser er de streger, du tegner mellem elementerne, fx ejerskab mellem to selskaber!</div>,
      locale: localeSteps,
      disableBeacon: true,
    },
    {
      target: '.for_intro_3',
      content: <div style={{ textAlign: 'left' }}>Under Rapportindhold kan du uploade filer eller skrive paradigmetekster, som skal være resultatet af den juridiske analyse. På den måde kan Juristic udarbejde første udkast til fx et notat eller en strukturrapport - og endda på få minutter. </div>,
      locale: localeSteps,
    },
    {
      target: '.for_intro_4',
      content: <div style={{ textAlign: 'left' }}>Red flags er avancerede notifikationer, som dukker op, mens du tegner i de enkelte arbejdsområder - i realtime.</div>,
      locale: localeSteps,
    },
    {
      target: '.for_intro_5',
      content: <div style={{ textAlign: 'left' }}>Alt indhold, fx arbejdsområder og byggeklodser, kan opdeles i grupper, så du kun ser det, der er vigtigt for dig.</div>,
      locale: localeSteps,
    },
    {
      target: '.for_intro_7',
      content: <div style={{ textAlign: 'left' }}>Hvis du har brug for mere hjælp, kan du altid trykke her og se svar på ofte stillede spørgsmål. Alternativt kan du altid skrive på vores chat.</div>,
      locale: localeSteps,
    },


    {
      target: '.personal_dashboard_workspace_button',
      content: 'Prøv at oprette et nyt arbejdsområde!',
      locale: localeSteps,
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      spotlightClicks: true,
    },
  ];


  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <GuideSlider openGuide={openGuide} closeGuide={handleCloseGuide} />
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={6} xs={12}>
          <CounterIconsWidget elementCounts={elementCounts} history={history} />
          <Divider className={classes.divider} />
          <NewsListWidget handleOpenGuide={handleOpenGuide} />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TimelineWidget timeline={timeline} history={history} />
          <Divider className={classes.divider} />
          <PapperBlock title="Send os et ønske" icon="ion-ios-redo-outline" whiteBg noMargin desc="Vi er glade for idéer og ser på det straks">
            <div className={classes.subscribeForm}>
              <FormControl>
                <TextField
                  label="Skriv dit ønske her"
                  className={classes.textField}
                  margin="normal"
                  onChange={handleFeatureChange}
                  value={featureValue}
                  multiline
                />
              </FormControl>
              <Fab size="medium" color="secondary" type="submit" onClick={handleSubmitFeature}>
                <Send />
              </Fab>
            </div>
          </PapperBlock>
          <Divider className={classes.divider} />
        </Grid>
      </Grid>
      <UpgradeModal
        open={showUpgrade}
        close={() => {
          dispatch(getUserInfo());
          setShowUpgrade(false);
        }}
      />
      <Joyride
        continuous
        run={runIntro}
        stepIndex={introStepIndex}
        scrollToFirstStep
        showSkipButton
        callback={handleJoyrideCallback}
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: '#36454F'
          },
        }}
      />
      <MobileDisclaimer
        open={showMobileDisclaimer}
        close={() => {
          setShowMobileDisclaimer(false);
        }}
      />
      <Fab variant="extended" color="primary" className={classNames(classes.addBtn, 'personal_dashboard_workspace_button')} onClick={createWorkspace}>
        Opret et nyt arbejdsområde
      </Fab>
    </div>
  );
};

const openAction = (key, keyParent) => ({ type: 'OPEN_SUBMENU', key, keyParent });
const reducer = 'ui';

const mapStateToProps = state => ({
  ...state,
  open: state[reducer].get('subMenuOpen')
});

const mapDispatchToProps = dispatch => ({
  openSubMenu: bindActionCreators(openAction, dispatch)
});

const Dash = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalDashboard);

PersonalDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  openSubMenu: PropTypes.any.isRequired
};

export default withStyles(styles)(Dash);
