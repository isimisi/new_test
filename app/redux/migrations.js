import { Map } from 'immutable';

export default {
  0: (state) => ({
    ...state,
    workspaces: {
      ...state.workspaces,
      revisionHistory: Map()
    }
  })
};
