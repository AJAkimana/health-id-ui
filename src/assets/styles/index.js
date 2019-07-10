import { createMuiTheme } from '@material-ui/core/styles';

const AppTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FAF33E',
    },
    secondary: {
      main: '#424242'
    },
    error: {
      main: '#FF4141'
    }
  },
  typography: {
    fontFamily: [
      'Avenir',
      'medium',
      'Arial',
      'sans-serif'
    ].join(','),
    useNextVariants: true
  },
});

export default AppTheme;
