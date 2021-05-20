import { fade } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  field: {
    width: '100%',
    marginBottom: 10
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  subHeader: {
    width: '60%',
    marginTop: 20
  },
  andOrDiv: {
    backgroundColor: theme.palette.type === 'dark' ? '#303030' : '#F7F8FA',
    border: theme.palette.type === 'dark' ? '1px solid #606060' : '1px solid #F1F1F1',
    borderRadius: theme.rounded.small,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    whiteSpace: 'nowrap'
  },
  attrField: {
    width: '100%',
    marginLeft: 10,
    marginBottom: 20,
  },
  select: {
    marginTop: 30,
    width: '30%',
    marginLeft: '10%'
  },
  paper: {
    flexGrow: 1,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
  },
  demoContainer: {
    flexGrow: 1,
    marginTop: 20,
    height: '50vh',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.rounded.medium,
    boxShadow: theme.shade.light,
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  demoContent: {
    flexGrow: 1,
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper,
    backdropFilter: 'saturate(180%) blur(20px)',
    transition: 'left 0.4s ease-out, opacity 0.4s ease-out',
    [theme.breakpoints.up('lg')]: {
      backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.grey[800], 0.75) : fade(theme.palette.background.paper, 0.9),
    },
    [theme.breakpoints.down('xs')]: {
      left: '100%',
      top: 0,
      opacity: 0,
      position: 'absolute',
      zIndex: 1200,
      width: '100%',
      overflow: 'auto',
      height: '100%'
    }
  },
});

export default styles;
