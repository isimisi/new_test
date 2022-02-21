/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable camelcase */
import React, {
  ChangeEvent, useEffect, useState
} from 'react';
import brand from '@api/dummy/brand';
import { countryDropDown } from '@helpers/countryOptions';
import Typography from '@material-ui/core/Typography';
import { Helmet } from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import type { RootState } from '@redux/configureStore';
import { useTheme } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  GuideSlider,
  CounterIconsWidget,
  TimelineWidget,
  NewsListWidget,
  PapperBlock,
  Notification
  // @ts-ignore
} from '@components';
import Paper from '@material-ui/core/Paper';

import Select from 'react-select';
import FormControl from '@material-ui/core/FormControl';


import Send from '@material-ui/icons/Send';
import axios from 'axios';
import { baseUrl } from '@api/constants';
// import Joyride, {
//   ACTIONS, EVENTS, STATUS, CallBackProps
// } from 'react-joyride';
import Lottie from 'lottie-react';
import AsyncSelect from 'react-select/async';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { mapSelectOptions, selectStyles } from '@api/ui/helper';
import {
  useHistory
} from 'react-router-dom';
import { isMobile } from 'react-device-detect';


import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useTranslation } from 'react-i18next';
import CreatableSelect from 'react-select/creatable';
import ButtonBase from '@material-ui/core/ButtonBase';
import Checkbox from '@material-ui/core/Checkbox';

import { SelectOptions, WhereInApp } from '@customTypes/data';
import { hanldeOnChange, MixedTagOptions, tagMapping } from '@components/Tags/constants';
import {

  getTags,
} from '@components/Tags/reducers/tagsActions';
import useStyles from './dashboard-jss';
import {
  closeNotifAction,
  getElementCounts,
  getTimeline,
  postFeatureRequest,
  getNotifications
} from './reducers/dashboardActions';
import UpgradeModal from './UpgradeModal';
import MobileDisclaimer from './MobileDisclaimer';
import {
  postWorkspace, showNotifAction, getGroupDropDown
} from '../Workspaces/reducers/workspaceActions';
import { useAuth0 } from "@auth0/auth0-react";
import { getPlanId, UserMeta } from '@helpers/userInfo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const corporateChart = require('@lotties/racoon/corporateChart.json');


