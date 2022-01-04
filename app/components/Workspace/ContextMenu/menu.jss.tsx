import { makeStyles } from '@material-ui/core/styles';
import { MyTheme } from '../../../types/styling';

const useStyles = makeStyles((theme: MyTheme) => ({
  menuContainer: {
    width: 250,
    position: 'absolute',
    zIndex: 9999
  },
  editName: {
    maxWidth: 90,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.primary.main
  },
  loadingConatiner: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex'
  }
}));

export default useStyles;
