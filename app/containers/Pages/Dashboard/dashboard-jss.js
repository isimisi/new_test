
import { fade } from '@material-ui/core/styles/colorManipulator';
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  rootGeneral: {
    padding: theme.spacing(3)
  },
  divider: {
    margin: `${theme.spacing(1.5)}px 0`,
    background: 'none'
  },
  sliderWrap: {
    position: 'relative',
    display: 'block',
    boxShadow: theme.shadows[1],
    width: '100%',
    borderRadius: theme.rounded.medium,
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
  whiteInputRoot: {
    '& label, input': {
      color: `${theme.palette.common.white} !important`,
    },
    '& > div': {
      borderColor: fade(theme.palette.common.white, 0.6),
    },
    color: 'white'
  },
  whiteInputInput: {
    color: 'white !important'
  }
});

export default styles;
