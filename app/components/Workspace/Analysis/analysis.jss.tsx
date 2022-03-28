import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  container: {
    marginLeft: 30,
    width: 250,
    position: "sticky",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    top: 0
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "white",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
    marginTop: 15
  },
  buttonText: {
    marginTop: 5,
    color: "gray",
    textAlign: "center",
    fontSize: 12
  }
}));

export default useStyles;
