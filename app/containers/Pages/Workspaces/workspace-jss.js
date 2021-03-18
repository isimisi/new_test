const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paperGlass: {
    backgroundColor: theme.glass.backgroundColor,
    borderRadius: theme.rounded.medium,
    boxShadow: theme.glass.shadow,
    border: theme.glass.border,
  }
});

export default styles;
