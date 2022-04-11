import { PersonState, IImmutablePersonState } from "@customTypes/reducers/person";
import { fromJS, List } from "immutable";
import { PersonActions } from "./personConstants";

const initialState: PersonState = {
  persons: List(),
};

const initialImmutableState: IImmutablePersonState = fromJS(initialState);

export default function reducer(
  state = initialImmutableState,
  action: PersonActions
): IImmutablePersonState {
  switch (action.type) {
    default:
      return state;
  }
}
