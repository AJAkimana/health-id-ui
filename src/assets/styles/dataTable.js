// override for datatables
import { createMuiTheme } from '@material-ui/core/styles';

const DataTableOverride = createMuiTheme({
  palette: {
    primary: {
      main: '#FAF33E',
    },
    secondary: {
      main: '#A3A3A3',
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
    useNextVariants: true,
  },
  overrides: {
    MuiTableRow: {
      head: {
        height: '30px',
      },
      root: {
        cursor: 'pointer',
      }
    },
    MuiTableCell: {
      head: {
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
      }
    },
    MUIDataTableHeadCell: {
      fixedHeader: {
        backgroundColor: '#E3E3E3',
        fontWeight: '800',
        color: '#393939'
      }
    },
    MUIDataTableSelectCell: {
      headerCell: {
        backgroundColor: '#E3E3E3',
      },
      fixedHeader: {
        backgroundColor: 'white',
      }
    },
    MuiTypography: {
      h6: {
        fontSize: '1rem',
        textDecoration: 'bold'
      }
    },
    MuiSvgIcon: {
      root: {
        fill: '#757575',
      }
    }
  }
});

export default DataTableOverride;
