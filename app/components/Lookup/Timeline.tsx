import Timeline from "@components/Workspace/CompanyData/Timeline";
import Paper from "@mui/material/Paper";
import React from "react";
import useStyles from "./lookup.jss";

interface Props {
  data: any;
}

function DataTimeline(props: Props) {
  const { data } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.timelinePaper}>
      <Timeline timeline={data} />
    </Paper>
  );
}

export default DataTimeline;
