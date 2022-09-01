import { useState, useCallback } from "react";

const useItemSidePanel = () => {
  const [cursor, setCursor] = useState("auto");
  const handleCursor = (_type) => setCursor(_type);
  const [mouseActive, setMouseActive] = useState(true);
  const [stickyActive, setStickyActive] = useState(false);
  const [nodeActive, setNodeActive] = useState(false);

  const toggleMouse = useCallback(() => {
    setNodeActive(false);
    setStickyActive(false);
    handleCursor("auto");
    setMouseActive(true);
  }, []);

  const toggleSticky = useCallback(() => {
    setStickyActive((prevVal) => {
      if (!prevVal) {
        setMouseActive(false);
        setNodeActive(false);
        handleCursor("crosshair");
      }
      if (prevVal) {
        setMouseActive(true);
        handleCursor("auto");
      }
      return !prevVal;
    });
  }, []);

  const toggleNode = useCallback(() => {
    setNodeActive((prevVal) => {
      if (!prevVal) {
        setMouseActive(false);
        setStickyActive(false);
        handleCursor("crosshair");
      }
      if (prevVal) {
        setMouseActive(true);
        handleCursor("auto");
      }
      return !prevVal;
    });
  }, []);

  return {
    cursor,
    handleCursor,
    mouseActive,
    stickyActive,
    toggleMouse,
    toggleSticky,
    nodeActive,
    toggleNode,
  };
};

export default useItemSidePanel;
