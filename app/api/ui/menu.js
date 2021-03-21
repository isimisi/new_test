module.exports = [
  {
    key: 'dashboard',
    name: 'Dashboard',
    icon: 'ios-analytics-outline',
    linkParent: '/app',
  },
  {
    key: 'dataBuilder',
    name: 'Data Builder',
    icon: 'ios-paper-outline',
    child: [
      {
        key: 'report',
        name: 'Reports',
        title: true,
      },
      {
        key: 'output',
        name: 'Ouput',
        link: '/app/output',
        icon: 'ios-document-outline',
      },
      {
        key: 'build',
        name: 'Builds',
        title: true,
      },
      {
        key: 'relationships',
        name: 'Relationships',
        link: '/app/relationships',
        icon: 'ios-list-box-outline',
      },
      {
        key: 'conditions',
        name: 'Conditions',
        link: '/app/conditions',
        icon: 'ios-grid-outline',
      },
      {
        key: 'groups',
        name: 'Groups',
        link: '/app/groups',
        icon: 'ios-grid-outline',
      },
      {
        key: 'nodes',
        name: 'Nodes',
        link: '/app/nodes',
        icon: 'ios-grid-outline',
      }
    ]
  },
  {
    key: 'workspace',
    name: 'Workspaces',
    icon: 'ios-paw-outline',
    linkParent: '/app/workspaces',
  },
  {
    key: 'taskBoard',
    name: 'Task Board',
    icon: 'md-time',
    linkParent: '/app/taskboard',
  },
  {
    key: 'settings',
    name: 'Settings',
    icon: 'ios-settings-outline',
    linkParent: '/app/settings',
  },
  {
    key: 'help',
    name: 'Help',
    icon: 'md-help',
    linkParent: '/app/help-support',
  }
];
