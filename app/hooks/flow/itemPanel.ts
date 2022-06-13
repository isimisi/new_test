import { useState } from "react";

const useItemSidePanel = () => {
  const [cursor, setCursor] = useState("auto");
  const handleCursor = (_type) => setCursor(_type);
  const [mouseActive, setMouseActive] = useState(true);
  const [stickyActive, setStickyActive] = useState(false);
  const [nodeActive, setNodeActive] = useState(false);

  const toggleMouse = () => {
    setNodeActive(false);
    setStickyActive(false);
    handleCursor("auto");
    setMouseActive(true);
  };

  const toggleSticky = () => {
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
  };

  const toggleNode = () => {
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
  };

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
