import { MyTheme } from "@customTypes/styling";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = "40vw";
const flowHeight = "100vh";

const useStyles = makeStyles((theme: MyTheme) => ({
  table: {
    "& > div": {
      overflow: "auto",
    },
    "& table": {
      "& td": {
        wordBreak: "keep-all",
      },
      [theme.breakpoints.down("md")]: {
        "& td": {
          height: 60,
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
    marginBottom: 50,
  },
  addBtn: {
    position: "fixed",
    bottom: 30,
    right: 50,
    zIndex: 100,
  },
  root: {
    height: flowHeight,
    zIndex: 1,
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: `calc(-${drawerWidth})`,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  dragger: {
    width: "10px",
    cursor: "ew-resize",
    padding: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default useStyles;
