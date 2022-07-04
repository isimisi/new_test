import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  handleClose: () => void;
  open: boolean;
  activeNotification: any;
}

export default function NotificationDialog({
  handleClose,
  open,
  activeNotification
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {activeNotification ? activeNotification.notification.header : ""}
      </DialogTitle>
      <DialogContent>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: activeNotification
              ? activeNotification.notification.body
              : ""
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Luk notifikation
        </Button>
      </DialogActions>
    </Dialog>
  );
}
