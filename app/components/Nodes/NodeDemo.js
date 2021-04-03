import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  node: {
    border: '3px solid',
    borderRadius: theme.rounded.small,
    display: 'flex',
    padding: 10,
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
  const { classes } = props;
  const reducer = 'node';
  const title = useSelector(state => state.getIn([reducer, 'title']));
  const description = useSelector(state => state.getIn([reducer, 'description']));
  const attributes = useSelector(state => state.getIn([reducer, 'attributes']));
  const backgroundColorSelector = useSelector(state => state.getIn([reducer, 'backgroundColor']));
  const backgroundColor = `rgba(${backgroundColorSelector.get('r')}, ${backgroundColorSelector.get('g')}, ${backgroundColorSelector.get('b')}, ${backgroundColorSelector.get('a')})`;
  const borderColorSelector = useSelector(state => state.getIn([reducer, 'borderColor']));
  const borderColor = `rgba(${borderColorSelector.get('r')}, ${borderColorSelector.get('g')}, ${borderColorSelector.get('b')}, ${borderColorSelector.get('a')})`;
  const size = useSelector(state => state.getIn([reducer, 'size']));

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
            <Typography variant="h7" component="h3">
              {title}
            </Typography>
          </div>
          {attributes.map((attribute => (
            <div className={classes.attributes}>
              <div>
                <Typography variant="subtitle2">
                  {attribute.get('attributType')}
                </Typography>
              </div>
              <div className={classes.attributValue}>
                <Typography variant="body2">
                  {attribute.get('attributValue')}
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
};


export default withStyles(styles)(NodeDemo);
