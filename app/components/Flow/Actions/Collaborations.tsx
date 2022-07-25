import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import Button from "@material-ui/core/Button";
import useStyles from "./actions.jss";
import ChatIcon from "@material-ui/icons/Chat";
import MouseIcon from "@material-ui/icons/Mouse";

import HistoryIcon from "@material-ui/icons/History";
import Typography from "@material-ui/core/Typography";
import Avatar, { genConfig } from "react-nice-avatar";
import { useAuth0 } from "@auth0/auth0-react";
import { UserMeta } from "@helpers/userInfo";

const config = genConfig({
  isGradient: Boolean(Math.round(Math.random()))
});

interface Props {
  setShareModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  timeline?: boolean;
}

const Collaboration = (props: Props) => {
  const { setShareModalOpen, timeline } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const { user } = useAuth0();
  const meta: UserMeta = user && user["https://juristic.io/meta"];
  const { first_name, last_name } = meta.dbUser;

  const toggleShare = () => setShareModalOpen(prevVal => !prevVal);

  return (
    <Paper elevation={4} className={classes.collaborationPaper}>
      <Tooltip arrow title={`${t("workspaces.history")}`} placement="bottom">
        <span>
          <IconButton className={classes.buttons} disabled>
            <HistoryIcon className={classes.buttons} />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip arrow title={`${t("workspaces.chat")}`} placement="bottom">
        <span>
          <IconButton className={classes.buttons} disabled>
            <ChatIcon className={classes.buttons} />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        arrow
        title={`${t("workspaces.collaborators_curser")}`}
        placement="bottom"
      >
        <span>
          <IconButton className={classes.buttons} disabled>
            <MouseIcon className={classes.buttons} />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip
        arrow
        title={
          <>
            <Typography
              variant="subtitle1"
              className={classes.userName}
              align="center"
            >
              {t("workspaces.you", { first_name, last_name })}
            </Typography>
            <Typography className={classes.userRole} align="center">
              Workspace owner
            </Typography>
          </>
        }
        placement="bottom"
      >
        <div style={{ cursor: "pointer", margin: "0 12px" }}>
          <Avatar className={classes.avatar} {...config} />
        </div>
      </Tooltip>
      <Button
        variant="contained"
        color="primary"
        disabled={timeline}
        className={classes.shareButton}
        onClick={toggleShare}
      >
        {t("workspaces.share")}
      </Button>
    </Paper>
  );
};

export default memo(Collaboration);
