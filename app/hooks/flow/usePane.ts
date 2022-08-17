import { VoidFunc } from "@customTypes/generic";
import { useCallback, useMemo, MouseEvent } from "react";
import { ReactFlowInstance } from "react-flow-renderer10";

const usePane = (
  removeAllUpdatingRefference: VoidFunc,
  reactFlowContainer: React.RefObject<HTMLDivElement>,
  rfInstance: ReactFlowInstance | null,
  stickyActive: boolean,
  handlePostSticky: (
    e: MouseEvent<Element, globalThis.MouseEvent>,
    shortcut: boolean,
    x: number,
    y: number
  ) => void,
  nodeActive: boolean,
  closeNode: VoidFunc,
  handleNodeSave: (x: number, y: number, drag: boolean) => void,
  setShowContextMenu: (value: React.SetStateAction<boolean>) => void,
  signed: boolean,
  mouseActive: boolean
) => {
  const onPaneClick = useCallback(
    (event: MouseEvent<Element, globalThis.MouseEvent>) => {
      removeAllUpdatingRefference();

      if (reactFlowContainer && rfInstance) {
        // @ts-ignore
        const reactFlowBounds = reactFlowContainer.current.getBoundingClientRect();
        const position = rfInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        if (stickyActive) {
          handlePostSticky(event, false, position.x, position.y);
        }
        if (nodeActive) {
          closeNode();
          handleNodeSave(position.x, position.y, true);
        }
      }
    },
    [
      removeAllUpdatingRefference,
      rfInstance,
      stickyActive,
      nodeActive,
      handlePostSticky,
      closeNode,
      handleNodeSave,
    ]
  );

  const paneContextNodeClick = (
    event: React.MouseEvent<Element, globalThis.MouseEvent>
  ) => {
    if (reactFlowContainer && rfInstance) {
      // @ts-ignore
      const reactFlowBounds = reactFlowContainer.current.getBoundingClientRect();
      const position = rfInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      closeNode();
      handleNodeSave(position.x, position.y, true);
      setShowContextMenu(false);
    }
  };

  const interactive = useMemo(() => !signed && mouseActive, [signed, mouseActive]);

  return { onPaneClick, interactive, paneContextNodeClick };
};

export default usePane;
