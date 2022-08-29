/**
 * Component Generator
 */

/* eslint strict: ["off"] */

"use strict";

const componentExists = require("../utils/componentExists");

module.exports = {
  description: "Add an unconnected component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "Button",
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? "A component or container with this name already exists"
            : true;
        }

        return "The name is required";
      },
    },
    {
      type: "confirm",
      name: "memo",
      default: false,
      message: "Do you want to wrap your component in React.memo?",
    },
    {
      type: "confirm",
      name: "redux",
      default: false,
      message: "Do you want to dispatch actions and select reducers from the component?",
    },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: "add",
        path: "../../app/components/{{properCase name}}/index.tsx",
        templateFile: "./component/index.js.hbs",
        abortOnFail: true,
      },
      {
        type: "add",
        path: "../../app/components/{{properCase name}}/{{properCase name}}-jss.tsx",
        templateFile: "./component/index.js.hbs",
        abortOnFail: true,
      },
    ];

    actions.push({
      type: "prettify",
      path: "/components/",
    });

    return actions;
  },
};