const PersonalDashboard = () => {
  const classes = useStyles();
  const title = brand.name + ' - Personal Dashboard';
  const description = brand.desc;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const reducer = 'dashboard';
  const elementCounts = useAppSelector(state => state[reducer].get('elementCounts'));
  const timeline = useAppSelector(state => state[reducer].get('timeline'));
  const messageNotif = useAppSelector(state => state.workspace.get('message'));
  // const runIntro = useAppSelector(state => state[reducer].get('runIntro'));
  const { t } = useTranslation();
  const { user } = useAuth0();
  const plan_id = getPlanId(user);
  const meta: UserMeta = user && user["https://juristic.io/meta"];
  const { first_name } = meta.dbUser;
  const theme = useTheme();

  // const introStepIndex = useAppSelector(state => state[reducer].get('introStepIndex'));
  const workspaces = useAppSelector(state => state.workspace.get('workspaces')).toJS();
  const groupsDropDownOptions = useAppSelector(state => state.workspace.get('groupsDropDownOptions')).toJS();
  const tagOptions = useAppSelector(state => state.tags.get('tags')).toJS();

  const [featureValue, setFeatureValue] = useState('');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [openGuide, setOpenGuide] = useState(false);
  const [showMobileDisclaimer, setShowMobileDisclaimer] = useState(false);

  // workspace
  const [label, setLabel] = useState('');
  const labelChange = (e: ChangeEvent<HTMLInputElement>) => setLabel(e.target.value);
  const [workspacDescription, setWorkspacDescription] = useState('');
  const descriptionChange = (e: ChangeEvent<HTMLInputElement>) => setWorkspacDescription(e.target.value);
  const [group, setGroup] = useState('');
  const changeGroup = (val: SelectOptions) => setGroup(val.value);
  const [tags, setTags] = useState<MixedTagOptions[]>([]);
  const changeTags = (val: MixedTagOptions[]) => setTags(val);
  const [shareOrg, setShareOrg] = useState(false);
  const changeShareOrg = () => setShareOrg(prevVal => !prevVal);


  const [cvrSearch, setCvrSearch] = useState('');

  const changeCvrSearch = (val: SelectOptions) => setCvrSearch(val.value);
  const [countries, setCountries] = useState<SelectOptions[]>([]);
  const handleChangeCountries = (values: SelectOptions[]) => setCountries(values || []);
  // const [companyMapping, setCompanyMapping] = useState(uncertainCompanies?.reduce((obj, item) => ({ ...obj, [item.soughtAfterName]: { id: item.id, name: item.name, orgGuessedName: item.name } }), {}));


  const handleCloseGuide = () => {
    if (history.location.search.includes('first_visit')) {
      history.push('/app');
    }

    setOpenGuide(false);
  };

  const handleOpenGuide = () => {
    // if (introStepIndex !== 0) {
    //   dispatch(showNotifAction(t('personal-dashboard.find_the_small_circle')));
    // } else {
    //   dispatch(handleRunIntro(true));
    // }
    setOpenGuide(true);
  };


  useEffect(() => {
    if (user) {
      dispatch(getElementCounts(user));
      dispatch(getTimeline(user));
      dispatch(getGroupDropDown(user));
      dispatch(getTags(user, WhereInApp.workspace));
      dispatch(getNotifications(user));
    }


    if (history.location.search.includes('upgraded')) {
      setShowUpgrade(true);
    }

    if (history.location.search.includes('first_visit') && !isMobile) {
      handleOpenGuide();
    }

    if (isMobile) {
      setShowMobileDisclaimer(true);
    }
  }, [user]);

  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeatureValue(e.target.value);
  };

  const handleSubmitFeature = () => {
    if (user) {
      dispatch(postFeatureRequest(user, featureValue, setFeatureValue));
    }
  };


  const createEmptyWorkspace = () => {
    if (plan_id === 1 && workspaces.length === 50) {
      dispatch(showNotifAction(t('personal-dashboard.can_not_create_more_workspaces')));
    } else {
      user && dispatch(postWorkspace(user, history, label, workspacDescription, group, JSON.stringify(tags), shareOrg));
    }
  };


  const confirm = () => {
    const cvr = cvrSearch.includes('DK') && cvrSearch.length < 12 ? cvrSearch.substring(2) : cvrSearch;

    user && dispatch(postWorkspace(user, history, cvrSearch, undefined, 'Corporate', undefined, undefined, cvr));
  };

  const getAsyncOptions = inputValue => axios
    .get(`${baseUrl}/workspaces/cvr/dropdown?q=${inputValue}&countries=${plan_id === 1 ? JSON.stringify(["DK"]) : countries.length > 0 ? JSON.stringify(countries.map(x => x.value)) : JSON.stringify(['DK', 'SE', 'NO', 'FI'])}`)
    .then(res => res.data);

  const countryOptions = countryDropDown(plan_id);

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
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12}>
          <Typography align="center" variant="h5">
            {t('personal-dashboard.intro_greeting', { name: first_name })}
          </Typography>
          <Typography align="center" variant="h4" style={{ fontWeight: 'bold', marginBottom: 30 }}>
            {t('personal-dashboard.intro_text')}
          </Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper className={classes.papperBlock} elevation={0}>
            <div className={classes.descBlock}>
              <div className={classes.titleText}>
                <Typography variant="h6" component="h2" className={classes.title}>
                  {t('workspaces.load_from_CVR')}
                </Typography>
                <Typography component="p" className={classes.description}>
                  {t('workspaces.search_for_a_company_or_CVR_number')}
                </Typography>
              </div>
              <div style={{
                marginTop: theme.spacing(2), display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}
              >
                <Lottie animationData={corporateChart} className={classes.lottie} />
              </div>
            </div>
            <section className={classNames(classes.content, classes.whiteBg)}>
              <AsyncSelect
                styles={selectStyles('relative')}
                menuPlacement="auto"
                autoFocus
                maxMenuHeight={150}
                onChange={changeCvrSearch}
                placeholder={t('workspaces.search_for_a_company_or_CVR_number')}
                loadOptions={getAsyncOptions}
                noOptionsMessage={() => (
                  <Typography>
                      Her er intet at vise.
                  </Typography>
                )}
              />
              <div style={{ marginTop: theme.spacing(2) }}>
                <Select
                  styles={selectStyles('relative')}
                  isMulti
                  inputId="react-select-single-relationship"
                  placeholder={t('workspaces.restrict_countries')}
                  options={countryOptions}
                  value={countries}
                  onChange={handleChangeCountries}
                />
              </div>

              <div style={{ marginTop: theme.spacing(2), }}>
                <Button color="primary" variant="contained" onClick={confirm}>
                  {t('personal-dashboard.search')}
                </Button>
              </div>
            </section>
          </Paper>

        </Grid>
        <Grid item md={6} xs={12}>
          <PapperBlock title={t('personal-dashboard.start_empty')} whiteBg noMargin desc={t('personal-dashboard.create_empty_workspace')}>
            <div className={classes.removeMargin}>
              <TextField
                name="label"
                placeholder={t('workspaces.workspace-form.name')}
                label={t('workspaces.workspace-form.name')}
                className={classes.field}
                value={label}
                onChange={labelChange}
              />
            </div>
            <div>
              <TextField
                name="description"
                className={classes.field}
                placeholder={t('workspaces.workspace-form.desc')}
                label={t('workspaces.workspace-form.desc')}
                multiline
                rows={2}
                value={workspacDescription}
                onChange={descriptionChange}
              />
            </div>
            <div
              className={classes.field}
              style={{ marginTop: theme.spacing(2) }}
            >
              <Select
                classes={classes}
                styles={selectStyles()}
                inputId="react-select-single-workspace"
                TextFieldProps={{
                  label: t('workspaces.workspace-form.select_group'),
                  InputLabelProps: {
                    htmlFor: 'react-select-single-workspace',
                    shrink: true,
                  },
                  placeholder: t('workspaces.workspace-form.select_group'),
                }}
                placeholder={t('workspaces.workspace-form.select_group')}
                options={mapSelectOptions(groupsDropDownOptions)}
                value={group && { label: group, value: group }}
                onChange={changeGroup}
              />
            </div>
            <div
              className={classes.field}
              style={{ marginTop: theme.spacing(2) }}
            >
              <CreatableSelect
                styles={selectStyles()}
                isMulti
                isClearable
                value={tags.map(tagMapping)}
                onChange={(newValue, _meta) => hanldeOnChange(newValue, _meta, changeTags, tags)
                }
                inputId="react-select-tags"
                placeholder={t('workspaces.workspace-form.add_tags_to_your_workspace')}
                options={tagOptions.map(tagMapping)}
              />
            </div>
            {plan_id !== 1 && (
              <ButtonBase
                className={classes.row}
                style={{ marginTop: 10 }}
                onClick={changeShareOrg}
              >
                <Checkbox
                  checked={shareOrg}
                  name="show label"
                  color="primary"
                />
                <Typography variant="subtitle2">
                  {t('workspaces.workspace-form.checkbox')}
                </Typography>
              </ButtonBase>
            )}
            <div style={{ marginTop: theme.spacing(2) }}>
              <Button color="primary" variant="contained" onClick={createEmptyWorkspace}>
                {t('personal-dashboard.create_a_new_workspace')}
              </Button>
            </div>
          </PapperBlock>
        </Grid>
      </Grid>

      <Grid container spacing={3} className={classes.root}>
        <Grid item md={6} xs={12}>
          <CounterIconsWidget elementCounts={elementCounts} history={history} />
          <Divider className={classes.divider} />
          <NewsListWidget handleOpenGuide={handleOpenGuide} />
          <Divider className={classes.divider} />
          <PapperBlock title={t('personal-dashboard.send_us_a_request')} icon="ion-ios-redo-outline" whiteBg noMargin desc={t('personal-dashboard.we_love_ideas')}>
            <div className={classes.subscribeForm}>
              <FormControl>
                <TextField
                  label={t('personal-dashboard.write_your_wish_here')}
                  margin="normal"
                  onChange={handleFeatureChange}
                  value={featureValue}
                  multiline
                />
              </FormControl>
              <Fab size="medium" color="primary" type="submit" onClick={handleSubmitFeature}>
                <Send style={{ color: 'white' }} />
              </Fab>
            </div>
          </PapperBlock>


        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <TimelineWidget timeline={timeline} history={history} />
        </Grid>
      </Grid>
      <UpgradeModal
        open={showUpgrade}
        close={() => {
          setShowUpgrade(false);
        }}
      />
      {/* <Joyride
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
      /> */}
      <MobileDisclaimer
        open={showMobileDisclaimer}
        close={() => {
          setShowMobileDisclaimer(false);
        }}
      />
    </div>
  );
};

