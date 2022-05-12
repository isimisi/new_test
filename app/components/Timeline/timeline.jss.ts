import { makeStyles } from "@material-ui/core/styles";
import themePalette from "@api/palette/themePalette";
import { MyTheme } from "../../types/styling";

const useStyles = makeStyles((theme: MyTheme) => ({
  horizontalNodeOffTimeLine: {
    width: 150,
    bottom: 100,
    position: "absolute",
    cursor: "auto",
    padding: 5,
  },
  itemButton: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  horizontalNodeOnTimeLine: {
    display: "flex",
    padding: 12,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    alignSelf: "center",
    cursor: "auto",
    backgroundColor: "white",
  },
  flex: {
    display: "flex",
  },
  type: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  content: {
    fontSize: 14,
  },
  emailTitle: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: 18,
  },
  horizontalHandle: {
    border: 0,
    width: 0.1,
    height: 0.1,
    visibility: "hidden",
  },
  horizontalDate: {
    fontSize: 10,
    color: "#000",
  },
  createElementContainer: {
    padding: 16,
    width: "100%",
    maxHeight: "60vh",
    overflowY: "auto",
  },
  eventField: {
    width: "100%",
  },
  eventSelectField: {
    width: "100%",
    marginTop: 16,
    position: "relative",
  },
  field: {
    width: "100%",
    marginBottom: 10,
  },
  textEditor: {
    background: theme.palette.background.paper,
    minHeight: 200,
    border: `1px solid ${theme.palette.divider}`,
    padding: "0 10px",
    color: theme.palette.text.primary,
    borderRadius: theme.rounded.small,
  },
  toolbarEditor: {
    borderRadius: theme.rounded.small,
    background: theme.palette.background.default,
    border: "none",
    "& > div": {
      background: theme.palette.background.paper,
      "& img": {
        filter: "invert(0%)",
      },
      "& a": {
        color: theme.palette.text.primary,
        "& > div": {
          borderTopColor: theme.palette.text.primary,
        },
      },
    },
  },
  mailFab: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  dropzone: {
    width: "100%",
    height: "100%",
  },
}));

export default useStyles;
