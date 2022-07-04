/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// @ts-nocheck
import React from "react";
import Paper from "@material-ui/core/Paper";
import "./index.css";

export default function sectionWrapper(props: {
  className?: string;
  children: JSX.Element;
  switchConfig: () => void;
  tip: string;
}): HTMLElement {
  const { className = "", children, switchConfig, tip } = props;
  return (
    <div
      className={"SectionWrapper " + className}
      data-tip={tip}
      onClick={switchConfig}
    >
      <Paper className="innerDiv">
        <div className="childrenWrapper customChildWrapper">{children}</div>
      </Paper>
    </div>
  );
}
