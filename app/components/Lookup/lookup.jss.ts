import makeStyles from '@mui/styles/makeStyles';
import themePalette from "@api/palette/themePalette";
import { MyTheme } from "../../types/styling";

const useStyles = makeStyles((theme: MyTheme) => ({
  diagramContainer: {
    width: "100%",
    height: "75vh",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
  },
  flow: {
    borderRadius: 10,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  startAWorkspace: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1000,
  },
  timelinePaper: {
    padding: 10,
    marginTop: 20,
  },
  lookupContainer: {
    width: "100%",
    height: "100%",
    marginTop: 20,
    display: "flex",
  },
  leadershipPaper: {
    padding: 20,
    margin: 5,
    marginTop: 15,
  },
  leaderShipPerson: {
    marginTop: 5,
  },
  leaderShipRole: {},
  leadershipContainer: {
    width: "50%",
    margin: 5,
  },
  leadershipSubtitle: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: 18,
  },
  accountingContainer: {
    marginTop: 15,
  },
}));

export default useStyles;
