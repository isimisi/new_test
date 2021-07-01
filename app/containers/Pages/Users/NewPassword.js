import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { NewPasswordForm, Notification } from '@components';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {
  useHistory,
} from 'react-router-dom';
import brand from '@api/dummy/brand';
import logo from '@images/logo.svg';
import styles from '@components/Forms/user-jss';
import { closeNotifAction, newPassword } from './reducers/authActions';


function NewPassword(props) {
  const { classes, deco } = props;
  const [valueForm, setValueForm] = useState(null);
  const history = useHistory();
  const id = history.location.pathname.split('/').pop();
  const dispatch = useDispatch();
  const messageNotif = useSelector(state => state.getIn(['auth', 'errorMessage']));

  const submitForm = useCallback((values) => {
    setValueForm(values);
    const password = values.get('password');
    dispatch(newPassword(id, password, history));
  }, [valueForm]);


  const title = brand.name + ' - Coming Soon';
  const description = brand.desc;
  return (
    <div className={classes.rootFull}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <div className={classes.container}>
        <div className={classes.fullFormWrap}>
          <Paper
            className={
              classNames(
                classes.fullWrap,
                deco && classes.petal,
                classes.centerV
              )
            }
          >
            <div className={classes.brandCenter}>
              <div className={classes.brand}>
                <img src={logo} alt={brand.name} />
              </div>
            </div>
            <Typography variant="h2" className={classes.titleGradient} gutterBottom>
              Skriv dit nye kodeord
            </Typography>
            <section className={classes.pageFormWrap}>
              <NewPasswordForm onSubmit={(values) => submitForm(values)} />
            </section>
          </Paper>
        </div>
      </div>
    </div>
  );
}

NewPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  deco: PropTypes.bool.isRequired,
};

const reducerUi = 'ui';
const FormInit = connect(
  state => ({
    force: state,
    deco: state.getIn([reducerUi, 'decoration'])
  }),
)(NewPassword);

export default withStyles(styles)(FormInit);
