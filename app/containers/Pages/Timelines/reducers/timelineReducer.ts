import { TimelineState, IImmutableTimelineState } from "@customTypes/reducers/timeline";
import { CLOSE_NOTIF, SHOW_NOTIF } from "@redux/constants/notifConstants";
import { fromJS, List } from "immutable";
import { SHOW_HANDLES_CHANGE, TimelineActions } from "./timelineConstants";

const initialState: TimelineState = {
  timelines: List(),
  elements: List(),
  message: "",
  handleVisability: true,
  initialLoading: false,
  label: "",
};

const initialImmutableState: IImmutableTimelineState = fromJS(initialState);

export default function reducer(
  state = initialImmutableState,
  action: TimelineActions
): IImmutableTimelineState {
  switch (action.type) {
    case SHOW_HANDLES_CHANGE:
      return state.withMutations((mutableState) => {
        const visability = fromJS(action.bool);
        mutableState.set("handleVisability", visability);
      });
    case SHOW_NOTIF:
      return state.withMutations((mutableState) => {
        const message = fromJS(action.message);
        mutableState.set("message", message);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set("message", "");
      });
    default:
      return state;
  }
}
