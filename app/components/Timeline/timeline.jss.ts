import { makeStyles } from "@material-ui/core/styles";
import themePalette from "@api/palette/themePalette";
import { MyTheme } from "../../types/styling";

const useStyles = makeStyles((theme: MyTheme) => ({
  horizontalNodeOffTimeLine: {
    height: 200,
    width: 150,
    bottom: 100,
    position: "absolute",
    cursor: "auto",
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
}));

export default useStyles;
