/* eslint-disable camelcase */
// import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
// import { baseUrl, authHeader, genericErrorMessage } from '@api/constants';
import * as types from './relationshipConstants';


export const labelChange = label => ({
  type: types.LABEL_CHANGE,
  label,
});

export const descriptionChange = description => ({
  type: types.DESCRIPTION_CHANGE,
  description,
});

export const addAtrribut = attributs => ({
  type: types.ADD_ATTRIBUT,
  attributs
});


export const addGroup = group => ({
  type: types.ADD_GROUP,
  group
});

export const sizeChange = size => ({
  type: types.CHANGE_SIZE,
  size,
});

export const colorChange = color => ({
  type: types.CHANGE_COLOR,
  color,
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
