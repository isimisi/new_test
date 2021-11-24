module.exports = [
  {
    key: 'dashboard',
    name: ('sidebar-menu.front_page'),
    icon: 'ios-analytics-outline',
    linkParent: '/app',
  },
  {
    key: 'workspace',
    name: ('sidebar-menu.your_workspace'),
    icon: 'ios-git-network',
    linkParent: '/app/workspaces',
  },
  {
    key: 'dataBuilder',
    name: ('sidebar-menu.data_builder'),
    icon: 'ios-build-outline',
    child: [
      {
        key: 'conditions',
        name: ('sidebar-menu.child.conditions'),
        link: '/app/conditions',
        badge: 'Draw',
      },
      {
        key: 'nodes',
        name: ('sidebar-menu.child.nodes'),
        link: '/app/nodes',
        badge: 'Draw',
      },
      {
        key: 'attributes',
        name: ('sidebar-menu.child.attributes'),
        link: '/app/attributes',
        badge: 'Draw',
      },
      {
        key: 'relationships',
        name: ('sidebar-menu.child.relationships'),
        link: '/app/relationships',
        badge: 'Draw',
      },
    ]
  },
  {
    key: 'output',
    name: ('sidebar-menu.output'),
    icon: 'ios-document-outline',
    linkParent: '/app/outputs',
    badge: 'Pro',
  },
  {
    key: 'redFlags',
    name: ('sidebar-menu.red_flags'),
    icon: 'ios-flag-outline',
    badge: 'Draw',
    linkParent: '/app/red flags',
  },
  {
    key: 'groups',
    name: ('sidebar-menu.groups'),
    icon: 'ios-folder-outline',
    linkParent: '/app/groups',
  },
  {
    key: 'settings',
    name: ('sidebar-menu.settings'),
    icon: 'ios-settings-outline',
    linkParent: '/app/settings',
    disabled: true
  },
  {
    key: 'help',
    name: ('sidebar-menu.help'),
    icon: 'ios-help-circle-outline',
    linkParent: '/app/help-support',
  }
];
