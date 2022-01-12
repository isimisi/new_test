import { OnLoadParams, Node } from "react-flow-renderer";
import { useHotkeys } from "react-hotkeys-hook";

export default function useWorkspaceHotKeys(
  setDefineNodeOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>,
  handlePostSticky: () => void,
  handleVisabilityChange: () => void,
  setSnapToGrid: React.Dispatch<React.SetStateAction<boolean>>,
  rfInstance: OnLoadParams<any> | null,
  contextNode: Node<any> | null,
  handleShowNodeRelations: (node: Node) => void,
  getCompanyData: (id: string) => void,
  getAddressData: (id: string) => void,
) {
  // indsæt element
  useHotkeys("cmd+i", () => {
    setDefineNodeOpen(true);
    setShowContextMenu(false);
  });

  // indsæt note
  useHotkeys("alt+n", handlePostSticky, [handlePostSticky]);

  // show lines
  useHotkeys("alt+g", handleVisabilityChange, [handleVisabilityChange]);

  // snap
  useHotkeys("alt+k", () => {
    setSnapToGrid(prevVal => !prevVal);
  });

  // fit to view
  useHotkeys("cmd+1", () => {
    console.log(rfInstance);
    rfInstance?.fitView();
  }, [rfInstance]);


  useHotkeys("alt+r", () => {
    contextNode && handleShowNodeRelations(contextNode);
  }, [contextNode, handleShowNodeRelations]);

  useHotkeys("alt+e", () => {
    contextNode && getAddressData(contextNode.id);
  }, [contextNode]);

  useHotkeys("alt+s", () => {
    contextNode && getCompanyData(contextNode.id);
  }, [contextNode]);


  // node specific
}
