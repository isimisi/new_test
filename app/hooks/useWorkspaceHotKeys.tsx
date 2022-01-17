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
  handleOpenCvr: () => void,
  setShowAlertLog: React.Dispatch<React.SetStateAction<boolean>>,
  history: any,
  id: string | undefined,
) {
  // indsæt element
  useHotkeys("cmd+i", () => {
    setDefineNodeOpen(true);
    setShowContextMenu(false);
  });

  // indsæt note
  useHotkeys("n", handlePostSticky, [handlePostSticky]);

  // open company data modal
  useHotkeys("ctrl+c", handleOpenCvr, [handleOpenCvr]);

  // open red flags
  useHotkeys("r", () => setShowAlertLog(true), [handleOpenCvr]);

  // go to analysis
  useHotkeys("a", () => history.push(`analysis/${id}`), [handleOpenCvr]);


  // show lines
  useHotkeys("alt+g", handleVisabilityChange, [handleVisabilityChange]);

  // snap
  useHotkeys("alt+k", () => {
    setSnapToGrid(prevVal => !prevVal);
  });

  // fit to view
  useHotkeys("alt+1", () => {
    rfInstance?.fitView();
  }, [rfInstance]);

  // zoom to 100
  useHotkeys("alt+0", () => {
    rfInstance?.zoomTo(1);
  }, [rfInstance]);

  // zoom out
  useHotkeys("alt+-", () => {
    rfInstance?.zoomOut();
  }, [rfInstance]);

  // zoom in
  useHotkeys("alt+*", (e) => {
    console.log(e.key);
    if (e.key === "±") {
      rfInstance?.zoomIn();
    }
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
