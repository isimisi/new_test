/* eslint-disable camelcase */
// import axios from 'axios';
import * as notification from '@redux/constants/notifConstants';
// import { baseUrl, authHeader, genericErrorMessage } from '@api/constants';
import * as types from './nodeConstants';


export const titleChange = title => ({
  type: types.TITLE_CHANGE,
  title,
});

export const descriptionChange = description => ({
  type: types.DESCRIPTION_CHANGE,
  description,
});

export const addAtrribut = attributs => ({
  type: types.ADD_ATTRIBUT,
  attributs
});

export const addType = value => ({
  type: types.ADD_TYPE,
  value
});

export const addGroup = group => ({
  type: types.ADD_GROUP,
  group
});

export const sizeChange = size => ({
  type: types.CHANGE_SIZE,
  size,
});

export const backgroundChange = color => ({
  type: types.CHANGE_BACKGROUND_COLOR,
  color,
});

export const borderChange = color => ({
  type: types.CHANGE_BORDER_COLOR,
  color,
});

export const closeNotifAction = {
  type: notification.CLOSE_NOTIF
};
