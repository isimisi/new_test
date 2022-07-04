import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import useStyles from "./lookup.jss";

interface Props {
  header: string;
  body: string;
  active?: string | null;
}

const InfoPaper = ({ header, body, active }: Props) => {
  const classes = useStyles();
  return (
    <Paper
      className={classes.leadershipPaper}
      style={{ backgroundColor: !active ? "white" : "#FF8DA0" }}
    >
      <Typography className={classes.leaderShipRole} variant="h6">
        {header}
      </Typography>
      <Typography className={classes.leaderShipPerson} color="textSecondary">
        {body}
      </Typography>
    </Paper>
  );
};

export default InfoPaper;
