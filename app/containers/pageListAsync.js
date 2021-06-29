/* eslint-disable */

import React from 'react';
import Loading from '@components/Loading';
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

export const ChoosePlan = loadable(() =>
  import ('./Pages/CreateOrganization/ChoosePlan'), {
    fallback: <Loading />,
  });

export const ChoosePlanFront = loadable(() =>
  import ('./Pages/CreateOrganization/ChoosePlanFront'), {
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

export const WorkspaceAnalysis = loadable(() =>
  import ('./Pages/Workspaces/WorkspaceAnalysis'), {
    fallback: <Loading />,
  });

export const Conditions = loadable(() =>
  import ('./Pages/Conditions'), {
    fallback: <Loading />,
  });

export const Condition = loadable(() =>
  import ('./Pages/Conditions/Condition'), {
    fallback: <Loading />,
  })

export const Outputs = loadable(() =>
  import ('./Pages/Outputs'), {
    fallback: <Loading />,
  })

export const Output = loadable(() =>
  import ('./Pages/Outputs/Output'), {
    fallback: <Loading />,
  })

export const Nodes = loadable(() =>
  import ('./Pages/Nodes'), {
    fallback: <Loading />,
  })

export const Node = loadable(() =>
  import ('./Pages/Nodes/Node'), {
    fallback: <Loading />,
  })
  
export const Invoice = loadable(() =>
  import ('./Pages/Invoice'), {
    fallback: <Loading />,
  });

export const Groups = loadable(() =>
  import ('./Pages/Groups'), {
    fallback: <Loading />,
  });

export const Alerts = loadable(() =>
  import ('./Pages/Alerts'), {
    fallback: <Loading />,
  });

export const Alert = loadable(() =>
  import ('./Pages/Alerts/Alert'), {
    fallback: <Loading />,
  });

export const Relationships = loadable(() =>
  import ('./Pages/Relationships'), {
    fallback: <Loading />,
  });

export const Relationship = loadable(() =>
  import ('./Pages/Relationships/Relationship'), {
    fallback: <Loading />,
  });

export const Attributes = loadable(() =>
  import ('./Pages/Attributes'), {
    fallback: <Loading />,
  });

export const CreateOrganization = loadable(() =>
  import ('./Pages/CreateOrganization/CreateOrganization'), {
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