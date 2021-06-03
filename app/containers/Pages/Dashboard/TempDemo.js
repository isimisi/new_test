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
import { loadFromLocalStorage } from '@api/localStorage/localStorage';
import dog from './dog.json';
import styles from './dashboard-jss';

const NoOrganization = ({ classes }) => {
  const history = useHistory();
  const {
    first_name: firstName
  } = loadFromLocalStorage();

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" style={{ textAlign: 'center', marginRight: '10%', marginLeft: '10%' }}>
        Hej
        {' '}
        {firstName}
        {' '}
        vi er så glade for, at du vil være vores demobruger!
      </Typography>
      <Typography
        variant="subtitle1"
        style={{
          textAlign: 'center', marginRight: '10%', marginLeft: '10%', marginTop: 10
        }}
      >
        Vi håber, du vil nyde produktet og kan se hvor det skal bære hen.
        Skulle du have nogle forslag eller tanker/idéer, så tøv endelige ikke med at skrive eller ringe til Christian.
        Du kan fange ham på +45 23 41 22 43 eller på mail på ch@juristic.io
      </Typography>
      <div className={classes.lottie}>
        <Lottie animationData={dog} />
      </div>
    </Paper>
  );
};

NoOrganization.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoOrganization);
