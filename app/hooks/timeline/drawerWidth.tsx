/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useCallback, useState } from "react";

const getDrawerWidth = width => {
  const [drawerWidth, setDrawerWidth] = useState(width ? width * 0.4 : 400);

  const handleMouseMove = useCallback(e => {
    const newWidth = document.body.offsetWidth - e.clientX;

    if (width) {
      if (newWidth > width * 0.4 && newWidth < width * 0.6) {
        setDrawerWidth(newWidth);
      }
    }
  }, []);

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseDown = e => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };

  return { handleMouseDown, drawerWidth };
};

export default getDrawerWidth;
