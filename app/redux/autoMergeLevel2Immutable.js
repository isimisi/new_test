import { isImmutable} from 'immutable';

export default function autoMergeLevel2Immutable(
  inboundState,
  originalState,
  reducedState,
  { debug }
) {
  const newState = { ...reducedState };
  // only rehydrate if inboundState exists and is an object
  if (inboundState && typeof inboundState === 'object') {
    Object.keys(inboundState).forEach(key => {
      // ignore _persist data
      if (key === '_persist') return;
      // if reducer modifies substate, skip auto rehydration
      if (originalState[key] !== reducedState[key]) {
        if (process.env.NODE_ENV !== 'production' && debug) {
          console.log(
            'redux-persist/stateReconciler: sub state for key `%s` modified, skipping.',
            key
          );
        }
        return;
      }
      
      if (typeof reducedState[key].toJS === 'function') {
        // if object is plain enough shallow merge the new values (hence "Level2")
        newState[key] = newState[key].merge(inboundState[key]);
        return;
      }
      // otherwise hard set
      newState[key] = inboundState[key];
    });
  }

  if (
    process.env.NODE_ENV !== 'production'
    && debug
    && inboundState
    && typeof inboundState === 'object'
  ) {
    console.log(
      `redux-persist/stateReconciler: rehydrated keys '${Object.keys(
        inboundState
      ).join(', ')}'`
    );
  }

  return newState;
}
