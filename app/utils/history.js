

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

let prevPath = null;

// listen and notify Segment of client-side page updates
history.listen((location) => {
  if (location.pathname !== prevPath) {
    prevPath = location.pathname;
    analytics.page();
  }
});

export default history;
