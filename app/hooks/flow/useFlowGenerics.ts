import {
  getAttributeDropDown,
  getGroupDropDown,
  getNodes,
  getRelationships,
} from "@pages/Workspaces/reducers/workspaceActions";
import { AppDispatch } from "@redux/configureStore";
import { useCallback, useEffect, useState } from "react";
import { Dimensions } from "react-flow-renderer10";
import { openMenuAction, closeMenuAction, toggleAction } from "@redux/actions/uiActions";
import { User } from "@auth0/auth0-react";

const useFlowGenerics = (
  reactFlowContainer: React.RefObject<HTMLDivElement>,
  dispatch: AppDispatch,
  user: User,
  group: string
) => {
  const [reactFlowDimensions, setReactFlowDimensions] = useState<Dimensions | null>(null);

  useEffect(() => {
    if (reactFlowContainer) {
      setReactFlowDimensions({
        height: (reactFlowContainer.current as HTMLDivElement).clientHeight,
        width: (reactFlowContainer.current as HTMLDivElement).clientWidth,
      });
    }
  }, []);

  useEffect(() => {
    dispatch(getGroupDropDown(user));
    dispatch(closeMenuAction);

    return () => {
      dispatch(openMenuAction);
    };
  }, [user]);

  const toggleSubMenu = useCallback(() => dispatch(toggleAction), []);

  useEffect(() => {
    if (group) {
      dispatch(getRelationships(user, group));
      dispatch(getNodes(user, group));
      dispatch(getAttributeDropDown(user, group));
    }
  }, [user, group]);

  return { reactFlowDimensions, toggleSubMenu };
};

export default useFlowGenerics;
