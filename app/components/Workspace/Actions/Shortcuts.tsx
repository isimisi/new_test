import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { useTranslation } from "react-i18next";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import useStyles from "./actions.jss";
import Grid from "@material-ui/core/Grid";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const Shortcuts = (props: Props) => {
  const { open, handleClose } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">
        {t("workspaces.open_shotcuts")}
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.shortCutSectionHeader}>
          {t("workspaces.tools")}
        </Typography>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>⌘ + I</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.shortcuts.element")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>N</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.shortcuts.note")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>ctrl + C</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.shortcuts.company data")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>R</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.shortcuts.red_flags")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>A</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.shortcuts.analyse")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>⌘ + Z</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.undo")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>⌘ + shift + Z</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.redo")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        <Typography className={classes.shortCutSectionHeader}>
          {t("workspaces.general")}
        </Typography>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>⌘ + C</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.shortcuts.copy")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>⌘ + V</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.shortcuts.paste")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>⌘ + X</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.shortcuts.cut")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>shift + drag</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.shortcuts.multi_select")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>backspace</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.shortcuts.delete")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Typography className={classes.shortCutSectionHeader}>
          {t("workspaces.node_data")}
        </Typography>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>alt + R</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("flow.node_context_menu.relations_info")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>alt + S</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("flow.node_context_menu.company_info")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>alt + E</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("flow.node_context_menu.building_info")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Typography className={classes.shortCutSectionHeader}>
          {t("workspaces.shortcuts.navigation")}
        </Typography>
        <Divider className={classes.divider} />
        {/* <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>M</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.shortcuts.mini_map")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} /> */}
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>alt+</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.shortcuts.zoom_in")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>alt-</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.shortcuts.zoom_out")}
            </Typography>
          </Grid>
        </Grid>
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>alt + 0</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("workspaces.shortcuts.zoom_to_100")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>alt + 1</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("flow.pane_context_menu.show_all")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid spacing={3} container className={classes.shortCutRow}>
          <Grid item xs={5}>
            <Typography className={classes.shortCut}>alt + G</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.shortCutText}>
              {t("flow.pane_context_menu.show_grid")}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
      </DialogContent>
    </Dialog>
  );
};

export default Shortcuts;
