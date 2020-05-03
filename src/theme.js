import { createMuiTheme } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    primary: { main: '#FFC0CB' },
  },
  typography: {
    fontFamily: ['Raleway', 'sans-serif'].join(','),
  },
});
