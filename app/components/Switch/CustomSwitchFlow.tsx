import { withStyles, Theme, createStyles } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 14,
      height: 8,
      padding: 0,
      display: "flex"
    },
    switchBase: {
      padding: 1,
      color: theme.palette.grey[500],
      "&$checked": {
        transform: "translateX(6px)",
        color: theme.palette.common.white,
        "& + $track": {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main
        }
      }
    },
    thumb: {
      width: 6,
      height: 6,
      boxShadow: "none"
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 8 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white
    },
    checked: {}
  })
)(Switch);

export default AntSwitch;
