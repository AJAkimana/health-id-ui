import { fade } from '@material-ui/core/styles/colorManipulator';

const viewProductsStyles = theme => ({
  search: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '1.7em',
      marginRight: '1.7em',
      width: 'auto',
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
    },
    marginTop: '20px'
  },
  searchIcon: {
    width: theme.spacing.unit * 5,
    height: '20px',
    pointerEvents: 'none',
    color: 'gray',
  },
  iconNavWrapper: {
    height: '2.45em'
  },
  inputRoot: {
    width: '100%',
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3,
    paddingBottom: '0.2em'
  },
  paper: {
    width: '100%',
    height: '515px',
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: '100%',
      height: '515px'
    }
  },
  filteredProducts: {
    paddingTop: '0.5em',
    color: 'red',
    paddingLeft: '1.1em'
  },
  frequentProducts: {
    marginTop: '2em'
  },
  frequentProducts1: {
    color: 'gray',
    marginLeft: '1.4em',
    marginBottom: '0.5em',
    fontWeight: 'bolder',
    fontSize: 'large'
  },
  filteredProductsPaper: {
    marginLeft: '0.5em',
    marginRight: '0.5em',
    height: '420px',
    overflow: 'auto',
  },
  renderProductCardGrid: {
    margin: 0,
    paddingTop: '0.2em',
    paddingLeft: '0.8em',
    paddingRight: '0.8em',
  },
  imgDiv: {
    width: '50%',
    marginTop: '1em'
  },
  mainItemContainer: {
    paddingLeft: '3em'
  }
});

export default viewProductsStyles;
