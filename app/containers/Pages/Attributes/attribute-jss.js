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
    marginBottom: 50
  },
  addBtn: {
    position: 'fixed',
    bottom: 30,
    right: 50,
    zIndex: 100,
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default styles;
