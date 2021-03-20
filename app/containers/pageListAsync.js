/* eslint-disable */

import React from 'react';
import Loading from 'dan-components/Loading';
import loadable from '../utils/loadable';
// Dashboard
export const PersonalDashboard = loadable(() =>
  import ('./Pages/Dashboard/PersonalDashboard'), {
    fallback: <Loading />,
  });
// Pages
export const Login = loadable(() =>
  import ('./Pages/Users/Login'), {
    fallback: <Loading />,
  });
  export const Register = loadable(() =>
  import ('./Pages/Users/Register'), {
    fallback: <Loading />,
  });
  export const ResetPassword = loadable(() =>
  import ('./Pages/Users/ResetPassword'), {
    fallback: <Loading />,
  });


export const ComingSoon = loadable(() =>
  import ('./Pages/ComingSoon'), {
    fallback: <Loading />,
  });

export const Pricing = loadable(() =>
  import ('./Pages/Pricing'), {
    fallback: <Loading />,
  });

export const Workspaces = loadable(() =>
  import ('./Pages/Workspaces'), {
    fallback: <Loading />,
  });

  export const Workspace = loadable(() =>
  import ('./Pages/Workspaces/Workspace'), {
    fallback: <Loading />,
  });


export const TaskBoard = loadable(() =>
  import ('./pages/TaskBoard'), {
    fallback: <Loading />,
  });
export const Invoice = loadable(() =>
  import ('./Pages/Invoice'), {
    fallback: <Loading />,
  });


// Other
export const NotFound = loadable(() =>
  import ('./Pages/NotFound/NotFound'), {
    fallback: <Loading />,
  });
export const Error = loadable(() =>
  import ('./Pages/Error'), {
    fallback: <Loading />,
  });
export const Parent = loadable(() =>
  import ('./Parent'), {
    fallback: <Loading />,
  });
export const Settings = loadable(() =>
  import ('./Pages/Settings'), {
    fallback: <Loading />,
  });
export const HelpSupport = loadable(() =>
  import ('./Pages/HelpSupport'), {
    fallback: <Loading />,
  });