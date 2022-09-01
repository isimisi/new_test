import { saveWorkspace } from "@pages/Workspaces/reducers/workspaceActions";
import { useCallback } from "react";
import { ReactFlowInstance } from "react-flow-renderer";
import { User } from "@auth0/auth0-react";
import { AppDispatch } from "@redux/configureStore";

export default function useAutoSave(
  rfInstance: ReactFlowInstance<any, any> | null,
  user: User,
  id: string,
  dispatch: AppDispatch
) {
  const onWorkspaceSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      const _nodes = flow.nodes;

      const mappedNodes = _nodes.map((n) => ({
        id: n.id,
        x: n.position.x,
        y: n.position.y,
      }));
      user &&
        id &&
        dispatch(
          saveWorkspace(
            user,
            id,
            flow.viewport.zoom,
            flow.viewport.x,
            flow.viewport.y,
            JSON.stringify(mappedNodes)
          )
        );
    }
  }, [rfInstance, user]);

  window.onbeforeunload = () => {
    onWorkspaceSave();
  };

  const onMouseLeave = useCallback(() => {
    onWorkspaceSave();
  }, [onWorkspaceSave]);

  return { onWorkspaceSave, onMouseLeave };
}
