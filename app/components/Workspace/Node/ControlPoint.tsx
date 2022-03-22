import React, { memo, FC, CSSProperties } from "react";

import { NodeProps } from "react-flow-renderer";

const nodeStyles: CSSProperties = {
  padding: "3px",
  backgroundColor: "#73B1FF",
  borderRadius: "100%"
};

const CustomNode: FC<NodeProps> = () => <div style={nodeStyles} />;

export default memo(CustomNode);
