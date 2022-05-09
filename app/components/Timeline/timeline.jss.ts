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
  },
  field: {
    width: "100%",
    marginBottom: 10,
  },
}));

export default useStyles;
