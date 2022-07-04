import makeStyles from '@mui/styles/makeStyles';
import themePalette from "@api/palette/themePalette";
import { MyTheme } from "../../types/styling";

const useStyles = makeStyles((theme: MyTheme) => ({
  tagCount: {
    color: themePalette.info
  },
  tagContainer: {
    width: "100%",
    height: "100%",
    maxHeight: "948px",
    paddingTop: 0
  },
  text: {
    marginRight: 25,
    "& $span": {
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  },
  listItem: {
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    boxShadow: theme.shade.light,
    marginTop: 10
  },
  divider: {
    marginTop: 10,
    marginBottom: 10
  },
  countContainer: {
    padding: 2,
    paddingRight: 8,
    paddingLeft: 8,
    backgroundColor: theme.palette.background.default
  },
  activelistItem: {
    backgroundColor: theme.palette.secondary.main,
    "& $span": {
      color: theme.palette.primary.main
    }
  },
  field: {
    width: "100%",
    marginTop: 0,
    "& svg": {
      color: theme.palette.grey[400],
      fontSize: 18
    }
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10
  },
  iconButton: {
    marginRight: 10,
    marginTop: 14
  },
  listItemAvatar: {
    minWidth: 0,
    marginRight: 20
  },
  deleteIcon: {
    color: theme.palette.error.dark
  },
  editIcon: {
    color: theme.palette.primary.main
  }
}));

export default useStyles;
