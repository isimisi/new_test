import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import css from "@styles/Form.scss";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FloatingPanel from "../../Panel/FloatingPanel";
import useStyles from "../workspace-jss";

function WorkspaceMeta(props) {
  const { open, closeForm, onSave } = props;
  const classes = useStyles();

  const [signed, setSigned] = useState(false);

  const onSignedChange = () => setSigned((prev) => !prev);

  return (
    <div>
      <FloatingPanel
        openForm={open}
        closeForm={closeForm}
        title="Signer dette arbejdsområde"
      >
        <div>
          <section className={css.bodyForm}>
            <Typography variant="caption">
              Ved at signere dette arbejdsområder, godkender du at oplysningerne i
              arbejdsområdet er korrekte. Efter godkendelse vil det være låst og kan
              derfor ikke ændres længere. Bemærk, at oplysningerne kan bruges til
              opfyldelse af lovmæssige forpligtelser, eksempelvis foranstaltninger mod
              hvidvask.
            </Typography>
            <div className={classes.row} style={{ marginTop: 10 }}>
              <Checkbox
                name="changeGroup"
                color="primary"
                checked={signed}
                onChange={onSignedChange}
              />
              <Typography variant="subtitle2" style={{ marginTop: 5 }}>
                Jeg erklærer på tro og love, at oplysningerne er korrekte.
              </Typography>
            </div>
          </section>
          <div className={css.buttonArea}>
            <Button type="button" onClick={() => closeForm()}>
              Annuller
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={onSave}
              disabled={!signed}
            >
              Godkend
            </Button>
          </div>
        </div>
      </FloatingPanel>
    </div>
  );
}

WorkspaceMeta.propTypes = {
  open: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

WorkspaceMeta.defaultProps = {
  label: "",
  description: "",
};

export default WorkspaceMeta;
