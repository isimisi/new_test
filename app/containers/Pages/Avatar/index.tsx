/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-bind */
import React, { Component } from "react";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import Avatar, { genConfig } from "react-nice-avatar";
import AvatarList from "./AvatarList/index";
import Paper from "@material-ui/core/Paper";

import "./index.css";

import AvatarEditor from "./AvatarEditor";

const conf = genConfig({
  isGradient: Boolean(Math.round(Math.random()))
});

class AvatarEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // @ts-ignore
      config: this.props.avatar || conf,
      shape: "circle"
    };
    // @ts-ignore
    this.props.getConfig(conf);

    // @ts-ignore
    this.avatarId = "myAvatar";
  }

  selectConfig(config) {
    this.setState({ config });
    // @ts-ignore
    this.props.getConfig(config);
  }

  updateConfig(key, value) {
    // @ts-ignore
    const { config } = this.state;
    config[key] = value;
    this.setState({ config });
    // @ts-ignore
    this.props.getConfig(config);
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
      <Paper className="paper">
        <main className="main">
          <div>
            <Avatar
              className="avatar"
              hairColorRandom
              shape={shape}
              {...config}
            />
          </div>
          <AvatarEditor
            config={config}
            shape={shape}
            updateConfig={this.updateConfig.bind(this)}
            updateShape={this.updateShape.bind(this)}
            download={this.download.bind(this)}
          />
        </main>
        {/* Avatar list */}
        <AvatarList selectConfig={this.selectConfig.bind(this)} />
      </Paper>
    );
  }
}

export default AvatarEdit;
