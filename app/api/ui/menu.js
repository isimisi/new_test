module.exports = [
  {
    key: 'dashboard',
    name: 'Forside',
    icon: 'ios-analytics-outline',
    linkParent: '/app',
  },
  {
    key: 'workspace',
    name: 'Arbejdsområder',
    icon: 'ios-git-network',
    linkParent: '/app/workspaces',
  },
  {
    key: 'dataBuilder',
    name: 'Byggeklodser',
    icon: 'ios-build-outline',
    child: [
      {
        key: 'conditions',
        name: 'Byg jura',
        link: '/app/conditions',
        badge: 'Draw',
      },
      {
        key: 'nodes',
        name: 'Elementer',
        link: '/app/nodes',
        badge: 'Draw',
      },
      {
        key: 'attributes',
        name: 'Kendetegn',
        link: '/app/attributes',
        badge: 'Draw',
      },
      {
        key: 'relationships',
        name: 'Forbindelser',
        link: '/app/relationships',
        badge: 'Draw',
      },
    ]
  },
  {
    key: 'output',
    name: 'Rapportindhold',
    icon: 'ios-document-outline',
    linkParent: '/app/outputs',
    badge: 'Pro',
  },
  {
    key: 'redFlags',
    name: 'Red Flags',
    icon: 'ios-flag-outline',
    badge: 'Draw',
    linkParent: '/app/red flags',
  },
  {
    key: 'groups',
    name: 'Grupper',
    icon: 'ios-folder-outline',
    linkParent: '/app/groups',
  },
  {
    key: 'settings',
    name: 'Indstillinger',
    icon: 'ios-settings-outline',
    linkParent: '/app/settings',
    disabled: true
  },
  {
    key: 'help',
    name: 'Hjælp',
    icon: 'ios-help-circle-outline',
    linkParent: '/app/help-support',
    disabled: true
  }
];
