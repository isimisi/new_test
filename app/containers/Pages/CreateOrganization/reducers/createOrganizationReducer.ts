import { fromJS } from 'immutable';
import { CLOSE_NOTIF } from '@redux/constants/notifConstants';
import {
  STORE_ORGANIZATION_FAILED,
  DEMO_SUCCESS,
  DEMO_FAILED,
} from './createOrganizationConstants';

const initialState = {
  message: ''
};


const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action: any): any {
  switch (action.type) {
    case STORE_ORGANIZATION_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case DEMO_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case DEMO_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set('message', message);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('message', '');
      });
    default:
      return state;
  }
}
