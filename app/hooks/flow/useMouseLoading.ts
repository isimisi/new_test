import { useEffect } from "react";

const useMouseLoading = (handleCursor, mouseLoading) => {
  useEffect(() => {
    if (mouseLoading) {
      handleCursor("progress");
    } else {
      handleCursor("auto");
    }
  }, [handleCursor, mouseLoading]);
};

export default useMouseLoading;
