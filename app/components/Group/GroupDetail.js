import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import OndemandVideo from '@material-ui/icons/OndemandVideo';
import colorfull from '@api/palette/colorfull';
import CounterWidget from '../Counter/CounterWidget';
import '@styles/vendors/slick-carousel/slick-carousel.css';
import '@styles/vendors/slick-carousel/slick.css';
import '@styles/vendors/slick-carousel/slick-theme.css';
import styles from './group-jss';


const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
  return <Slide direction="up" ref={ref} {...props} />;
});

const categories = [
  'Output',
  'Alerts',
  'Relationships',
  'Conditions',
  'Nodes',
  'Workspaces'
];

function ProductDetail(props) { // eslint-disable-line
  const {
    classes,
    open,
    close,
    detailContent,
    productIndex,
    listView
  } = props;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={close}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap color="inherit" className={classes.flex}>
            {detailContent.getIn([productIndex, 'name'])}
          </Typography>
          <IconButton color="inherit" onClick={() => close()} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.detailContainer}>
        <Grid
          container
          alignItems="flex-start"
          justify="flex-start"
          direction="row"
          spacing={3}
        >
          {
            categories.map((category, index) => (
              <Grid item md={listView === 'list' ? 12 : 4} sm={listView === 'list' ? 12 : 6} xs={12} key={index.toString()}>
                <CounterWidget
                  color={colorfull[index]}
                  start={0}
                  end={index + 1 * 10}
                  duration={3}
                  title={category}
                />
              </Grid>
            ))
          }
        </Grid>
      </div>

    </Dialog>
  );
}

ProductDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  detailContent: PropTypes.object.isRequired,
  productIndex: PropTypes.number,
  listView: PropTypes.string.isRequired
};

ProductDetail.defaultProps = {
  productIndex: undefined
};

export default withStyles(styles)(ProductDetail);
