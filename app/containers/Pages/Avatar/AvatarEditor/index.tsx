/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
// @ts-nocheck

import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import Face from "../face/index";
import Hair from "../hair/index";
import Hat from "../hat/index";
import Eyes from "../eyes/index";
import Glasses from "../glasses/index";
import Ear from "../ear/index";
import Nose from "../nose/index";
import Mouth from "../mouth/index";
import Shirt from "../shirt/index";

import SectionWrapper from "./SectionWrapper/index";

import "./index.css";

const defaultOptions = {
  sex: ["man", "woman"],
  faceColor: ["#F9C9B6", "#AC6651"],
  earSize: ["small", "big"],
  hairColor: [
    "#000",
    "#fff",
    "#77311D",
    "#FC909F",
    "#D2EFF3",
    "#506AF4",
    "#F48150"
  ],
  hairStyleMan: ["normal", "thick", "mohawk"],
  hairStyleWoman: ["normal", "womanLong", "womanShort"],
  hatColor: [
    "#000",
    "#fff",
    "#77311D",
    "#FC909F",
    "#D2EFF3",
    "#506AF4",
    "#F48150"
  ],
  hatStyle: ["beanie", "turban", "none"],
  eyeBrowWoman: ["up", "upWoman"],
  eyeStyle: ["circle", "oval", "smile"],
  glassesStyle: ["round", "square", "none"],
  noseStyle: ["short", "long", "round"],
  mouthStyle: ["laugh", "smile", "peace"],
  shirtStyle: ["hoody", "short", "polo"],
  shirtColor: ["#9287FF", "#6BD9E9", "#FC909F", "#F4D150", "#77311D"],
  bgColor: [
    "#9287FF",
    "#6BD9E9",
    "#FC909F",
    "#F4D150",
    "#E0DDFF",
    "#D2EFF3",
    "#FFEDEF",
    "#FFEBA4",
    "#506AF4",
    "#F48150",
    "#74D153"
  ],
  gradientBgColor: [
    "linear-gradient(45deg, #178bff 0%, #ff6868 100%)",
    "linear-gradient(45deg, #176fff 0%, #68ffef 100%)",
    "linear-gradient(45deg, #ff1717 0%, #ffd368 100%)",
    "linear-gradient(90deg, #36cd1c 0%, #68deff 100%)",
    "linear-gradient(45deg, #3e1ccd 0%, #ff6871 100%)",
    "linear-gradient(45deg, #1729ff 0%, #ff56f7 100%)",
    "linear-gradient(45deg, #56b5f0 0%, #45ccb5 100%)"
  ]
};

export default class AvatarEditor extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    shape: PropTypes.string.isRequired,
    updateConfig: PropTypes.func.isRequired,
    updateShape: PropTypes.func.isRequired,
    download: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isCodeShow: false
    };
    this.myDefaultOptions = this.genDefaultOptions(defaultOptions);
    this.shapes = ["circle", "rounded", "square"];
  }

  // Modification on defaultOptions for convenient
  genDefaultOptions(opts) {
    const hairSet = new Set(opts.hairStyleMan.concat(opts.hairStyleWoman));
    return {
      ...opts,
      hairStyle: Array.from(hairSet)
    };
  }

  switchConfig(type, currentOpt) {
    const { updateConfig } = this.props;
    const opts = this.myDefaultOptions[type];
    const currentIdx = opts.findIndex(item => item === currentOpt);
    const newIdx = (currentIdx + 1) % opts.length;
    updateConfig(type, opts[newIdx]);
  }

  switchShape(currentShape) {
    const { updateShape } = this.props;
    const currentIdx = this.shapes.findIndex(item => item === currentShape);
    const newIdx = (currentIdx + 1) % this.shapes.length;
    updateShape(this.shapes[newIdx]);
  }

  toggleCodeShow() {
    const { isCodeShow } = this.state;
    this.setState({
      isCodeShow: !isCodeShow
    });
  }

  genCodeString(config) {
    const ignoreAttr = ["id"];
    const myConfig = Object.keys(config)
      .filter(key => !ignoreAttr.includes(key))
      .reduce((acc, key) => ({ ...acc, [key]: config[key] }), {});
    return (
      "const config = " +
      JSON.stringify(myConfig, null, 2) +
      "\n" +
      "const myConfig = genConfig(config)\n" +
      "<NiceAvatar style={{ width: '5rem', height: '5rem' }} {...myConfig} />"
    );
  }

  render() {
    const { config, shape, download } = this.props;
    const { isCodeShow } = this.state;
    return (
      <div className="AvatarEditor">
        {/* Face */}
        <SectionWrapper
          className="customSectionStyle"
          tip="Face"
          switchConfig={this.switchConfig.bind(
            this,
            "faceColor",
            config.faceColor
          )}
        >
          <Face color={config.faceColor} />
        </SectionWrapper>
        {/* Hair style */}
        <SectionWrapper
          className="customSectionStyle"
          tip="Hair"
          switchConfig={this.switchConfig.bind(
            this,
            "hairStyle",
            config.hairStyle
          )}
        >
          <Hair style={config.hairStyle} color="#fff" colorRandom />
        </SectionWrapper>
        {/* Hat style */}
        <SectionWrapper
          className="customSectionStyle"
          tip="Hat"
          switchConfig={this.switchConfig.bind(
            this,
            "hatStyle",
            config.hatStyle
          )}
        >
          <Hat style={config.hatStyle} color="#fff" />
        </SectionWrapper>
        {/* Eyes style */}
        <SectionWrapper
          className="customSectionStyle"
          tip="Eyes"
          switchConfig={this.switchConfig.bind(
            this,
            "eyeStyle",
            config.eyeStyle
          )}
        >
          <Eyes style={config.eyeStyle} color="#fff" />
        </SectionWrapper>
        {/* Glasses style */}
        <SectionWrapper
          className="customSectionStyle"
          tip="Glasses"
          switchConfig={this.switchConfig.bind(
            this,
            "glassesStyle",
            config.glassesStyle
          )}
        >
          <Glasses style={config.glassesStyle} color="#fff" />
        </SectionWrapper>
        {/* Ear style */}
        <SectionWrapper
          className="customSectionStyle"
          tip="Ear"
          switchConfig={this.switchConfig.bind(this, "earSize", config.earSize)}
        >
          <Ear size={config.earSize} color="#fff" />
        </SectionWrapper>
        {/* Nose style */}
        <SectionWrapper
          className="customSectionStyle"
          tip="Nose"
          switchConfig={this.switchConfig.bind(
            this,
            "noseStyle",
            config.noseStyle
          )}
        >
          <Nose style={config.noseStyle} color="#fff" />
        </SectionWrapper>
        {/* Mouth style */}
        <SectionWrapper
          className="customSectionStyle"
          tip="Mouth"
          switchConfig={this.switchConfig.bind(
            this,
            "mouthStyle",
            config.mouthStyle
          )}
        >
          <Mouth style={config.mouthStyle} color="#fff" />
        </SectionWrapper>
        {/* Shirt style */}
        <SectionWrapper
          className="customSectionStyle"
          tip="Shirt"
          switchConfig={this.switchConfig.bind(
            this,
            "shirtStyle",
            config.shirtStyle
          )}
        >
          <Shirt style={config.shirtStyle} color="#fff" />
        </SectionWrapper>
      </div>
    );
  }
}
