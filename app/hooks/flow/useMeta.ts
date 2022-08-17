import { User } from "@auth0/auth0-react";
import {
  layoutElements,
  workspacePowerpoint,
} from "@pages/Workspaces/reducers/workspaceActions";
import { AppDispatch } from "@redux/configureStore";
import { useCallback, useState } from "react";
import { handleExport } from "@helpers/export/handleExport";
import { getLayoutedElements } from "@pages/Workspaces/constants";
import { TCustomNode, TCustomEdge } from "@customTypes/reducers/workspace";

const useMeta = (
  dispatch: AppDispatch,
  nodeElements: TCustomNode[],
  edgeElements: TCustomEdge[],
  reactFlowContainer: React.RefObject<HTMLDivElement>,
  label: string,
  user?: User,
  id?: string
) => {
  const [snapToGrid, setSnapToGrid] = useState(false);

  const handleAutoLayout = useCallback(
    () => dispatch(layoutElements(getLayoutedElements(nodeElements, edgeElements))),
    [nodeElements, edgeElements]
  );

  const handleImage = useCallback(
    (type, _stopLoading) => handleExport(type, reactFlowContainer, label, _stopLoading),
    [label]
  );

  const handlePowerpoint = useCallback(
    (_stopLoading) => {
      id &&
        dispatch(
          workspacePowerpoint(
            user as User,
            id,
            label,
            [...nodeElements, ...edgeElements],
            _stopLoading
          )
        );
    },
    [id, user, label, nodeElements, edgeElements]
  );

  return { handleAutoLayout, handleImage, handlePowerpoint, snapToGrid, setSnapToGrid };
};

export default useMeta;
