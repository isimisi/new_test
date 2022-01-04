import { useEffect, useCallback, useState } from 'react';

const useContextMenu = () => {
  const [show, setShow] = useState(false);

  const handleContextMenu = useCallback(
    event => {
      event.preventDefault();
      setShow(true);
    },
    [setShow]
  );

  const handleClick = useCallback(() => {
    if (show) {
      setShow(false);
    }
  }, [show]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  });
  return { show, setShow };
};

export default useContextMenu;
