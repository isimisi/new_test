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
}));

export default useStyles;
