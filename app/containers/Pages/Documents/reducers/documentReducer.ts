import { DocumentState, IImmutableDocumentState } from "@customTypes/reducers/document";
import { fromJS, List } from "immutable";
import { DocumentActions } from "./documentConstants";

const initialState: DocumentState = {
  documents: List(),
};

const initialImmutableState: IImmutableDocumentState = fromJS(initialState);

export default function reducer(
  state = initialImmutableState,
  action: DocumentActions
): IImmutableDocumentState {
  switch (action.type) {
    default:
      return state;
  }
}