const openAction = (key: string, keyParent: string) => ({ type: 'OPEN_SUBMENU', key, keyParent });
const reducer = 'ui';

const mapStateToProps = (state: RootState) => ({
  ...state,
  open: state[reducer].get('subMenuOpen')
});

const mapDispatchToProps = (dispatch) => ({
  openSubMenu: bindActionCreators(openAction, dispatch)
});

const Dash = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalDashboard);

export default Dash;


// const handleJoyrideCallback = (data: CallBackProps) => {
//   const {
//     action, index, type, status
//   } = data;

//   if ([STATUS.FINISHED, STATUS.SKIPPED].some(x => x === status)) {
//     // Need to set our running state to false, so we can restart if we click start again.
//     dispatch(handleRunIntro(false));
//     dispatch(changeStepIndex(0));
//   } else if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].some(x => x === type)) {
//     const newStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

//     if (index === 2) {
//       openSubMenu('dataBuilder', undefined);
//       setTimeout(() => {
//         dispatch(changeStepIndex(newStepIndex));
//       }, 400);
//     } else if (index === 7) {
//       openSubMenu('dataBuilder', undefined);
//       setTimeout(() => {
//         dispatch(changeStepIndex(newStepIndex));
//       }, 400);
//     } else {
//       dispatch(changeStepIndex(newStepIndex));
//     }
//   }
// };

