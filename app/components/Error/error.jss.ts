import { Theme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) => ({
  errorWrap: {
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: '50%',
    width: 700,
    height: 700,
    [theme.breakpoints.down('md')]: {
      width: 400,
      height: 400,
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    margin: `${theme.spacing(3)} auto`,
    '& h5': {
      [theme.breakpoints.down('md')]: {
        fontSize: '1.2rem',
      },
    },
  },
  title: {
    color: theme.palette.primary.main,
    textShadow: `10px 6px 50px ${theme.palette.primary.main}`,
    [theme.breakpoints.down('md')]: {
      fontSize: '4rem',
      marginBottom: theme.spacing(2)
    },
  },
  deco: {
    boxShadow: theme.shadows[2],
    position: 'absolute',
    borderRadius: 2,
  },
  button: {
    marginTop: 24
  },
  lottie: {
    borderRadius: '50%',
    width: 700 / 1.5,
    height: 700 / 1.5,
    [theme.breakpoints.down('md')]: {
      width: 400 / 1.5,
      height: 400 / 1.5,
    },
  }
}));

export default useStyles;
