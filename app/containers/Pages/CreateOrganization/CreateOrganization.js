import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CreateOrganizationForm } from '@components';
import styles from './createOrganization-jss';

const CreateOrganization = (props) => {
  const { classes } = props;

  return (
    <div>
      <CreateOrganizationForm />
    </div>
  );
};

CreateOrganization.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateOrganization);
