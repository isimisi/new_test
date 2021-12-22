import { makeStyles, Theme } from '@material-ui/core/styles';

const styles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
  rootGeneral: {
    padding: theme.spacing(3)
  },
  divider: {
    margin: `${theme.spacing(1.5)}px 0`,
    background: 'none'
  },
  sliderWrap: {
    display: 'block',
    boxShadow: theme.shadows[1],
    width: '100%',
    borderRadius: '12px',
    overflow: 'hidden'
  },
  noPadding: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
    [theme.breakpoints.up('sm')]: {
      padding: '0 !important'
    }
  },
  subscribeForm: {
    marginTop: theme.spacing(1) * -6,
    display: 'flex',
    '& > div': {
      flex: 1
    },
    '& button': {
      marginTop: theme.spacing(4.5),
      marginLeft: theme.spacing(4)
    }
  },
  addBtn: {
    position: 'fixed',
    bottom: 30,
    right: 50,
    zIndex: 100,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 5,
    alignItems: 'center',
  },
  field: {
    width: '100%',
    marginTop: 0,
    '& svg': {
      color: theme.palette.grey[400],
      fontSize: 18,
    }
  },
  lottie: {
    borderRadius: '50%',
    height: 197.71,
  },
  removeMargin: {
    marginTop: -16,
  }
}));

export default styles;
