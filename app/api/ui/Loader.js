import React from 'react';
import Lottie from 'lottie-react';
import loader from './loader.json';

const Loader = () => (
  <div style={{
    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
  }}
  >
    <Lottie
      animationData={loader}
      style={{
        width: '30%',
      }}
    />
  </div>
);

export default Loader;
