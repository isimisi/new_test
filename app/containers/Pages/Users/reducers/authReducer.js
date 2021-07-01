import { fromJS } from 'immutable';
import { CLOSE_NOTIF } from '@redux/constants/notifConstants';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED, REGISTER_FAILED, REGISTER_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED
} from './authConstants';

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  token: '',
  errorMessage: '',
  isAuthenticated: false
};


const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case LOGIN_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('errorMessage', message);
      });
    case LOGIN_SUCCESS:
      return state.withMutations((mutableState) => {
        const user = fromJS(action.user);
        const accessToken = fromJS(action.access_token);

        mutableState.set('email', user.get('email'));
        mutableState.set('firstName', user.get('first_name'));
        mutableState.set('lastName', user.get('last_name'));
        mutableState.set('token', accessToken.get('token'));
        mutableState.set('isAuthenticated', true);
      });
    case REGISTER_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('errorMessage', message);
      });
    case REGISTER_SUCCESS:
      return state.withMutations((mutableState) => {
        const user = fromJS(action.user);
        const accessToken = fromJS(action.access_token);

        mutableState.set('email', user.get('email'));
        mutableState.set('firstName', user.get('first_name'));
        mutableState.set('lastName', user.get('last_name'));
        mutableState.set('token', accessToken.get('token'));
        mutableState.set('isAuthenticated', true);
      });
    case RESET_PASSWORD_SUCCESS:
      return state.withMutations((mutableState) => {
        const email = fromJS(action.email);
        mutableState.set('email', email);
      });
    case RESET_PASSWORD_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('errorMessage', message);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('errorMessage', '');
      });
    default:
      return state;
  }
}
