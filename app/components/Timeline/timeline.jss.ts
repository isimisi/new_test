import { makeStyles } from "@material-ui/core/styles";
import themePalette from "@api/palette/themePalette";
import { MyTheme } from "../../types/styling";

const useStyles = makeStyles((theme: MyTheme) => ({
  horizontalNodeOffTimeLine: {
    width: 250,
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
  appBar: {
    position: "relative",
  },
  tableTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
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
  personDiv: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  peopleAndDocumentsContainer: {
    padding: 10,
  },
  personAndDocsDivider: {
    marginTop: 10,
    marginBottom: 10,
  },
  verticalTitleNode: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  createElementContainer: {
    padding: 16,
    width: "100%",

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

  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
  },
  contentInnerContainer: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
  noContent: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  contentDivider: {
    margin: 10,
  },
  buttonGroup: {
    position: "fixed",
    bottom: 10,
    right: 0,
    marginTop: 10,
    padding: 10,
  },
  verticalDate: {
    fontSize: 10,
    color: "white",
  },
  verticalTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  verticalDescription: {
    marginTop: 10,
  },
  verticalContent: {},
  dropzone2: {
    display: "flex",
    width: "100%",
    backgroundColor: "#F7F8FA",
    borderRadius: theme.rounded.small,
    border: "1px solid #F1F1F1",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  addCircle: {
    width: "30%",
    height: "30%",
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  thumb: {
    display: "inline-flex",

    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    borderRadius: theme.rounded.small,
    boxSizing: "border-box",
  },
  thumbInner: {
    minWidth: 0,
    overflow: "hidden",
    display: "flex",
    position: "relative",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    display: "block",
    width: "auto",
    height: "100%",
  },
}));

export default useStyles;
