/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable camelcase */
import React, {
  ChangeEvent, useEffect, useState
} from 'react';
import brand from '@api/dummy/brand';
import { countryDropDown, getCountryOptions } from '@helpers/countryOptions';
import Typography from '@material-ui/core/Typography';
import { Helmet } from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import Iframe from "react-iframe";

import type { RootState } from '@redux/configureStore';
import { useTheme } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  GuideSlider,

  PapperBlock,
  Notification
  // @ts-ignore
} from '@components';
import Paper from '@material-ui/core/Paper';

import Select from 'react-select';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import axios from 'axios';
import { baseUrl } from '@api/constants';

import Lottie from 'lottie-react';
import AsyncSelect from 'react-select/async';

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
import * as translation from 'react-i18next';
import CreatableSelect from 'react-select/creatable';
import ButtonBase from '@material-ui/core/ButtonBase';
import Checkbox from '@material-ui/core/Checkbox';

import { SelectOptions, WhereInApp } from '@customTypes/data';
import { hanldeOnChange, tagMapping } from '@components/Tags/constants';
import {

  getTags,
} from '@components/Tags/reducers/tagsActions';
import useStyles from './dashboard-jss';
import {
  closeNotifAction,
  getElementCounts,
  getTimeline,
  postFeatureRequest,
  getNotifications,
  noIntro,
  changeDashboardType
} from './reducers/dashboardActions';
import UpgradeModal from './UpgradeModal';
import MobileDisclaimer from './MobileDisclaimer';
import {
  postWorkspace, showNotifAction, getGroupDropDown
} from '../Workspaces/reducers/workspaceActions';
import { useAuth0 } from "@auth0/auth0-react";
import { getPlanId, UserMeta } from '@helpers/userInfo';
import { MixedTagOptions } from '@customTypes/reducers/tags';
import { postTimeline } from '../Timelines/reducers/timelineActions';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const corporateChart = require('@lotties/racoon/corporateChart.json');


