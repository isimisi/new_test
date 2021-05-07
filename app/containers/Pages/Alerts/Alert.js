import React, { useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Notification } from '@components';
import { useSelector, useDispatch, } from 'react-redux';
import {
  useHistory
} from 'react-router-dom';
import {
  closeNotifAction
} from './reducers/alertActions';
import { reducer } from './constants';

const Alert = () => {
  const dispatch = useDispatch();
  const messageNotif = useSelector(state => state.getIn([reducer, 'message']));
  const history = useHistory();
  const theme = useTheme();
  const id = history.location.pathname.split('/').pop();

  const onSave = () => {
    // const nodeStyle = generateNodeStyle(size, backgroundColor.toJS(), borderColor.toJS(), theme);
    // dispatch(putNode(id, title, description, JSON.stringify(attributes), type, group, nodeStyle, history));
  };

  return (
    <div>
      <Notification close={() => dispatch(closeNotifAction)} message={messageNotif} />
      <Grid container spacing={1}>
        <Grid item md={6}>
          {/* <NodeForm
            title={title}
            description={description}
            attributes={attributes}
            type={type}
            group={group}
            attributesDropDownOptions={attributesDropDownOptions}
            groupsDropDownOptions={groupsDropDownOptions}
          /> */}
        </Grid>
        <Grid item md={6}>
          {/* <NodeDemo
            title={title}
            description={description}
            attributes={attributes}
            size={size}
            backgroundColorSelector={backgroundColor}
            borderColorSelector={borderColor}
          /> */}
        </Grid>
      </Grid>
      <Tooltip title="Save">
        <Fab
          variant="extended"
          color="primary"
          style={{
            position: 'fixed',
            bottom: 30,
            right: 50,
            zIndex: 100,
          }}
          onClick={onSave}
        >
            Save Red Flag
        </Fab>
      </Tooltip>
    </div>
  );
};

export default Alert;
