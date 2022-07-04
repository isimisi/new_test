/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

import Avatar, { genConfig } from "react-nice-avatar";
import "./index.css";
import IconButton from "@mui/material/IconButton";
import UpdateIcon from "@mui/icons-material/Update";
export default class AvatarList extends Component {
  static propTypes = {
    selectConfig: PropTypes.func.isRequired
  };

  constructor(props: { selectConfig: (item: any) => void }) {
    super(props);
    // @ts-ignore
    this.displayCount = 10;
    this.state = {
      current: 0,
      // @ts-ignore
      avatarConfigList: this.genConfigList(this.displayCount)
    };
    // @ts-ignore
    this.listId = "avatarList";
    // @ts-ignore
    this.listWidth = 0;
  }

  componentDidMount() {
    this.fetchListWidth();
  }

  genConfigList(count: number): any {
    return new Array(count).fill(null).map(() => ({
      ...genConfig({ isGradient: Boolean(Math.round(Math.random())) }),
      id: "n_" + nanoid()
    }));
  }

  fetchListWidth(count = 0) {
    if (count > 20) return;
    // @ts-ignore
    const listElem = document.getElementById(this.listId);
    if (!listElem) {
      return setTimeout(() => {
        this.fetchListWidth(count + 1);
      }, 500);
    }
    // @ts-ignore
    this.listWidth = listElem.offsetWidth;
    return listElem.offsetWidth;
  }

  changeCurrent(deg: 1 | -1) {
    const newState = { current: 0 };

    // @ts-ignore
    const newConfigList = this.genConfigList(this.displayCount);

    // @ts-ignore
    newState.avatarConfigList = newConfigList;

    this.setState(newState);
  }

  render() {
    // @ts-ignore

    // @ts-ignore
    const { selectConfig } = this.props;
    // @ts-ignore
    const { current, avatarConfigList } = this.state;
    // @ts-ignore
    const displayMax = (current + 2) * this.displayCount;
    // @ts-ignore
    const displayMin = (current - 1) * this.displayCount;
    return (
      <div className="container">
        {/* @ts-ignore */}
        <div id={this.listId} className="AvatarList overflow">
          <div className="listWrapper">
            {avatarConfigList.map((item, idx) => (
              <div
                key={item.id}
                className="AvatarItemWrapper"
                onClick={selectConfig.bind(this, item)}
              >
                {idx >= displayMin && idx < displayMax && (
                  <Avatar className="AvatarItem" {...item} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Arrow right */}
        <IconButton color="primary" onClick={this.changeCurrent.bind(this, 1)} size="large">
          <UpdateIcon />
        </IconButton>
      </div>
    );
  }
}
