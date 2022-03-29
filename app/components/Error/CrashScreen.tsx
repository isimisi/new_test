import React from "react";

import CryptoJS from "crypto-js";
import Lottie from "lottie-react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import logo from "@images/logo.svg";
import { Trans, useTranslation } from "react-i18next";
import question from "@lotties/racoon/question.json";
import ButtonBase from "@material-ui/core/ButtonBase";

interface ErrorProps {
  clearError: () => void;
  error: Error;
  info?: React.ErrorInfo;
}

const ErrorView = ({ clearError, error }: ErrorProps) => {
  const { t } = useTranslation();
  const errorCode = CryptoJS.AES.encrypt(
    error.name.toString(),
    "errorCode"
  ).toString();

  return (
    <Paper
      style={{
        padding: 24,
        display: "flex",
        position: "relative"
      }}
    >
      <ButtonBase
        style={{
          position: "absolute",
          left: 20,
          top: 20
        }}
        onClick={clearError}
      >
        <img src={logo} alt="juristic" style={{ width: 100 }} />
      </ButtonBase>
      <Lottie animationData={question} />
      <div
        style={{
          marginLeft: 50,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          maxWidth: 400
        }}
      >
        <div>
          <Typography
            variant="h1"
            style={{ marginTop: 20, textAlign: "center" }}
          >
            {t("500.oops")}
          </Typography>
          <Typography variant="h4" style={{ marginTop: 20 }}>
            {t("500.error_header")}
          </Typography>
          <Typography style={{ marginTop: 20 }}>
            {t("500.error_body")}
          </Typography>
          <Typography style={{ marginTop: 20 }}>
            <Trans
              i18nKey="500.error_body_quick" // optional -> fallbacks to defaults if not provided
              components={[
                <a
                  href={
                    "mailto: hej@juristic.io?subject=fejlkode: " + errorCode
                  }
                >
                  hej@juristic.io
                </a>
              ]}
            />
          </Typography>
          <Typography style={{ marginTop: 20, fontSize: 11 }}>
            {t("500.error_code", { errorCode })}
          </Typography>
        </div>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#73B1FF",
            color: "white",
            width: "50%",
            marginTop: 50
          }}
          onClick={clearError}
        >
          {t("404.go_back")}
        </Button>
      </div>
    </Paper>
  );
};

export default ErrorView;
