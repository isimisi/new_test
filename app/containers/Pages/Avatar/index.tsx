/* eslint-disable react/jsx-no-bind */
import React, { Component } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import Avatar, { genConfig } from "react-nice-avatar";
import AvatarEditor from "./AvatarEditor/index";
import AvatarList from "./AvatarList/index";

require("./index.scss");

class AvatarEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: genConfig({
        isGradient: Boolean(Math.round(Math.random()))
      }),
      shape: "circle"
    };

    // @ts-ignore
    this.avatarId = "myAvatar";
  }

  selectConfig(config) {
    this.setState({ config });
  }

  updateConfig(key, value) {
    // @ts-ignore
    const { config } = this.state;
    config[key] = value;
    this.setState({ config });
  }

  updateShape(shape) {
    this.setState({ shape });
  }

  async download() {
    const scale = 2;
    // @ts-ignore
    const node = document.getElementById(this.avatarId);
    if (node) {
      const blob = await domtoimage.toBlob(node, {
        height: node.offsetHeight * scale,
        style: {
          transform: `scale(${scale}) translate(${node.offsetWidth /
            2 /
            scale}px, ${node.offsetHeight / 2 / scale}px)`,
          "border-radius": 0
        },
        width: node.offsetWidth * scale
      });

      saveAs(blob, "avatar.png");
    }
  }

  render() {
    // @ts-ignore
    const { config, shape } = this.state;
    return (
      <div className="App flex flex-col min-h-screen">
        <main className="flex-1 flex flex-col items-center justify-center">
          {/** @ts-ignore */}
          <div id={this.avatarId} className="mb-10">
            <Avatar
              className="w-64 h-64 highres:w-80 highres:h-80"
              hairColorRandom
              shape={shape}
              style={{ width: 200, height: 200 }}
              {...config}
            />
          </div>
        </main>

        {/* Avatar list */}
        <AvatarList selectConfig={this.selectConfig.bind(this)} />
      </div>
    );
  }
}

export default AvatarEdit;
