import { useCallback, useState } from "react";
import { OnInit, ReactFlowInstance } from "react-flow-renderer10";

const useInit = (initFunc?: (rf: ReactFlowInstance<any, any>) => void) => {
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  const onInit: OnInit = useCallback((_reactFlowInstance) => {
    setRfInstance(_reactFlowInstance);
    initFunc && initFunc(_reactFlowInstance);
    _reactFlowInstance.fitView();
  }, []);

  return { rfInstance, onInit };
};

export default useInit;
