import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import styles from 'dan-components/Widget/widget-jss';
import { PapperBlock, CounterWidget } from 'dan-components';
import { Field, reduxForm } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  TextFieldRedux,
} from 'dan-components/Forms/ReduxFormMUI';
import { initAction, clearAction } from 'dan-redux/actions/reduxFormActions';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark';
import Edit from '@material-ui/icons/Edit';
import colorfull from 'dan-api/palette/colorfull';
import TitleBox from '../../../components/TitleBox';


function Conditions(props) {
  const {
    classes,
  } = props;
  const title = brand.name + ' - Dashboard';
  const description = brand.desc;
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
      <div className={classes.rootCounterFull}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <TitleBox
              color={colorfull[0]}
              start={0}
              end={67}
              duration={3}
              title="Total Posts"
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <CounterWidget
              color={colorfull[2]}
              start={0}
              end={67}
              duration={3}
              title="Total Posts"
            >
              <Edit className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
          <Grid item xs={6} md={3}>
            <CounterWidget
              color={colorfull[3]}
              start={0}
              end={70}
              duration={3}
              title="Total Articles"
            >
              <CollectionsBookmark className={classes.counterIcon} />
            </CounterWidget>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
Conditions.propTypes = {
  classes: PropTypes.object.isRequired,
};

// const mapDispatchToProps = dispatch => ({
//   init: bindActionCreators(initAction, dispatch),
//   clear: () => dispatch(clearAction),
// });

// const ConditionMetaMapped = reduxForm({
//   form: 'immutableExample',
//   enableReinitialize: true,
// })(Conditions);


// const reducer = 'initval';
// const ConditionInit = connect(
//   state => ({
//     force: state,
//     initialValues: state.getIn([reducer, 'formValues'])
//   }),
//   mapDispatchToProps,
// )(ConditionMetaMapped);

export default withStyles(styles)(Conditions);
