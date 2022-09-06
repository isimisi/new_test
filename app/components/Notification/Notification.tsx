import React from "react";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  close: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    padding: 0
  }
}));

interface Props {
  close: (type: string) => void;
  message: string;
}

function Notification(props: Props) {
  const handleClose = () => {
    const { close } = props;
    close("crudTableDemo");
  };

  const { message } = props;

  const classes = useStyles();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      open={message !== ""}
      autoHideDuration={7000}
      onClose={handleClose}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={message}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon style={{ color: "white" }} />
        </IconButton>
      ]}
    />
  );
}

export default Notification;
