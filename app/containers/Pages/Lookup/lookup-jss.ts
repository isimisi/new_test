import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    flexGrow: 1,
    margin: theme.spacing(2, 0, 4),
    borderRadius: 40,
    overflow: "hidden",
    boxShadow: theme.shadows[5],
  },
  flex: {
    flex: 1,
  },
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: "relative",
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    borderRadius: 2,
    display: "block",
    color: theme.palette.text.secondary,
    "& svg": {
      fill: theme.palette.text.secondary,
    },
  },
  search: {
    width: "auto",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    font: "inherit",
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(
      1
    )}px ${theme.spacing(4)}px`,
    border: 0,
    display: "block",
    verticalAlign: "middle",
    whiteSpace: "normal",
    background: "none",
    margin: 0, // Reset for Safari
    color: "inherit",
    width: "100%",
    "&:focus": {
      outline: 0,
    },
  },
  toggleContainer: {
    height: 56,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: `${theme.spacing(1)}px 0`,
  },
  itemIconContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default useStyles;
