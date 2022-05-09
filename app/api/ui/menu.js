module.exports = [
  {
    key: "dashboard",
    name: "sidebar-menu.front_page",
    icon: "ios-analytics-outline",
    linkParent: "/app",
  },
  {
    key: "structure",
    name: "sidebar-menu.structure",
    icon: "ios-git-network",
    child: [
      {
        key: "whiteboard",
        name: "sidebar-menu.whiteboard",
        title: true,
      },
      {
        key: "workspace",
        name: "sidebar-menu.your_workspace",
        link: "/app/workspaces",
      },
      {
        key: "dataBuilder",
        name: "sidebar-menu.data_builder",
        title: true,
      },
      {
        key: "conditions",
        name: "sidebar-menu.child.conditions",
        link: "/app/conditions",
        badge: "Draw",
      },
      {
        key: "nodes",
        name: "sidebar-menu.child.nodes",
        link: "/app/nodes",
        badge: "Draw",
      },
      {
        key: "attributes",
        name: "sidebar-menu.child.attributes",
        link: "/app/attributes",
        badge: "Draw",
      },
      {
        key: "relationships",
        name: "sidebar-menu.child.relationships",
        link: "/app/relationships",
        badge: "Draw",
      },
      {
        key: "content",
        name: "sidebar-menu.content",
        title: true,
      },
      {
        key: "output",
        name: "sidebar-menu.output",
        link: "/app/outputs",
        badge: "Pro",
      },
      {
        key: "redFlags",
        name: "sidebar-menu.red_flags",
        badge: "Draw",
        link: "/app/red flags",
      },
    ],
  },
  {
    key: "timeline",
    name: "sidebar-menu.timeline",
    icon: "ios-clock-outline",

    child: [
      {
        key: "timelineInner",
        name: "sidebar-menu.timeline",
        title: true,
      },
      {
        key: "timelineWorkspace",
        name: "sidebar-menu.your_workspace",
        link: "/app/timelines",
      },
      {
        key: "dataBuilderTimeline",
        name: "sidebar-menu.data_builder",
        title: true,
      },
      {
        key: "persons",
        name: "sidebar-menu.persons",
        link: "/app/persons",
      },
      {
        key: "documents",
        name: "sidebar-menu.documents",
        link: "/app/documents",
      },
    ],
  },
  {
    key: "lookup",
    name: "sidebar-menu.lookup",
    icon: "ios-glasses-outline",
    linkParent: "/app/lookup",
  },
  {
    key: "groups",
    name: "sidebar-menu.groups",
    icon: "ios-folder-outline",
    linkParent: "/app/groups",
  },
  {
    key: "settings",
    name: "sidebar-menu.settings",
    icon: "ios-settings-outline",
    linkParent: "/app/settings",
    disabled: true,
  },
  {
    key: "help",
    name: "sidebar-menu.help",
    icon: "ios-help-circle-outline",
    linkParent: "/app/help-support",
  },
];
