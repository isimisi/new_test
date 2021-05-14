import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  node: {
    border: '1px solid',
    borderRadius: theme.rounded.small,
    display: 'flex',
    padding: 18,
    flexGrow: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  attributes: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  attributValue: {
    marginLeft: 10,
  },
});

const NodeDemo = (props) => {
  const {
    classes,
    title,
    description,
    attributes,
    size,
    backgroundColorSelector,
    borderColorSelector
  } = props;


  const backgroundColor = `rgba(${backgroundColorSelector.get('r')}, ${backgroundColorSelector.get('g')}, ${backgroundColorSelector.get('b')}, ${backgroundColorSelector.get('a')})`;
  const borderColor = `rgba(${borderColorSelector.get('r')}, ${borderColorSelector.get('g')}, ${borderColorSelector.get('b')}, ${borderColorSelector.get('a')})`;

  const getWidth = () => {
    switch (size) {
      case 'Small':
        return '70%';
      case 'Medium':
        return '90%';
      case 'Large':
        return '100%';
      default:
        return '90%';
    }
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        Your Node
      </Typography>
      <Tooltip title={description}>
        <div
          className={classes.node}
          style={{ backgroundColor, borderColor, width: getWidth() }}
        >
          <div>
            <Typography variant="h6" component="h3">
              {title}
            </Typography>
          </div>
          {attributes.map((attribute => (
            <div className={classes.attributes}>
              <div>
                <Typography variant="subtitle2">
                  {attribute.label}
                </Typography>
              </div>
              <div className={classes.attributValue}>
                <Typography variant="body2">
                  {attribute.value}
                </Typography>
              </div>
            </div>
          )))}
        </div>
      </Tooltip>
    </Paper>
  );
};

NodeDemo.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  attributes: PropTypes.any.isRequired,
  size: PropTypes.string.isRequired,
  backgroundColorSelector: PropTypes.any.isRequired,
  borderColorSelector: PropTypes.any.isRequired,
};


export default withStyles(styles)(NodeDemo);
