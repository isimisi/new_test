import React from "react";

import useStyles from "./analysis.jss";
import SlideshowIcon from "@material-ui/icons/Slideshow";
import SaveIcon from "@material-ui/icons/Save";
import AssignmentIcon from "@material-ui/icons/Assignment";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import { useTranslation } from "react-i18next";

interface Props {
  handleImagesForPp: () => void;
  handleVersions: () => void;
  save: () => void;
}

const SidePanel = (props: Props) => {
  const { handleImagesForPp, handleVersions, save } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <IconButton className={classes.button} onClick={save}>
          <SaveIcon />
        </IconButton>
        <Typography className={classes.buttonText}>
          {t("workspace-analysis.save")}
        </Typography>
      </div>
      <div className={classes.buttonContainer}>
        <IconButton className={classes.button} onClick={handleVersions}>
          <AssignmentIcon />
        </IconButton>
        <Typography className={classes.buttonText}>
          {t("workspace-analysis.earlier_versions")}
        </Typography>
      </div>
      <div className={classes.buttonContainer}>
        <ButtonGroup
          disableElevation
          style={{ borderRadius: 18 }}
          variant="contained"
          orientation="vertical"
          className={classes.button}
        >
          <Tooltip
            arrow
            title={`${t("workspace-analysis.convert_to_pp_dynamic")}`}
            placement="left"
          >
            <IconButton>
              <SlideshowIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            arrow
            title={`${t("workspace-analysis.convert_to_pp_static")}`}
            placement="left"
          >
            <IconButton onClick={handleImagesForPp}>
              <SlideshowIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
        <Typography className={classes.buttonText}>Eksporter</Typography>
      </div>
    </div>
  );
};
export default SidePanel;
