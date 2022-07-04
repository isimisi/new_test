import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
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
}));

export default useStyles;
