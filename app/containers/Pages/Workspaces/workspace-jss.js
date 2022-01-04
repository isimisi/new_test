import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/deepPurple';
import teal from '@material-ui/core/colors/teal';
import brown from '@material-ui/core/colors/brown';
import red from '@material-ui/core/colors/red';
import { lighten, darken, alpha } from '@material-ui/core/styles/colorManipulator';

const drawerWidth = 300;
const drawerHeight = '83vh';

const styles = theme => ({
  table: {
    '& > div': {
      overflow: 'auto'
    },
    '& table': {
      '& td': {
        wordBreak: 'keep-all'
      },
      [theme.breakpoints.down('md')]: {
        '& td': {
          height: 60,
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }
    },
  },

  img: {
    width: 90
  },
  logo: {
    position: 'absolute', zIndex: 9999, top: 10, left: 10
  },
  signedLogo: {
    position: 'absolute',
    zIndex: 9999,
    bottom: 70,
    right: 20
  },
  signed: {
    position: 'absolute',
    zIndex: 9999,
    bottom: 10,
    right: 10,
    padding: 5,
    paddingRight: 9,
    borderRadius: 5,
    backgroundColor: '#0B730B22',
    alignItems: 'center'
  },
  signedText: {
    color: '#0B730Bdd',
    fontSize: 12,
    fontWeight: 'bold',
  },
  signedId: {
    color: '#0B730Bdd',
    fontSize: 10,
  },
  signedCircle: {
    backgroundColor: '#0B730B55',
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 11,
    marginBottom: 15,
  },
  root: {
    flexGrow: 1,
    height: drawerHeight,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.rounded.medium,
    boxShadow: theme.shade.light,
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  signedRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    position: 'fixed',
    bottom: 30,
    right: 50,
    zIndex: 100,
  },
  fixHeight: {},
  appBar: {
    height: 'auto',
    background: theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
      background: 'none'
    },
    justifyContent: 'center',
    '& $avatar': {
      boxShadow: theme.glow.light,
      width: 80,
      height: 80,
      marginRight: 30,
    },
    '& h2': {
      flex: 1,
      color: theme.palette.text.primary,
      '& span': {
        color: theme.palette.text.secondary
      }
    },
  },
  online: {
    background: '#CDDC39'
  },
  bussy: {
    background: '#EF5350'
  },
  idle: {
    background: '#FFC107'
  },
  offline: {
    background: '#9E9E9E'
  },
  status: {
    '& span': {
      borderRadius: '50%',
      display: 'inline-block',
      marginRight: 2,
      width: 10,
      height: 10,
      border: `1px solid ${theme.palette.common.white}`
    }
  },
  appBarShift: {
    marginLeft: 0,
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down('md')]: {
      zIndex: 1300
    }
  },
  total: {
    textAlign: 'center',
    fontSize: 11,
    color: theme.palette.text.disabled,
    textTransform: 'uppercase'
  },
  drawerPaper: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
    position: 'relative',
    paddingBottom: 65,
    height: drawerHeight,
    background: theme.palette.type === 'dark' ? darken(theme.palette.primary.light, 0.6) : lighten(theme.palette.primary.light, 0.5),
    border: 'none',
  },
  clippedRight: {},
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    position: 'relative',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper,
    backdropFilter: 'saturate(180%) blur(20px)',
    transition: 'left 0.4s ease-out, opacity 0.4s ease-out',
    [theme.breakpoints.up('lg')]: {
      backgroundColor: theme.palette.type === 'dark' ? alpha(theme.palette.grey[800], 0.75) : alpha(theme.palette.background.paper, 0.9),
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
  detailPopup: {
    [theme.breakpoints.down('xs')]: {
      left: 0,
      opacity: 1,
      zIndex: 2001
    }
  },
  title: {
    display: 'flex',
    flex: 1,
    '& svg': {
      marginRight: 5
    }
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  searchWrapper: {
    flex: 1,
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    borderRadius: theme.rounded.big,
    display: 'flex',
    background: theme.palette.common.white,
    border: `1px solid ${theme.palette.divider}`,
    marginRight: theme.spacing(0.5),
    height: theme.spacing(5),
  },
  search: {
    width: 'auto',
    height: '100%',
    top: 0,
    left: 20,
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px ${theme.spacing(0.5)}px ${theme.spacing(6)}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0, // Reset for Safari
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0,
    },
  },
  bottomFilter: {
    position: 'absolute',
    width: '100%',
    background: 'none',
    border: 'none',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
    zIndex: 2000,
    bottom: 0,
    left: 0,
  },
  avatar: {},
  userName: {
    textAlign: 'left',
  },
  cover: {
    padding: '20px 8px',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& $avatar': {
      boxShadow: theme.glow.light,
      width: 80,
      height: 80,
      marginRight: 30,
      [theme.breakpoints.down('sm')]: {
        width: 50,
        height: 50,
        marginRight: 20
      }
    },
  },
  opt: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  favorite: {
    color: amber[500]
  },
  redIcon: {
    background: red[50],
    '& svg': {
      color: red[500]
    }
  },
  brownIcon: {
    background: brown[50],
    '& svg': {
      color: brown[500]
    }
  },
  tealIcon: {
    background: teal[50],
    '& svg': {
      color: teal[500]
    }
  },
  blueIcon: {
    background: blue[50],
    '& svg': {
      color: blue[500]
    }
  },
  amberIcon: {
    background: amber[50],
    '& svg': {
      color: amber[500]
    }
  },
  purpleIcon: {
    background: purple[50],
    '& svg': {
      color: purple[500]
    }
  },
  field: {
    width: '100%',
    marginBottom: theme.spacing(1),
    '& svg': {
      color: theme.palette.grey[400],
      fontSize: 18,
    }
  },
  uploadAvatar: {
    width: '100%',
    height: '100%',
    background: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[100],
  },
  selected: {
    background: theme.palette.type === 'dark' ? darken(theme.palette.primary.light, 0.5) : darken(theme.palette.primary.light, 0.05),
    borderLeft: `4px solid ${theme.palette.secondary.main}`,
    paddingLeft: 20,
    '& h3': {
      color: theme.palette.primary.dark
    }
  },
  hiddenDropzone: {
    display: 'none'
  },
  avatarWrap: {
    width: 100,
    height: 100,
    margin: '10px auto 30px',
    position: 'relative'
  },
  avatarTop: {
    display: 'block',
    textAlign: 'center',
    padding: theme.spacing(3),
    '& $avatar': {
      width: 100,
      height: 100,
      margin: '0 auto'
    }
  },
  buttonUpload: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  navIconHide: {
    marginRight: theme.spacing(1),
    paddingTop: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  dndflow: {
    flexDirection: 'column',
    display: 'flex',
    height: '100%'
  },
  dndflow_aside: {
    borderRight: '1px solid #eee',
    padding: '15px 10px',
    fontSize: '12px',
    background: '#fcfcfc'
  },
  dndflow_aside__description: {
    marginBottom: '10px'
  },
  dndnode: {
    height: '20px',
    padding: '4px',
    border: '1px solid #1a192b',
    borderRadius: '2px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'grab'
  },
  dndflow__reactflow_wrapper: {
    flexGrow: '1',
    height: '100%'
  },
  '@media screen and (min-width: 768px)': {
    __expression__: 'screen and (min-width: 768px)',
    dndflow: {
      flexDirection: 'row'
    },
    dndflow_aside: {
      width: '20%',
      maxWidth: '250px'
    }
  }
});

export default styles;
