/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTranslation } from "react-i18next";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";

type Props = {
  open: boolean;
  close: (showAgain: boolean) => void;
};

const InternationalStructureAlert = (props: Props) => {
  const { open, close } = props;
  const { t } = useTranslation();
  const [showAgain, setShowAgain] = React.useState(false);
  const toggleShowAgain = () => setShowAgain(preVal => !preVal);
  const handleClose = () => {
    close(showAgain);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("workspace.internation_disclaimer.header")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("workspace.internation_disclaimer.body")
              .split("/n")
              .map(line => (
                <p>{line}</p>
              ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div
            style={{
              marginRight: 10,
              display: "flex",
              flexDirection: "row",
              marginLeft: 5,
              alignItems: "center"
            }}
          >
            <Checkbox
              checked={showAgain}
              onChange={toggleShowAgain}
              name="dont show"
              color="primary"
            />
            <Typography variant="subtitle2">
              {t("workspace.internation_disclaimer.do_not_show_again")}
            </Typography>
          </div>
          <Button onClick={handleClose} color="primary" autoFocus>
            {t("workspace.internation_disclaimer.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InternationalStructureAlert;
