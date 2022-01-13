import React from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import useStyles from "./actions.jss";
import Divider from "@material-ui/core/Divider";
import BusinessIcon from "@material-ui/icons/Business";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AssessmentIcon from "@material-ui/icons/Assessment";
import FlagIcon from "@material-ui/icons/Flag";

interface Props {
  setDefineNodeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defineNodeOpen: boolean;
  handlePostSticky: () => void;
  handleOpenCvr: () => void;
  setShowAlertLog: React.Dispatch<React.SetStateAction<boolean>>;
  showAlertLog: boolean;
  history: any;
  id: string | undefined;
}

const Items = (props: Props) => {
  const {
    setDefineNodeOpen,
    defineNodeOpen,
    handlePostSticky,
    handleOpenCvr,
    setShowAlertLog,
    showAlertLog,
    history,
    id
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  const toggleOpenNode = () => setDefineNodeOpen(prevVal => !prevVal);
  const toggleShowAlerts = () => setShowAlertLog(prevVal => !prevVal);
  const goToAnalysis = () => history.push(`analysis/${id}`);

  return (
    <Paper elevation={4} className={classes.itemsPaper}>
      <Tooltip arrow title={`${t("workspaces.add_node")}`} placement="right">
        <IconButton className={classes.buttons} onClick={toggleOpenNode}>
          <AddBoxIcon
            className={classNames(
              classes.buttons,
              classes.biggerIcon,
              defineNodeOpen ? classes.activeButton : ""
            )}
          />
        </IconButton>
      </Tooltip>
      <Tooltip arrow title={`${t("workspaces.add_note")}`} placement="right">
        <IconButton className={classes.buttons} onClick={handlePostSticky}>
          <NoteAddIcon
            className={classNames(classes.buttons, classes.biggerIcon)}
          />
        </IconButton>
      </Tooltip>
      <Tooltip
        arrow
        title={`${t("workspaces.get_from_company_data")}`}
        placement="right"
      >
        <IconButton className={classes.buttons} onClick={handleOpenCvr}>
          <BusinessIcon
            className={classNames(classes.buttons, classes.biggerIcon)}
          />
        </IconButton>
      </Tooltip>
      <Divider flexItem className={classes.horDivider} />
      <Tooltip arrow title={`${t("workspaces.red_flags")}`} placement="right">
        <IconButton className={classes.buttons} onClick={toggleShowAlerts}>
          <FlagIcon
            className={classNames(
              classes.buttons,
              classes.biggerIcon,
              showAlertLog ? classes.activeButton : ""
            )}
          />
        </IconButton>
      </Tooltip>
      <Tooltip arrow title={`${t("workspaces.analyse")}`} placement="right">
        <IconButton className={classes.buttons} onClick={goToAnalysis}>
          <AssessmentIcon
            className={classNames(classes.buttons, classes.biggerIcon)}
          />
        </IconButton>
      </Tooltip>
      <Divider flexItem className={classes.horDivider} />
      <Tooltip arrow title={`${t("workspaces.undo")}`} placement="right">
        <span>
          <IconButton className={classes.buttons} disabled>
            <UndoIcon
              className={classNames(classes.buttons, classes.biggerIcon)}
            />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip arrow title={`${t("workspaces.redo")}`} placement="right">
        <span>
          <IconButton className={classes.buttons} disabled>
            <RedoIcon
              className={classNames(classes.buttons, classes.biggerIcon)}
            />
          </IconButton>
        </span>
      </Tooltip>
    </Paper>
  );
};

export default Items;
