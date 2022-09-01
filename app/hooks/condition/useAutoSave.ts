import { useCallback } from "react";
import { ReactFlowInstance } from "react-flow-renderer";
import { User } from "@auth0/auth0-react";
import { AppDispatch } from "@redux/configureStore";
import { saveCondition } from "@pages/Conditions/reducers/conditionActions";
import { History } from "history";

export default function useAutoSave(
  rfInstance: ReactFlowInstance<any, any> | null,
  user: User,
  id: string,
  dispatch: AppDispatch,
  history: History,
  label: string
) {
  const onConditionSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const _nodes = flow.nodes;
      const mappedNodes = _nodes.map((n) => ({
        id: n.id,
        x: n.position.x,
        y: n.position.y,
      }));
      dispatch(
        saveCondition(
          user,
          id,
          flow.viewport.zoom,
          flow.viewport.x,
          flow.viewport.y,
          JSON.stringify(mappedNodes),
          history,
          label
        )
      );
    }
  }, [rfInstance, user]);

  window.onbeforeunload = () => {
    onConditionSave();
  };

  return { onConditionSave };
}
