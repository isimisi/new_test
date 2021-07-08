import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const styles = () => ({
  root: {
    flexGrow: 1,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  relationshipContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  relationship: {
    height: 118,
    width: 3,
    backgroundColor: 'black'
  },
});

const RelationshipDemo = (props) => {
  const {
    classes,
    label,
    description,
    colorSelector,
    size
  } = props;
  const color = `rgba(${colorSelector.get('r')}, ${colorSelector.get('g')}, ${colorSelector.get('b')}, ${colorSelector.get('a')})`;

  const getLabelSize = () => {
    switch (size) {
      case 'Small':
        return 'body1';
      case 'Medium':
        return 'h6';
      case 'Large':
        return 'h4';
      default:
        return 'body1';
    }
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        Din forbindelse
      </Typography>
      <Tooltip title={description}>
        <div className={classes.relationshipContainer}>
          <div className={classes.relationship} style={{ backgroundColor: color }} />
          <div style={{ width: '60%' }}>
            <Typography variant={getLabelSize()} style={{ textAlign: 'center' }}>
              {label}
            </Typography>
          </div>
          <div className={classes.relationship} style={{ backgroundColor: color }} />
        </div>
      </Tooltip>
    </Paper>
  );
};

RelationshipDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  colorSelector: PropTypes.any.isRequired,
  size: PropTypes.number.isRequired,
};


export default withStyles(styles)(RelationshipDemo);
