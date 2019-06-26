export const ProductsStyles = {
  div: {
    backgroundColor: 'white',
    minHeight: '100vh',
    position: 'relative',
  },
};


export const AfterSelectToolBarStyles = {
  iconButton: {
    marginRight: '24px',
    top: '50%',
    display: 'inline-block',
    position: 'relative',
    transform: 'translateY(-50%)',
  },
  icon: {
    color: '#000',
  },
  inverseIcon: {
    transform: 'rotate(90deg)',
  },
};


export const ToolBarStyles = {
  iconButton: {
  },
  manageButton: {
    backgroundColor: '#3A3A3A',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '12px',
    border: 'none',
    marginLeft: '10px',
    cursor: 'pointer',
  },
  popper: {
    zIndex: '500'
  },
  exportSVG: {
    height: '0.8em',
  },
};

export const approveProductsStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 6,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: '65%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  category: {
    marginBottom: '2em'
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 280,
  },
  dividerDiv: {
    backgroundColor: '#E4E4E4',
    height: 'auto'
  },
  dividerHeaders: {
    marginLeft: '50px',
    verticalAlign: 'center'
  },
  tagChip: {
    margin: theme.spacing.unit / 4,
    backgroundColor: '#424242',
    color: 'white',
    borderRadius: '5px',
    padding: '0px',
    height: '20px'
  },
  containerGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '1em 2.4em'
  },
  arrowButtonGrid: {
    position: 'relative',
    textAlign: 'center',
    marginTop: '1em',
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: '72%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  buttonGrid: {
    position: 'absolute',
    right: '4em',
  },
  approveButton: {
    backgroundColor: '#424242',
    color: 'white',
    borderRadius: '20px',
    padding: '5px 43px'
  },
  editButton: {
    marginRight: '20px',
    backgroundColor: '#267EF8',
    color: 'white',
    borderRadius: '20px',
    padding: '5px 50px'
  },
});

export default ProductsStyles;