const PersonalDashboard = () => {
  const classes = useStyles();
  const title = brand.name + ' - Personal Dashboard';
  const description = brand.desc;
  const dispatch = useAppDispatch();
  const history = useHistory();


  const messageNotif = useAppSelector(state => state.workspace.get('message'));


  // const runIntro = useAppSelector(state => state[reducer].get('runIntro'));
  const { t } = translation.useTranslation();
  const { user } = useAuth0();
  const plan_id = getPlanId(user);
  const meta: UserMeta = user && user["https://juristic.io/meta"];
  const { first_name, intro } = meta.dbUser;
  const theme = useTheme();


  // const introStepIndex = useAppSelector(state => state[reducer].get('introStepIndex'));
  const workspaces = useAppSelector(state => state.workspace.get('workspaces')).toJS();
  const groupsDropDownOptions = useAppSelector(state => state.workspace.get('groupsDropDownOptions')).toJS();
  const tagOptions = useAppSelector(state => state.tags.get('tags')).toJS();


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


  const [cvrSearch, setCvrSearch] = useState<SelectOptions | null>(null);

  const changeCvrSearch = (val: SelectOptions) => setCvrSearch(val);
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


  const createEmptyWorkspace = () => {
    if (plan_id === 1 && workspaces.length === 50) {
      dispatch(showNotifAction(t('personal-dashboard.can_not_create_more_workspaces')));
    } else {
      user && dispatch(postWorkspace(user, history, label, workspacDescription, group, JSON.stringify(tags), shareOrg));
    }
  };

  const createEmptyTimeline = () => {
    user && dispatch(postTimeline(user, history, label, workspacDescription, group, JSON.stringify(tags), shareOrg));
  };


  const confirm = () => {
    if (cvrSearch && user) {
      const cvr = cvrSearch.value.includes('DK') && cvrSearch.value.length < 12 ? cvrSearch.value.substring(2) : cvrSearch.value;
      const cvrLabel = cvrSearch.label as JSX.Element;
      const name = cvrLabel.props.children[1].props.children;
      dispatch(postWorkspace(user, history, name, undefined, 'Corporate', undefined, undefined, cvr));
    }
  };


  const getAsyncOptions = inputValue => axios
    .get(`${baseUrl}/workspaces/cvr/dropdown?q=${inputValue}&countries=${plan_id === 1 ? JSON.stringify(["DK"]) : countries.length > 0 ? JSON.stringify(countries.map(x => x.value)) : JSON.stringify(['DK', 'SE', 'NO', 'FI', 'GB'])}`)
    .then(res => getCountryOptions(res.data));

  const countryOptions = countryDropDown(plan_id);

  const dashboard = useAppSelector(state => state.dashboard.get("type"));


  const [rememberToNotSeeIntro, setRememberToNotSeeIntro] = useState(false);
  const toggleRememberToNotSee = () => setRememberToNotSeeIntro(prevVal => !prevVal);
  const [removedIntro, setRemovedIntro] = useState(false);

  const faqs = translation.getI18n().getResourceBundle("en", "").faq[!intro && !removedIntro ? "intro" : dashboard];

  const clickOnIntroChoice = (type) => {
    setRemovedIntro(true);
    if (rememberToNotSeeIntro) {
      user && dispatch(noIntro(user));
    } else {
      dispatch(changeDashboardType(type));
    }
  };


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
          {intro || removedIntro ? <div className={classes.racoonAndText}>
            <div style={{ maxWidth: 500 }}>

              <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: 10 }}>
                {t('personal-dashboard.intro_greeting', { name: first_name })}
              </Typography>
              <Typography style={{ fontSize: 14, }}>
                {dashboard === "structure" ? t("personal-dashboard.type_description_structure") : t("personal-dashboard.type_description_timeline")}
              </Typography>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}
            >
              <Lottie animationData={corporateChart} className={classes.lottie} loop />
            </div>
          </div> :
            (
              <Paper className={classes.introContainer} elevation={0}>

                <div>
                  <Typography variant="h4" component="h2" className={classes.title} style={{ color: "white", marginBottom: 20, fontSize: 22, marginLeft: 2 }}>
                    {t('personal-dashboard.welcome')}
                  </Typography>
                  <Typography component="p" className={classes.description} style={{ color: "white", marginBottom: 10, maxWidth: 400, marginLeft: 2 }}>
                    {t('personal-dashboard.welcome_body')}
                  </Typography>
                  <Typography component="p" className={classes.description} style={{ color: "white", marginBottom: 30, marginLeft: 2 }}>
                    {t('person-dashboard.tell_us')}
                  </Typography>
                  <div style={{ display: "flex" }}>
                    <Button color="primary" variant="contained" onClick={() => clickOnIntroChoice("structure")} style={{ marginRight: 7, backgroundColor: "white", color: "black" }}>
                      {t('personal-dashboard.structure_button')}
                    </Button>
                    <Button color="primary" variant="contained" onClick={() => clickOnIntroChoice("timeline")} style={{ marginRight: 7, backgroundColor: "white", color: "black" }}>
                      {t('personal-dashboard.timeline_button')}
                    </Button>
                    <Button color="primary" variant="contained" style={{ marginRight: 7 }}>
                      {t('generic.read_more')}
                    </Button>
                  </div>
                  <ButtonBase
                    className={classes.row}
                    style={{ marginTop: 10, right: 10 }}
                    onClick={toggleRememberToNotSee}
                  >
                    <Checkbox

                      name="Remember"
                      className={classes.introCheck}
                      checked={rememberToNotSeeIntro}
                    />
                    <Typography variant="subtitle2" style={{ color: "white", }}>
                      {t('generic.remember_my_choice')}
                    </Typography>
                  </ButtonBase>
                </div>

                <Paper className={classes.videoContainer}>
                  <Iframe
                    allowFullScreen
                    width="100%"
                    height="100%"
                    className={classes.iframe2}
                    url="https://www.loom.com/embed/780e94a98ec84903b30036e466db2974"
                  />

                </Paper>

              </Paper>

            )
          }
        </Grid>
        <Grid item md={!intro && !removedIntro ? 8 : 6} xs={12}>
          {intro || removedIntro ? dashboard === "structure" && <Paper className={classes.papperBlock} elevation={0}>
            <div className={classes.descBlock}>
              <div className={classes.titleText}>
                <Typography variant="h6" component="h2" className={classes.title}>
                  {t('workspaces.load_from_CVR')}
                </Typography>
                <Typography component="p" className={classes.description}>
                  {t('workspaces.search_for_a_company_or_CVR_number')}
                </Typography>
              </div>

            </div>
            <section className={classNames(classes.content, classes.whiteBg)}>
              <AsyncSelect
                styles={selectStyles()}
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
                  styles={selectStyles()}
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
          </Paper> : null}
          <Paper className={classes.papperBlock} elevation={0} style={{ position: "relative", paddingBottom: "59%" }}>
            <div className={classes.descBlock}>
              <div className={classes.titleText}>
                <Typography variant="h6" component="h2" className={classes.title}>
                  {t('personal-dashboard.how_it_works')}
                </Typography>

              </div>
              <Button color="primary" variant="contained" onClick={confirm}>
                {t('generic.see_video')}
              </Button>
            </div>
            <Iframe
              url="https://juristic.storylane.io/demo/hyupzxzra3ys?embed=true%22"
              width="100%"
              height="80%"
              className={classes.iframe}

              id={title}
              position="absolute"
            />
          </Paper>

        </Grid>
        <Grid item md={!intro && !removedIntro ? 4 : 6} xs={12}>
          {!intro && !removedIntro ? /** <PapperBlock title={t('personal-dashboard.how_to_start')} whiteBg /> */ null : <PapperBlock title={dashboard === "structure" ? t('personal-dashboard.start_empty') : t('personal-dashboard.start_empty_timeline')} whiteBg desc={dashboard === "structure" ? t('personal-dashboard.create_empty_workspace') : t('personal-dashboard.create_empty_timeline')}>
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
                noOptionsMessage={() => t("generic.no_options")}
                formatCreateLabel={(input) => t("generic.create_new", { input })}
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
              <Button color="primary" variant="contained" onClick={dashboard === "structure" ? createEmptyWorkspace : createEmptyTimeline}>
                {dashboard === "structure" ? t('personal-dashboard.create_a_new_workspace') : t('personal-dashboard.create_a_new_timeline')}
              </Button>
            </div>
          </PapperBlock>}
          <PapperBlock title={t('personal-dashboard.faq')} whiteBg noMargin>
            {Object.keys(faqs).map((key) => (
              <Accordion key={key} onClick={() => window.open(t(`faq.${!intro && !removedIntro ? "intro" : dashboard}.${key}.link`), '_blank')?.focus()}>
                <AccordionSummary
                  expandIcon={<ChevronRightIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.titleText}>{t(`faq.${!intro && !removedIntro ? "intro" : dashboard}.${key}.header`)}</Typography>
                </AccordionSummary>

              </Accordion>
            ))}
          </PapperBlock>
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
