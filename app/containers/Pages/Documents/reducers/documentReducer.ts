import {
   DocumentState,
   IImmutableDocumentState,
   Document,
} from '@customTypes/reducers/document';
import { SHOW_NOTIF, CLOSE_NOTIF } from '@redux/constants/notifConstants';
import { fromJS, List, Map } from 'immutable';
import {
   CHANGE_DOCUMENT,
   DELETE_DOCUMENT_FAILED,
   DELETE_DOCUMENT_SUCCESS,
   DocumentActions,
   GET_DOCUMENTS_FAILED,
   GET_DOCUMENTS_LOADING,
   GET_DOCUMENTS_SUCCESS,
   GET_GROUP_DROPDOWN_FAILED,
   GET_GROUP_DROPDOWN_SUCCESS,
   POST_DOCUMENT_FAILED,
   POST_DOCUMENT_LOADING,
   POST_DOCUMENT_SUCCESS,
   PUT_DOCUMENT_FAILED,
   PUT_DOCUMENT_LOADING,
   PUT_DOCUMENT_SUCCESS,
   SHOW_DOCUMENT_FAILED,
   SHOW_DOCUMENT_LOADING,
   SHOW_DOCUMENT_SUCCESS,
   GET_DOCUMENT_DROPDOWN_SUCCESS,
   GET_DOCUMENT_DROPDOWN_FAILED,
} from './documentConstants';

const initialLoadings = Map({
   main: false,
   post: false,
});

const initialDocument: Document = {
   id: null,
   title: null,
   description: null,
   link: null,
   file_type: null,
   organization_id: null,
   group_id: null,
   created_at: null,
   updated_at: null,
   group: null,
   tags: List(),
};

const initialState: DocumentState = {
   documents: List(),
   loadings: initialLoadings,
   message: '',
   documentOptions: List(),
   groupsDropDownOptions: List(),
   document: Map(initialDocument),
};

const initialImmutableState: IImmutableDocumentState = fromJS(initialState);

export default function reducer(
   state = initialImmutableState,
   action: DocumentActions
): IImmutableDocumentState {
   switch (action.type) {
      case GET_DOCUMENTS_SUCCESS:
         return state.withMutations((mutableState) => {
            const documents = fromJS(action.documents);
            mutableState.set('documents', documents);
            mutableState.setIn(['loadings', 'main'], false);
         });
      case POST_DOCUMENT_SUCCESS:
         return state.withMutations((mutableState) => {
            mutableState.setIn(['loadings', 'post'], false);
         });
      case PUT_DOCUMENT_SUCCESS:
         return state.withMutations((mutableState) => {
            const document = fromJS(action.document);

            mutableState.updateIn(['documents', action.index], () => document);
            mutableState.setIn(['loadings', 'post'], false);
         });
      case SHOW_DOCUMENT_SUCCESS:
         return state.withMutations((mutableState) => {
            const document = fromJS(action.document);
            mutableState.set('document', document);
            mutableState.setIn(['loadings', 'main'], false);
         });
      case DELETE_DOCUMENT_SUCCESS:
         return state.withMutations((mutableState) => {
            mutableState.update('documents', (list) =>
            // @ts-ignore
               list.remove(action.index)
            );
         });
      case GET_DOCUMENTS_LOADING:
      case POST_DOCUMENT_LOADING:
      case PUT_DOCUMENT_LOADING:
      case SHOW_DOCUMENT_LOADING:
         return state.withMutations((mutableState) => {
            const loadingType = action.loadingType;
            mutableState.setIn(['loadings', loadingType], true);
         });
      case GET_DOCUMENTS_FAILED:
      case POST_DOCUMENT_FAILED:
      case PUT_DOCUMENT_FAILED:
      case SHOW_DOCUMENT_FAILED:
      case GET_GROUP_DROPDOWN_FAILED:
      case DELETE_DOCUMENT_FAILED:
      case GET_DOCUMENT_DROPDOWN_FAILED:
         return state.withMutations((mutableState) => {
            const message = fromJS(action.message);
            mutableState.set('message', message);
            mutableState.set('loadings', initialLoadings);
         });
      case CHANGE_DOCUMENT:
         return state.withMutations((mutableState) => {
            if (action.attr === 'initial') {
               const tempDocument = { ...initialDocument };
               tempDocument.initial = true;
               mutableState.set('document', Map(initialDocument));
            } else {
               mutableState.setIn(['document', action.attr], action.val);
            }
         });
      case GET_GROUP_DROPDOWN_SUCCESS:
         return state.withMutations((mutableState) => {
            const groupsDropDownOptions = fromJS(action.groups);
            mutableState.set('groupsDropDownOptions', groupsDropDownOptions);
         });
      case GET_DOCUMENT_DROPDOWN_SUCCESS:
         return state.withMutations((mutableState) => {
            const documentOptions = fromJS(action.documents);
            mutableState.set('documentOptions', documentOptions);
         });

      case SHOW_NOTIF:
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
