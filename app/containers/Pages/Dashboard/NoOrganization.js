import React from 'react';
import Lottie from 'lottie-react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {
  useHistory
} from 'react-router-dom';
import noOrganization from './noOrganization.json';
import styles from './dashboard-jss';

const NoOrganization = ({ classes }) => {
  const history = useHistory();

  return (
    <Paper className={classes.root}>
      <Typography variant="h3" style={{ textAlign: 'center', marginRight: '10%', marginLeft: '10%' }}>
            You need to be in an organization in order to maximize your productivit.
      </Typography>
      <div className={classes.lottie}>
        <Lottie animationData={noOrganization} />
      </div>
      <div className={classes.inlineWrap}>
        <div className={classes.alignCenter}>
          <Typography variant="h4" style={{ textAlign: 'center', marginBottom: 20 }}>
            If your organization is yet to use Juristic create one
          </Typography>
          <div>
            <Button size="large" variant="contained" color="primary" className={classes.button} onClick={() => history.push('/app/create/organization')}>
          create an organization
            </Button>
          </div>
        </div>
        <div className={classes.alignCenter}>
          <Typography variant="h4" style={{ textAlign: 'center', marginBottom: 20 }}>
            If your organization is already a part of Juristic
          </Typography>
          <div>
            <Button size="large" variant="contained" color="secondary" className={classes.button}>
          Ask your administrator
            </Button>
          </div>
        </div>
      </div>


    </Paper>
  );
};

NoOrganization.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoOrganization);
