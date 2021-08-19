import React, { useState, useCallback } from 'react';
import { PropTypes } from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from '@api/dummy/brand';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Notification } from '@components';
import { useDispatch, useSelector } from 'react-redux';
import styles from './helpSupport-jss';
import Qna from './Qna';
import ContactForm from './ContactForm';
import { helpMe, closeNotifAction } from '../Dashboard/reducers/dashboardActions';

function Settings(props) {
  const title = brand.name;
  const description = brand.desc;
  const { width } = props;
  const [valueForm, setValueForm] = useState([]);
  const dispatch = useDispatch();
  const messageNotif = useSelector(state => state.dashboard.get('message'));

  const showResult = useCallback((values) => {
    setValueForm(values);

    const name = values.get('name');
    const email = values.get('email');
    const message = values.get('message');

    dispatch(helpMe(name, email, message));
  }, [valueForm]);

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
      <Grid container spacing={2} direction={isWidthUp('md', width) ? 'row' : 'column-reverse'}>
        <Grid item md={6} xs={12}>
          <Qna />
        </Grid>
        <Grid item md={6} xs={12}>
          <ContactForm onSubmit={(values) => showResult(values)} />
        </Grid>
      </Grid>
    </div>
  );
}

Settings.propTypes = {
  width: PropTypes.string.isRequired,
};

export default withStyles(styles)(withWidth()(Settings));
