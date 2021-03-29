const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifycontent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 50
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
  lottie: {
    height: '50%',
    width: '50%',
    alignSelf: 'center'
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default styles;