// const localeSteps = {
//   skip: <Button size="small" style={{ color: '#bbb' }}>{t('personal-dashboard.skip')}</Button>,
//   back: <div>{t('personal-dashboard.previous')}</div>,
//   next: <div>{t('personal-dashboard.next')}</div>,
// };

// const steps = [
//   {
//     content: <div style={{
//       justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'
//     }}
//     >
//       <h2>{t('personal-dashboard.welcome')}</h2>
//       <Lottie
//         animationData={raccoon}
//         style={{
//           width: '50%',
//         }}
//       />
//     </div>,
//     locale: localeSteps,
//     placement: 'center',
//     target: 'body',
//   },
//   {
//     target: '.for_intro_0',
//     content: <div style={{ textAlign: 'left' }}>{t('personal-dashboard.localsteps_frontpage')}</div>,
//     locale: localeSteps,
//   },
//   {
//     target: '.for_intro_1',
//     content: <div style={{ textAlign: 'left' }}>{t('personal-dashboard.localsteps_workspace')}</div>,
//     locale: localeSteps,
//   },
//   {
//     target: '.for_intro_2',
//     content: <div style={{ textAlign: 'left' }}>{t('personal-dashboard.localsteps_data_builder')}</div>,
//     locale: localeSteps,
//   },
//   // {
//   //   target: '.for_intro_Betingelser',
//   //   content: <div style={{ textAlign: 'left' }}>Betingelser er den måde, hvorpå du kan programmere Juristic. Tænk på det som logikken bag det juridiske indhold.</div>,
//   //   locale: localeSteps,
//   //   disableBeacon: true,
//   // },
//   // {
//   //   target: '.for_intro_Elementer',
//   //   content: <div style={{ textAlign: 'left' }}>Elementer er en anden grundsten. Det kan for eksempelvis være selskaber, personer eller andre interessenter i analysen!</div>,
//   //   locale: localeSteps,
//   //   disableBeacon: true,
//   // },
//   // {
//   //   target: '.for_intro_Kendetegn',
//   //   content: <div style={{ textAlign: 'left' }}>Ved at tilføje kendetegn, som fx land eller lignende, kan du gøre logikken i betingelserne eller dine tegninger mere detaljerede!</div>,
//   //   locale: localeSteps,
//   //   disableBeacon: true,
//   // },
//   // {
//   //   target: '.for_intro_Forbindelser',
//   //   content: <div style={{ textAlign: 'left' }}>Forbindelser er de streger, du tegner mellem elementerne, fx ejerskab mellem to selskaber!</div>,
//   //   locale: localeSteps,
//   //   disableBeacon: true,
//   // },
//   {
//     target: '.for_intro_3',
//     content: <div style={{ textAlign: 'left' }}>{t('personal-dashboard.localsteps_output')}</div>,
//     locale: localeSteps,
//   },
//   {
//     target: '.for_intro_4',
//     content: <div style={{ textAlign: 'left' }}>{t('personal-dashboard.localsteps_red_flags')}</div>,
//     locale: localeSteps,
//   },
//   // {
//   //   target: '.for_intro_5',
//   //   content: <div style={{ textAlign: 'left' }}>Alt indhold, fx arbejdsområder og byggeklodser, kan opdeles i grupper, så du kun ser det, der er vigtigt for dig.</div>,
//   //   locale: localeSteps,
//   // },
//   // {
//   //   target: '.for_intro_7',
//   //   content: <div style={{ textAlign: 'left' }}>Hvis du har brug for mere hjælp, kan du altid trykke her og se svar på ofte stillede spørgsmål. Alternativt kan du altid skrive på vores chat.</div>,
//   //   locale: localeSteps,
//   // },


//   {
//     target: '.personal_dashboard_workspace_button',
//     content: t('personal-dashboard.try_creating_a_new_workspace'),
//     locale: localeSteps,
//     disableBeacon: true,
//     disableOverlayClose: true,
//     hideCloseButton: true,
//     hideFooter: true,
//     spotlightClicks: true,
//   },
// ];
