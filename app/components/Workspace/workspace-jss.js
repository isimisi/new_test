import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import blue from '@material-ui/core/colors/indigo';
import cyan from '@material-ui/core/colors/cyan';
import { lighten, darken, fade } from '@material-ui/core/styles/colorManipulator';
const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: 500,
    zIndex: 1,
    position: 'relative',
    backgroundColor: theme.palette.type === 'dark' ? fade(theme.palette.grey[800], 0.75) : fade(theme.palette.background.paper, 0.9),
    backdropFilter: 'saturate(180%) blur(20px)',
    overflow: 'hidden',
    display: 'flex',
    marginBottom: theme.spacing(3),
    borderRadius: theme.rounded.medium,
    boxShadow: theme.shade.light
  },
  canvasRoot: {
    flexGrow: 1,
    height: '100vh',
    width: '100vw',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
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
  controls: {
    position: 'absolute',
    top: '35%',
    boxShadow: 'none',
    bottom: 'none'
  },
  iconRed: {
    color: red[500]
  },
  iconOrange: {
    color: orange[500]
  },
  iconBlue: {
    color: blue[500]
  },
  iconCyan: {
    color: cyan[500]
  },
  appBar: {
    zIndex: 130,
    background: 'none',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    '& button': {
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(1)
    }
  },
  flex: {
    flex: 1,
  },
  wrapper: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    color: theme.palette.text.secondary,
    borderRadius: theme.rounded.big,
    boxShadow: theme.shadows[2],
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
    margin: `${theme.spacing(2)}px 0`
  },
  addBtn: {
    position: 'fixed',
    bottom: 30,
    right: 235,
    zIndex: 101,
  },
  sidebar: {
    zIndex: 120
  },
  search: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(9)}px`,
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
  drawerPaper: {
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    width: drawerWidth,
    background: theme.palette.type === 'dark' ? darken(theme.palette.primary.light, 0.6) : lighten(theme.palette.primary.light, 0.5),
    border: 'none',
    minHeight: '100%',
  },
  selected: {
    background: theme.palette.type === 'dark' ? darken(theme.palette.primary.light, 0.5) : darken(theme.palette.primary.light, 0.05),
    borderLeft: `4px solid ${theme.palette.secondary.main}`,
    paddingLeft: 20,
    '& h3': {
      color: theme.palette.primary.dark
    }
  },
  content: {
    flexGrow: 1,
    zIndex: 120,
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(8),
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
      marginBottom: theme.spacing(4),
    },
    position: 'relative',
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: {
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`
  },
  title: {
    width: 205
  },
  divider: {
    margin: '0 20px 0 10px'
  },
  /* Email List */
  column: {
    flexBasis: '33.33%',
    overflow: 'hidden',
    paddingRight: '0 !important',
    paddingTop: 5,
    marginLeft: 20
  },
  secondaryHeading: {
    fontSize: 14,
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('xs')]: {
      whiteSpace: 'normal',
      paddingBottom: 10
    }
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(3)}px`
    },
    '& section': {
      width: '100%'
    }
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  avatar: {},
  fromHeading: {
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    '& $avatar': {
      width: 30,
      height: 30,
      marginRight: 20
    }
  },
  topAction: {
    display: 'flex',
    background: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[100],
    marginBottom: 20,
    alignItems: 'center',
    padding: '0 20px',
    borderRadius: theme.rounded.medium,
  },
  category: {
    fontSize: 12,
    textTransform: 'uppercase',
    display: 'flex',
    '& svg': {
      fontSize: 16,
      marginRight: 5
    }
  },
  markMenu: {
    '& svg': {
      marginRight: 10
    }
  },
  headMail: {
    flex: 1
  },
  field: {
    width: '100%',
    marginTop: 0,
    '& svg': {
      color: theme.palette.grey[400],
      fontSize: 18,
    }
  },
  hiddenDropzone: {
    display: 'none'
  },
  sendIcon: {
    marginLeft: 10
  },
  item: {},
  preview: {
    display: 'flex',
    marginBottom: 20,
    '& $item': {
      maxWidth: 160,
      marginBottom: 5,
      marginRight: 5
    }
  },
  emailSummary: {
    padding: 0,
    '& > div': {
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      },
    }
  },
  emailContent: {
    color: theme.palette.text.primary,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
  },
  starBtn: {
    marginRight: 10
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  textEditor: {
    background: theme.palette.background.paper,
    minHeight: 200,
    border: `1px solid ${theme.palette.divider}`,
    padding: '0 10px',
    color: theme.palette.text.primary
  },
  toolbarEditor: {
    background: theme.palette.background.default,
    border: 'none',
    '& > div': {
      background: theme.palette.background.paper,
      '& img': {
        filter: theme.palette.type === 'dark' ? 'invert(100%)' : 'invert(0%)'
      },
      '& a': {
        color: theme.palette.text.primary,
        '& > div': {
          borderTopColor: theme.palette.text.primary,
        }
      }
    }
  },
  textPreview: {
    width: '100%',
    resize: 'none',
    height: 305,
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(0.5)
  },
  buttonUpload: {
    marginRight: theme.spacing()
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 5,
    alignItems: 'center',
  },
  signedRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 5,
    alignItems: 'center',
  },
  color: {
    width: '36px',
    height: '14px',
    borderRadius: '2px',
  },
  swatch: {
    padding: '5px',
    marginLeft: 20,
    background: '#fff',
    borderRadius: 4,
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    cursor: 'pointer',
  },
  popover: {
    position: 'absolute',
    zIndex: '2',
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  publicLoader: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#ffffff',
    position: 'absolute',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  packageContainter: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 25
  },
  package: { width: 220 },
  packageHeader: {
    color: 'white', padding: 5,
  },
  packageContent: {
    backgroundColor: '#F1F1F1',
    paddingTop: 5,
    paddingBottom: 20,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  textIcon: { marginRight: 10 },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  nonCenteredRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  packageBullets: { marginTop: 20, marginLeft: 5 },
  bulletText: { margin: 8 }
});

export default styles;
