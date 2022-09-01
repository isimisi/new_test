import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";

import React, { memo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import useStyles from "../timeline.jss";
import moment from "moment";
import { useAppDispatch } from "@hooks/redux";
import {
  createElementChange,
  setTimelineNode
} from "@pages/Timelines/reducers/timelineActions";

import ButtonBase from "@material-ui/core/ButtonBase";
import { useTranslation } from "react-i18next";

export default memo(({ data }: NodeProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const onEditClick = () => {
    dispatch(setTimelineNode(data.id, true));
  };

  const downHaveTime = moment(data.date).format("HH:mm") === "00:00";

  return (
    <div
      className="nodrag"
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        width: 150,
        opacity: data.isHidden ? 0.2 : 1
      }}
    >
      <Paper className={classes.horizontalNodeOnTimeLine}>
        <ButtonBase className={classes.itemButton} onClick={onEditClick} />

        <Typography
          variant="subtitle1"
          className={classes.verticalTitleNode}
          id="nodeLabel"
        >
          {data.label}
        </Typography>

        <Typography
          variant="subtitle1"
          className={classes.horizontalDate}
          id="nodeLabel"
        >
          {moment(data.date).isValid()
            ? `${moment(data.date).format("DD/MM-YYYY")}${
              downHaveTime ? "" : ", kl."
            } ${downHaveTime ? "" : moment(data.date).format("HH:mm")}`
            : t("node.no_date")}
        </Typography>
        <Handle
          type="target"
          style={{ top: 1 }}
          position={Position.Top}
          className={classes.horizontalHandle}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ bottom: 1 }}
          className={classes.horizontalHandle}
        />
      </Paper>
    </div>
  );
});
