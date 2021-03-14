import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Flow from '../../components/Flow';
import SideDrawer from '../../components/SideDrawer';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function Dashboard(): JSX.Element {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <SideDrawer windowDimensions={windowDimensions}>
        <Flow />
      </SideDrawer>
    </>
  );
}
