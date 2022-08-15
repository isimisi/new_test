import { MyTheme } from "@customTypes/styling";
import { makeStyles } from "@material-ui/core/styles";
import themePalette from "@api/palette/themePalette";

const useStyles = makeStyles((theme: MyTheme) => ({
  metaPaper: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "#fcfcfc",
    left: 10,
    top: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  collaborationPaper: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "#fff",
    right: 10,
    top: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  filterChipContainer: {
    marginTop: 10
  },
  filterHeaders: {
    fontWeight: "bold",
    marginTop: 15
  },
  chipIconContainer: {
    display: "flex",
    alignItems: "center"
  },
  tag: {
    width: 20,
    height: 20,
    borderRadius: 10
  },
  filterDone: {
    width: 20
  },
  filterChip: {
    margin: 4,
    borderRadius: 10
  },
  countContainer: {
    padding: 2,
    paddingRight: 8,
    paddingLeft: 8,
    backgroundColor: theme.palette.background.default
  },
  tagCount: {
    color: themePalette.info
  },
  itemsPaper: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "#fcfcfc",
    left: 10,
    top: "calc(50% - 183.365px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  viewsPaper: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "#fcfcfc",
    left: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    top: "calc(50% - 85px)"
  },
  controlsPaper: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "#fcfcfc",
    right: 10,
    bottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  buttons: {
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.primary.main
    },
    fontSize: 24
  },
  menuItem: {
    "&:hover": {
      backgroundColor: "transparent"
    },
    "&:hover > div": {
      color: theme.palette.primary.main
    }
  },
  activeButton: {
    color: theme.palette.primary.main
  },
  horDivider: {
    margin: 10,
    height: 1
  },
  verDivder: {
    margin: 10
  },
  logo: {
    width: 80,
    marginLeft: 12,
    userSelect: "none"
  },

  biggerIcon: {
    fontSize: 26
  },
  miniMap: { bottom: 70, right: 10, borderRadius: 10 },
  shortCutText: {},
  shortCut: {
    fontWeight: 700
  },
  shortCutRow: {
    marginTop: 5
  },
  divider: {
    marginBottom: 10
  },
  shortCutSectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5
  },
  userName: {
    fontSize: 16
  },
  userRole: {
    fontSize: 12,
    color: "gray"
  },
  avatar: { width: 30, height: 30 },
  shareButton: {
    borderRadius: 4,
    padding: "2px 6px",
    margin: "0 12px"
  }
}));

export default useStyles;
