import { fromJS, List, Map } from "immutable";
import { EditorState, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { CLOSE_NOTIF, SHOW_NOTIF } from "@redux/constants/notifConstants";
import { validURL } from "@api/constants";
import {
  GET_OUTPUTS_SUCCESS,
  GET_OUTPUTS_FAILED,
  POST_OUTPUT_SUCCESS,
  POST_OUTPUT_FAILED,
  SHOW_OUTPUT_SUCCESS,
  SHOW_OUTPUT_FAILED,
  PUT_OUTPUT_SUCCESS,
  PUT_OUTPUT_FAILED,
  DELETE_OUTPUT_SUCCESS,
  DELETE_OUTPUT_FAILED,
  ADD_OUTPUT,
  TITLE_CHANGE,
  DESCRIPTION_CHANGE,
  ADD_GROUP,
  FILE_TYPE_CHANGE,
  GET_GROUP_DROPDOWN_SUCCESS,
  GET_GROUP_DROPDOWN_FAILED,
  GET_CONDITION_DROPDOWN_SUCCESS,
  GET_CONDITION_DROPDOWN_FAILED,
  EDITOR_STATE_CHANGE,
  ADD_OUTPUT_URL,
  OUTPUT_ADD_CONDITION,
  OUTPUT_CHANGE_CONDITION,
  OUTPUT_DELETE_CONDITION,
  CHANGE_TAGS,
  OutputActions,
} from "./outputConstants";
import { IImmutableOutputState, OutputState } from "@customTypes/reducers/output";

const initialState: OutputState = {
  outputs: List(),
  outputFileUrl: "",
  outputFile: Map(),
  title: "",
  description: "",
  fileType: "",
  outputType: "",
  group: "",
  outputConditions: List(),
  message: "",
  editorState: EditorState.createEmpty(),
  conditionsDropDownOptions: List(),
  groupsDropDownOptions: List(),
  outputTags: List(),
};

const initialImmutableState: IImmutableOutputState = fromJS(initialState);
export default function reducer(
  state = initialImmutableState,
  action: OutputActions
): IImmutableOutputState {
  switch (action.type) {
    case GET_OUTPUTS_SUCCESS:
      return state.withMutations((mutableState) => {
        const outputs = fromJS(action.outputs);
        mutableState.set("outputs", outputs);
      });
    case GET_OUTPUTS_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case POST_OUTPUT_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set("title", "");
        mutableState.set("description", "");
        mutableState.set("group", "");
        mutableState.set("outputConditions", List());
        mutableState.set("fileType", "");
        mutableState.set("outputFileUrl", "");
      });
    case POST_OUTPUT_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case SHOW_OUTPUT_SUCCESS:
      return state.withMutations((mutableState) => {
        const label = fromJS(action.label);
        const description = fromJS(action.description);
        const output = fromJS(action.output);
        const conditions = fromJS(action.conditions);
        const tags = fromJS(action.tags);

        const group = fromJS(action.group);
        const fileType = fromJS(action.file_type);
        const outputType = fromJS(action.output_type);

        if (output) {
          if (validURL(output)) {
            mutableState.set("outputFileUrl", output);
          } else {
            const blocksFromHtml = htmlToDraft(output);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(
              contentBlocks,
              entityMap
            );
            const editorState = EditorState.createWithContent(contentState);
            mutableState.set("editorState", editorState);
          }
        }

        mutableState.set("title", label);
        mutableState.set("description", description);
        mutableState.set("fileType", fileType);
        mutableState.set("outputType", outputType);
        mutableState.set("outputConditions", conditions);
        mutableState.set("outputTags", tags);
        mutableState.set("group", group);
      });
    case SHOW_OUTPUT_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case PUT_OUTPUT_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case PUT_OUTPUT_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case DELETE_OUTPUT_SUCCESS:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case DELETE_OUTPUT_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case GET_CONDITION_DROPDOWN_SUCCESS:
      return state.withMutations((mutableState) => {
        const conditionsDropDownOptions = fromJS(action.conditions);
        mutableState.set("conditionsDropDownOptions", conditionsDropDownOptions);
      });
    case GET_CONDITION_DROPDOWN_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case GET_GROUP_DROPDOWN_SUCCESS:
      return state.withMutations((mutableState) => {
        const groupsDropDownOptions = fromJS(action.groups);
        mutableState.set("groupsDropDownOptions", groupsDropDownOptions);
      });
    case GET_GROUP_DROPDOWN_FAILED:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case TITLE_CHANGE:
      return state.withMutations((mutableState) => {
        const title = fromJS(action.title);
        mutableState.set("title", title);
      });
    case DESCRIPTION_CHANGE:
      return state.withMutations((mutableState) => {
        const description = fromJS(action.description);
        mutableState.set("description", description);
      });
    case ADD_OUTPUT:
      return state.withMutations((mutableState) => {
        const file = fromJS(action.file);
        mutableState.set("outputFile", file);
      });
    case ADD_OUTPUT_URL:
      return state.withMutations((mutableState) => {
        const url = fromJS(action.url);
        mutableState.set("outputFileUrl", url);
      });
    case ADD_GROUP:
      return state.withMutations((mutableState) => {
        const group = fromJS(action.group);
        mutableState.set("group", group);
      });
    case FILE_TYPE_CHANGE:
      return state.withMutations((mutableState) => {
        const fileType = fromJS(action.fileType);
        mutableState.set("fileType", fileType);
      });
    case EDITOR_STATE_CHANGE:
      return state.withMutations((mutableState) => {
        const editor = fromJS(action.editor);
        mutableState.set("editorState", editor);
      });
    case OUTPUT_ADD_CONDITION:
      return state.withMutations((mutableState) => {
        const condition = fromJS(action.condition);
        mutableState.update("outputConditions", (list) => list.push(condition));
      });
    case OUTPUT_CHANGE_CONDITION:
      return state.withMutations((mutableState) => {
        const conditions = mutableState.get("outputConditions").toJS();

        let condition = conditions.find((cond) => !cond.label);

        if (action.index || action.index === 0) {
          const index = conditions.findIndex((c, i) => i === action.index);
          condition = conditions[index];
        }

        condition.label = action.condition.value;
        condition.condition_id = action.condition.id;

        mutableState.set("outputConditions", fromJS(conditions));
      });
    case OUTPUT_DELETE_CONDITION:
      return state.withMutations((mutableState) => {
        mutableState.update("outputConditions", (list) =>
          list.filter((l, i) => i !== action.index)
        );
      });
    case CHANGE_TAGS:
      return state.withMutations((mutableState) => {
        const tags = fromJS(action.tags);
        mutableState.set("outputTags", tags);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set("message", "");
      });
    case SHOW_NOTIF:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    default:
      return state;
  }
}
