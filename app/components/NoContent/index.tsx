/* eslint-disable react/destructuring-assignment */
import React from "react";
import Lottie, { LottieOptions } from "lottie-react";

import noContent from "@lotties/racoon/noContent.json";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

interface Props {
  size?: string | number;
  text?: string;
  animationData?: LottieOptions["animationData"];
  noLottie?: boolean;
  noMargin?: boolean;
  marginTop?: number;
  margin?: number;
}

const NoContent = ({
  size = "20%",
  text,
  animationData = noContent,
  noLottie = false,
  noMargin = false,
  marginTop = 50,
  margin = 0
}: Props) => (
  <Paper
    style={{
      width: "100%",
      margin,
      marginTop: noMargin ? 0 : marginTop,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      overflow: "hidden",
      padding: 30
    }}
  >
    <Typography
      variant="h5"
      style={{ textAlign: "center", marginBottom: noLottie ? 0 : 20 }}
    >
      {text}
    </Typography>
    {noLottie ? null : (
      <Lottie
        animationData={animationData}
        loop
        style={{
          width: size
        }}
      />
    )}
  </Paper>
);

export default NoContent;
