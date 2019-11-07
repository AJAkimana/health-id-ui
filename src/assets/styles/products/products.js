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
    marginLeft: '10px',
  },
  iconButtonActive: {
    backgroundColor: '#E3E3E3',
    marginLeft: '10px',
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
  menuLink: {
    textDecoration: 'none',
    color: '#424242'
  },
  popper: {
    zIndex: '500'
  },
  exportSVG: {
    height: '0.8em',
  },
  switchFormGroup: {
    marginLeft: '10px',
  }
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
    marginTop: '1.1em',
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 180,
    borderRadius: 10
  },
  dividerDiv: {
    backgroundColor: '#E4E4E4',
    height: 'auto'
  },
  productNameStyles: {
    width: '100%',
    position: 'relative'
  },
  productName: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'rgba(60, 57, 57, 0.87)'
  },
  titleLine: {
    width: '110%',
    marginLeft: '-2.4rem',
    backgroundColor: '#E4E4E4',
    height: '2px',
    border: '0px',
    marginTop: '-0.5rem',
  },
  dividerHeaders: {
    marginLeft: '50px',
    verticalAlign: 'center'
  },
  tagChip: {
    margin: theme.spacing.unit / 4,
    marginTop: '15px',
    borderRadius: '7px',
    background: '#424242',
    color: 'white',
    marginBottom: '45px'
  },
  containerGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '0em 2.4em'
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
    marginRight: -14
  },
  approveButton: {
    backgroundColor: '#424242',
    color: 'white',
    borderRadius: '10px',
    padding: '5px 43px'
  },
  editButton: {
    marginRight: '20px',
    backgroundColor: '#267EF8',
    color: 'white',
    borderRadius: '10px',
    padding: '5px 50px'
  },
});

export default ProductsStyles;
