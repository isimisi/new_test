module.exports = [
  {
    key: 'dashboard',
    name: 'Forside',
    icon: 'ios-analytics-outline',
    linkParent: '/app',
  },
  {
    key: 'dataBuilder',
    name: 'Indhold',
    icon: 'ios-paper-outline',
    child: [
      {
        key: 'report',
        name: 'Rapportering',
        title: true,
      },
      {
        key: 'output',
        name: 'Rapportindhold',
        link: '/app/outputs',
        icon: 'ios-document-outline',
      },
      {
        key: 'redFlags',
        name: 'Red Flags',
        link: '/app/red flags',
        icon: 'ios-document-outline',
      },
      {
        key: 'build',
        name: 'Byggeklodser',
        title: true,
      },
      {
        key: 'conditions',
        name: 'Byg jura',
        link: '/app/conditions',
        icon: 'ios-grid-outline',
      },
      {
        key: 'groups',
        name: 'Grupper',
        link: '/app/groups',
        icon: 'ios-grid-outline',
      },
      {
        key: 'nodes',
        name: 'Elementer',
        link: '/app/nodes',
        icon: 'ios-grid-outline',
      },
      {
        key: 'attributes',
        name: 'Kendetegn',
        link: '/app/attributes',
        icon: 'ios-list-box-outline',
      },
      {
        key: 'relationships',
        name: 'Forbindelser',
        link: '/app/relationships',
        icon: 'ios-list-box-outline',
      },
    ]
  },
  {
    key: 'workspace',
    name: 'Arbejdsområder',
    icon: 'ios-paw-outline',
    linkParent: '/app/workspaces',
  },
  // {
  //   key: 'taskBoard',
  //   name: 'Task Board',
  //   icon: 'md-time',
  //   linkParent: '/app/taskboard',
  // },
  {
    key: 'settings',
    name: 'Indstillinger',
    icon: 'ios-settings-outline',
    linkParent: '/app/settings',
  },
  {
    key: 'help',
    name: 'Hjælp',
    icon: 'md-help',
    linkParent: '/app/help-support',
  }
];
