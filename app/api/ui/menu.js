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
        link: '/',
        icon: 'ios-document-outline',
      },
      {
        key: 'build',
        name: 'Builds',
        title: true,
      },
      {
        key: 'attributs',
        name: 'Attributes',
        link: '/',
        icon: 'ios-home-outline',
      },
      {
        key: 'relationships',
        name: 'Relationships',
        link: '/',
        icon: 'ios-list-box-outline',
      },
      {
        key: 'conditions',
        name: 'Conditions',
        link: 'app/conditions',
        icon: 'ios-grid-outline',
      },
      {
        key: 'groups',
        name: 'Groups',
        link: '/',
        icon: 'ios-grid-outline',
      },
      {
        key: 'nodes',
        name: 'Nodes',
        link: '/',
        icon: 'ios-grid-outline',
      }
    ]
  },
  {
    key: 'workspace',
    name: 'Workspaces',
    icon: 'ios-paw-outline',
    linkParent: '/app',
  },
  {
    key: 'settings',
    name: 'Settings',
    icon: 'ios-settings-outline',
    linkParent: '/app',
  }
];