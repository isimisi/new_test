import Timeline from "@components/Workspace/CompanyData/Timeline";
import Paper from "@material-ui/core/Paper";
import React from "react";
import useStyles from "./lookup.jss";

interface Props {
  data: any;
}

const DataTimeline = (props: Props) => {
  const { data } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.timelinePaper}>
      <Timeline timeline={data} />
    </Paper>
  );
};

export default DataTimeline;
