/* eslint-disable no-bitwise */
/* eslint-disable import/prefer-default-export */

// The background plugin
import background, { ModeEnum } from '@react-page/plugins-background';
// import '@react-page/plugins-background/lib/index.css';


// The divider plugin
import divider from '@react-page/plugins-divider';

// The image plugin
import { imagePlugin } from '@react-page/plugins-image';
// import '@react-page/plugins-image/lib/index.css';

// The spacer plugin
import spacer from '@react-page/plugins-spacer';
// import '@react-page/plugins-spacer/lib/index.css';

import { defaultSlate, customizedSlate } from './slate';

// Define which plugins we want to use.

export const cellPlugins = [
  defaultSlate,
  customizedSlate,
  spacer,
  divider,
  imagePlugin,


  background({
    enabledModes:
      ModeEnum.COLOR_MODE_FLAG
      | ModeEnum.IMAGE_MODE_FLAG
      | ModeEnum.GRADIENT_MODE_FLAG,
  }),
];
