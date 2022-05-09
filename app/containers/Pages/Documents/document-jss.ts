import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
  profilePaper: {
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  field: {
    width: "100%",
    marginBottom: 10,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2),
  },
  lottieContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  lottie: {
    width: 700 / 1.5,
    height: 700 / 1.5,
    [theme.breakpoints.down("sm")]: {
      width: 400 / 1.5,
      height: 400 / 1.5,
    },
  },
}));

export default useStyles;
