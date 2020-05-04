import { createMuiTheme } from '@material-ui/core/styles';

// This defines the default styles for Material-UI
export default createMuiTheme({
  palette: {
    primary: { main: '#FFC0CB' },
  },
  typography: {
    fontFamily: ['Raleway', 'sans-serif'].join(','),
  },
});
