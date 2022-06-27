# Introduction

# Files and Folder Structure

├── .vscode # vs code editor prefferences
├── app # main application source code
│ ├── api  
│ ├── app.tsx
│ ├── components # UI Components
│ ├── containers # application wrapper and root template
│ ├── index.html # main HTML
│ ├── redux # redux settings
│ ├── styles # style declaration witc scss and css
│ └── utils # utilization functions
│ └── hooks # React hooks
│ └── i18n.js # language provider
│ └── translations # translations files
│ └── types  
├── auth0 # auth0 files
├── internals # webpack and app configuration
│ ├── config.js
│ ├── generators
│ ├── mocks
│ ├── scripts
│ ├── testing
│ └── webpack
├── package-lock.json
├── package.json # npm package manager file
├── postcss.config.js # css config
├── public # all public assets directory
│ ├── favicons
│ └── images  
│ └── lotties  
├── server # backend configuration
│ ├── argv.js
│ ├── index.js
│ ├── logger.js
│ ├── middlewares
│ ├── port.js
│ ├── rawdocs.js
│ └── rawicons.js
└── yarn.lock
└── tsconfig

# Installation and Running App

Juristic is built on top of [Material UI](https://material-ui.com/)

- Connect to the internet
- Install NodeJs from [NodeJs Official Page](https://nodejs.org/en/)
- Open Terminal
- Go to your file project
- **Install Modules**  
  Install module dependencies by run this script in terminal

  ```js
  npm install
  ```

  It will download some necessary dependencies, it could take some minutes, just wait until finish.

- **Build Webpack DLL dependencies(If necessary)**  
  Install module dependencies by run this script in terminal. This process ussualy done by 'npm install', but if system require it just run this command:

  ```js
  npm run build:dll
  ```

- **Run App**  
  After build static library, then run the app.

  ```js
  npm start
  ```

  The process should be take about 1-2 minutes.  
  ![process](https://ilhammeidi.github.io/dandelion-docs/images/cmd1.png)  
  \_INFO:

  - Just run this script whenever you want start the project.
  - Run `npm install` again if you have new module dependencies,  
    \_

- Navigate to [http://localhost:3005](http://localhost:3005/)

# Troublehooting

#### Installation Problem

- _if got warning like this :_

  ```js
  npm WARN redux-immutablejs@0.0.8 requires a peer of immutable@^3.7.5 but none is installed. You must install peer dependencies yourself.
  npm WARN react-draft-wysiwyg@1.12.13 requires a peer of immutable@3.x.x || 4.x.x but none is installed. You must install peer dependencies yourself.
  npm WARN slick-carousel@1.8.1 requires a peer of jquery@>=1.8.0 but none is installed. You must install peer dependencies yourself.
  npm WARN draftjs-utils@0.9.4 requires a peer of immutable@3.x.x || 4.x.x but none is installed. You must install peer dependencies yourself.
  npm WARN html-to-draftjs@1.4.0 requires a peer of immutable@3.x.x || 4.x.x but none is installed. You must install peer dependencies yourself.

  ```

  **Don't worry the app will run as well**

  For warning some of dependencies need another dependencies too, maybe once you install them, there’s some changes from the 3rd party vendor so probably it will make a warning to another dependencies.

- **Stuck on installation related node-pre-gyp. How to fix it?**  
  Here’s a case error when installation being stuck on node-pre-gyp node-pre-gyp WARN Using request for node-pre-gyp https download Please stop the installation process by press CTRL+C Then run npm install again.
- **Error SCSS or node-sass when NPM start. How to fix it?**

  ```js
  ERROR in ./app/styles/layout/base.scss (./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/postcss-loader/src??ref--8-2!./node_modules/sass-loader/lib/loader.js??ref--8-3!./app/styles/layout/base.scss)
  Module build failed (from ./node_modules/sass-loader/lib/loader.js):
  ```

  - It mean the node-sass not installed succesfully. May because connection problem, changed node environment during installation, or blocked node-sass repository
  - Please install node-sass manually by npm install node-sass --save
  - Build dll libraries npm run build:dll
  - Try to start project again npm start

- **Error warning at the first time npm install Module not found: Error: and ERROR in dll reactBoilerplateDeps. What that’s mean?**  
  Don’t worry for the errors when npm install or npm build:dll it’s warning messages because the webpack dll cannot go through inside those dependencies directory, some dependencies work for backend side (such as fs and moment module ) so that will not built in dll libraries. You can continue to start the project by run npm start or npm run start:prod (if production) and should work properly. If the program cannot running properly, please try to remove all module in node_modules/. Then install again with npm install.
  _FYI: The webpack dll itself use for optimizing building script. Here’s article about webpack dll https://medium.com/@emilycoco/how-to-use-the-dll-plugin-to-speed-up-your-webpack-build-dbf330d3b13c._
- _if got an error with a dependencies installation_. Try to remove the problematic package in `package.json`. Then install again with `npm install`. After finish try to install the problematic package manually.
- if still got an error. Try to update the problematic package instead.

#### Development Problem

Every code changes, the app will updated directly without reloading the pages. when errors happen or warning will show in browser and console browser.

# Basic Code Structure

#### Main HTML

The HTML root in `/app/index.html`
You can put google analytics, font icon, embeded fonts, etc here.

#### Main JS

The JS root in `/app/app.js`. This is the entry file for the application, only setup and boilerplate code.

#### Directory Alias

You can find directory alias settings in `/internals/webpack/webpack.base.babel.js`

| Name             | Directory    | Samle Use             | UI Components                                                                                           |
| ---------------- | ------------ | --------------------- | ------------------------------------------------------------------------------------------------------- |
| Pages            | @pages       | app/containers/Pages  | import { titleChange, descriptionChange, addGroup } from "@pages/Conditions/reducers/conditionActions"; |
| UI components    | @components  | app/components        | import FileUpload from "@components/FileUpload/FileUpload";                                             |
| Redux            | @redux       | app/redux             | import \* as notification from "@redux/constants/notifConstants";                                       |
| Global styles    | @styles      | app/styles/components | import css from "@styles/Form.scss";                                                                    |
| Genric constants | @api         | app/api               | import { encryptId } from "@api/constants" ;                                                            |
| Helper functions | @helpers     | app/helpers           | import { AuthUser , getToken } from '@helpers/userInfo' ;                                               |
| Utilities        | @utils       | app/utils             | import history from "@utils/history";                                                                   |
| Types            | @customTypes | app/types             | import { SelectOptions } from "@customTypes/data";                                                      |
| Hooks            | @hooks       | app/hooks             | import { useAppDispatch } from '@hooks/redux' ;                                                         |
| Images           | @images      | public/images         | import logo from "@images/logo.svg" ;                                                                   |
| Lotties          | @lotties     | public/lotties        | import question from "@lotties/racoon/question.json";                                                   |

# Template Architecture

---

This is template architecture in diagram visualization. Click diagram or full screen button ![full screen](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVBAMAAABbObilAAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABXRSTlMA758vX1Pw3BoAAABJSURBVAjXY8AJQkODGBhUQ0MhbAUGBiYY24CBgRnGFmZgMISwgwwDGRhEhVVBbAVmEQYGRwMmBjIAQi/CTIRd6G5AuA3dzYQBAHj0EFdHkvV4AAAAAElFTkSuQmCC) to show in new tab with full screen

#### Components & Containers

This diagram bellow explain whole project structure.

![components](https://uploads-ssl.webflow.com/61655ed847fce20a68495af3/62b968b0d3bd766378567684_Untitled%20Diagram.drawio.png)

#### Routing

This diagram explain routing structure from api menu to page routing and every available layout(containers) to components.

![routing](<https://uploads-ssl.webflow.com/61655ed847fce20a68495af3/62b969f8b919e89346b56592_Untitled%20Diagram.drawio%20(1).png>)

#### Redux

Explain CRUD data structure from api gateway read by components then created and manipulated by reducers.

![redux](<https://uploads-ssl.webflow.com/61655ed847fce20a68495af3/62b96adccb92c48e53a34bca_Untitled%20Diagram.drawio%20(2).png>)

#### Design & Themes

The redux structure about manipulating state that related ui changes.

![design](<https://uploads-ssl.webflow.com/61655ed847fce20a68495af3/62b96b528031cc74e23ee232_Untitled%20Diagram.drawio%20(3).png>)

# Create New Page

- Go to `app/containers/`
- Create new folder ex: **MyPage**. _The name must in capitalize_
- Create new js file inside that folder **MyPage**, ex `SamplePage.js`. _The name must in capitalize_
- Inside the file create a simple page HTML ex:

  ```js
  // file: app/containers/MyPage/SamplePage.js

  import React from "react";
  import { Helmet } from "react-helmet";
  import { PapperBlock } from "@components";

  class SamplePage extends React.Component {
    render() {
      const title = "Sample title";
      const description = "samle description";
      return (
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
          </Helmet>
          <PapperBlock title="Blank Page" desc="Some text description">
            Content
          </PapperBlock>
        </div>
      );
    }
  }

  export default SamplePage;
  ```

- Import it asynchronously to the routing. Open file `app/containers/pageListAsync.js`

  ```js
  // app/containers/pageListAsync.js

  export const SamplePage = Loadable({
    loader: () => import("./MyPage/SamplePage"),
    loading: Loading,
  });
  ```

- Load it inside the template. In this example we'll use in dashboard template. Open file `app/containers/App/Application.js`

  ```js
  // file: app/containers/App/Application.js

  import { SamplePage } from "../pageListAsync";
  class Application extends React.Component {
    render() {
      const { changeMode } = this.props;
      return (
        <Dashboard history={this.props.history} changeMode={changeMode}>
          <Switch>
            <Route exact path="/app/sample-page" component={SamplePage} />
          </Switch>
        </Dashboard>
      );
    }
  }
  ```

- Then you can access it at [http://localhost:3000/app/sample-page](http://localhost:3000/app/sample-page)
- Also you can put the a usual link inside <a /> or material button. [See this documentation](http://localhost:3000/app/forms/buttons)

# External Reference

Here's some external reference of library that we used

- **Material UI** [https://material-ui.com/](https://material-ui.com/)
- **React Boilerplate** [https://www.reactboilerplate.com/](https://www.reactboilerplate.com/)
- **JSS (CSS in JS)** [https://cssinjs.org/](https://cssinjs.org/)
- **Immutable JS** [https://facebook.github.io/immutable-js/](https://facebook.github.io/immutable-js/)

Refer to package.json for further refferences.
