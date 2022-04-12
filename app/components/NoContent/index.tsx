/* eslint-disable react/destructuring-assignment */
import React from "react";
import Lottie, { LottieOptions } from "lottie-react";

import noContent from "@lotties/racoon/noContent.json";

import Typography from "@material-ui/core/Typography";

interface Props {
  size?: string | number;
  text?: string;
  animationData?: LottieOptions["animationData"];
}

const NoContent = ({
  size = "20%",
  text,
  animationData = noContent
}: Props) => (
  <div
    style={{
      width: "100%",
      marginTop: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      overflow: "hidden"
    }}
  >
    <Typography variant="h4" style={{ textAlign: "center", marginBottom: 20 }}>
      {text}
    </Typography>
    <Lottie
      animationData={animationData}
      loop
      style={{
        width: size
      }}
    />
  </div>
);

export default NoContent;
