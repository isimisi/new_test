/* eslint-disable flowtype/no-types-missing-file-annotation */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable import/prefer-default-export */

// The background plugin
import background, { ModeEnum } from '@react-page/plugins-background';
// import css as well. currently, we caannot do this here in the demo project and have moved that to _app.tsx
// see https://github.com/vercel/next.js/issues/19717
// import '@react-page/plugins-background/lib/index.css';

// The divider plugin
import divider from '@react-page/plugins-divider';

// The html5-video plugin
import html5video from '@react-page/plugins-html5-video';
// import '@react-page/plugins-html5-video/lib/index.css';

// The image plugin
import { imagePlugin } from '@react-page/plugins-image';
// import '@react-page/plugins-image/lib/index.css';

// The spacer plugin
import spacer from '@react-page/plugins-spacer';
// import '@react-page/plugins-spacer/lib/index.css';

// The video plugin
import video from '@react-page/plugins-video';
// import '@react-page/plugins-video/lib/index.css';

import customContentPlugin from './customContentPlugin';
import customContentPluginWithListField from './customContentPluginWithListField';
import customLayoutPlugin from './customLayoutPlugin';
import customLayoutPluginWithInitialState from './customLayoutPluginWithInitialState';
import { defaultSlate, customizedSlate } from './slate';
import contactForm from './contactForm';
import customLayoutPluginWithCellSpacing from './customLayoutPluginWithCellSpacing';

const fakeImageUploadService = (defaultUrl) => (file, reportProgress) => new Promise((resolve, reject) => {
  let counter = 0;
  const interval = setInterval(() => {
    counter++;
    reportProgress(counter * 10);
    if (counter > 9) {
      clearInterval(interval);
      alert(
        'Image has not actually been uploaded to a server. Check documentation for information on how to provide your own upload function.'
      );
      resolve({ url: URL.createObjectURL(file) });
    }
  }, 100);
});

// Define which plugins we want to use.

export const cellPlugins = [
  defaultSlate,
  customizedSlate,
  spacer,
  imagePlugin({ imageUpload: fakeImageUploadService('/images/react.png') }),
  video,
  divider,
  html5video,
  customContentPlugin,
  customContentPluginWithListField,
  contactForm,
  customLayoutPluginWithCellSpacing,

  background({
    imageUpload: fakeImageUploadService('/images/sea-bg.jpg'),
    enabledModes:
      ModeEnum.COLOR_MODE_FLAG
      | ModeEnum.IMAGE_MODE_FLAG
      | ModeEnum.GRADIENT_MODE_FLAG,
  }),
  customLayoutPlugin,
  customLayoutPluginWithInitialState,
];
