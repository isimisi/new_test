import { MyTheme } from "@customTypes/styling";
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme: MyTheme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
  rootGeneral: {
    padding: theme.spacing(3),
  },
  divider: {
    margin: `${theme.spacing(1.5)}px 0`,
    background: "none",
  },
  descBlock: {
    display: "flex",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  iframe: {
    border: "none !important",
    borderRadius: "10px",
  },
  title: {
    position: "relative",
    fontSize: 16,
    fontWeight: "bold",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      fontWeight: 600,
      marginBottom: theme.spacing(1),
    },
  },
  introContainer: {
    backgroundColor: theme.palette.primary.dark,
    alignItems: "center",
    width: "100%",
    height: 290,
    boxShadow: theme.shade.light,
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "space-between",
  },
  textEditor: {
    background: theme.palette.background.paper,
    height: 400,
    border: `1px solid ${theme.palette.divider}`,
    padding: "0 10px",
    color: theme.palette.text.primary,
    borderRadius: theme.rounded.small,
  },
  videoContainer: {
    width: "40%",
    height: "100%",
  },
  introCheck: {
    "& svg": {
      backgroundColor: "white",
      color: theme.palette.primary.main,
    },
  },
  toolbarEditor: {
    borderRadius: theme.rounded.small,
    background: theme.palette.background.default,
    border: "none",
    "& > div": {
      background: theme.palette.background.paper,
      "& img": {
        filter: theme.palette.type === "dark" ? "invert(100%)" : "invert(0%)",
      },
      "& a": {
        color: theme.palette.text.primary,
        "& > div": {
          borderTopColor: theme.palette.text.primary,
        },
      },
    },
  },
  content: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.rounded.medium,
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("lg")]: {
      padding: theme.spacing(2),
    },
  },
  whiteBg: {
    backgroundColor: "transparent",
    margin: 0,
    padding: 0,
  },
  description: {
    maxWidth: 960,
    fontSize: 15,
    paddingTop: theme.spacing(0.5),
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
  titleText: {
    flex: 1,
  },
  papperBlock: theme.mixins.gutters({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(3),
    boxShadow: theme.shade.light,
    color: theme.palette.text.primary,
    "&$noMargin": {
      margin: 0,
    },
  }),
  sliderWrap: {
    display: "block",
    boxShadow: theme.shadows[1],
    width: "100%",
    borderRadius: "12px",
    overflow: "hidden",
  },
  noPadding: {
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
    [theme.breakpoints.up("sm")]: {
      padding: "0 !important",
    },
  },
  subscribeForm: {
    marginTop: theme.spacing(1) * -6,
    display: "flex",
    "& > div": {
      flex: 1,
    },
    "& button": {
      marginTop: theme.spacing(4.5),
      marginLeft: theme.spacing(4),
    },
  },
  addBtn: {
    position: "fixed",
    bottom: 30,
    right: 50,
    zIndex: 100,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 5,
    alignItems: "center",
  },
  field: {
    width: "100%",
    marginTop: 0,
    "& svg": {
      color: theme.palette.grey[400],
      fontSize: 18,
    },
  },
  lottie: {
    height: 100,
  },
  racoonAndText: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 25,
    marginBottom: 10,
  },

  removeMargin: {
    marginTop: -16,
  },
}));

export default styles;
