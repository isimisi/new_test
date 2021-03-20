const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paperGlass: {
    backgroundColor: theme.glass.backgroundColor,
    borderRadius: theme.rounded.medium,
    boxShadow: theme.glass.shadow,
    border: theme.glass.border,
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
  input: {
    borderColor: '#0041d0'
  },
  output: {
    borderColor: '#ff0072'
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
