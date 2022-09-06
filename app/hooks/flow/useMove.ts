import { useCallback, useState } from "react";
import { OnMove } from "react-flow-renderer";

const useMove = () => {
  const [currentZoom, setCurrentZoom] = useState(1);

  const onMove: OnMove = useCallback((e, viewport) => {
    if (viewport) {
      setCurrentZoom(viewport.zoom);
    }
  }, []);

  return { currentZoom, onMove };
};

export default useMove;
