const stockControlStyles = {
  sortImage: {
    width: '13px',
    marginLeft: '4px'
  },
  tableHeader: {
    top: '0px',
    left: '0px',
    color: '#393939',
    zIndex: '100',
    position: 'sticky',
    fontWeight: '800',
    backgroundColor: '#E3E3E3'
  },
  iconButton: {
    marginRight: '24px',
    top: '50%',
    display: 'inline-block',
    position: 'relative',
    transform: 'translateY(-50%)'
  }
};

export const ToolbarStyles = {
  iconButtonActive: {
    marginLeft: '10px',
  },
  iconButton: {
    backgroundColor: '#E3E3E3',
    marginLeft: '10px',
  },
  svgIcon: {
    height: '0.8em'
  },
  switchFormGroupSupplier: {
    margin: '0px !important',
    paddingRight: '15px'
  },
  popper: {
    zIndex: '500'
  },
  paper: {
    zIndex: '500'
  },
  root: {
    paddingLeft: '2px',
    paddingRight: '1px'
  },
  actions: {
    margin: 'auto 1px 7px auto'
  },
  title: {
    flex: '0 0 auto'
  },
  menuLink: {
    textDecoration: 'none',
    color: '#424242'
  },
};

export const searchStyles = theme => ({
  main: {
    display: 'inline-flex',
    minWidth: '600px',
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    margin: 'auto',
    marginTop: '4px'
  },
  clearIcon: {
    '&:hover': {
      color: theme.palette.error.main
    }
  }
});

export const TableHeaderStyles = {
  headerWrapper: {
    top: ' 0px',
    left: '0px',
    color: '#393939',
    zIndex: '100',
    position: 'sticky',
    fontWeight: '800',
    backgroundColor: '#E3E3E3'
  }
};

export const TableStyles = {
  root: {
    width: '100%'
  },
  paper: {
    width: '100%'
  },
  popperWrapper: {
    width: '400px'
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto',
    height: 450
  },
  name: {
    textDecoration: 'underline',
    fontStyle: 'italic'
  }
};

export const productCardStyles = {
  card: {
    minWidth: 300,
    maxWidth: 400
  },
  icon: {
    marginRight: '1px',
    marginLeft: 'auto',
    color: 'rgb(66, 66, 66)'
  },
  chip: {
    backgroundColor: 'rgb(66, 66, 66)',
    color: 'white',
    height: '26px'
  },
  productImage: {
    height: '100px'
  },
  wrapper: {
    display: 'inline-flex'
  },
  description: {
    minWidth: '200px'
  }
};

export const ProposedProductStyles = {
  root: {
    width: '100%',
    maxWidth: 400
  },
  noProposedEdit: {
    paddingLeft: '80px',
    paddingRight: '80px'
  },
  noProposedEditWrapper: {
    height: '40px',
    position: 'relative',
    top: '10px'
  },
  listWrapper: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '0.8125rem',
    opacity: '0.5'
  },
  scrollWrapper: {
    overflowY: 'scroll',
    height: '400px'
  },
  inline: {
    display: 'inline'
  },
  iconButton: {
    display: 'inline-block',
    padding: '0px'
  },
  iconWrapper: {
    paddingLeft: '20px',
    float: 'right',
    display: '-webkit-inline-box'
  },
  divider: {
    width: '80%',
    marginLeft: '10%'
  }
};

export const SelectToolBarStyles = {
  iconButton: {
    marginLeft: '24px',
    top: '50%',
    display: 'inline-block',
    position: 'relative'
  },
  icon: {
    color: '#000'
  },
  inverseIcon: {
    transform: 'rotate(90deg)'
  },
  wrapper: {
    float: 'right'
  }
};

export const BatchCardStyles = {
  root: {
    width: '400px'
  },
  title: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '15px',
    fontWeight: '400',
    paddingLeft: '21px',
    paddingTop: '5px',
    paddingBottom: '5px'
  },
  secondaryTitle: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '15px',
    fontWeight: '400',
    paddingLeft: '21px',
    paddingTop: '5px',
    paddingBottom: '5px',
    fontStyle: 'italic',
    opacity: '0.5'
  },
  heading: {
    fontSize: '0.8125rem',
    height: '35px',
    padding: '8px'
  },
  proposedQuantity: {
    fontSize: '0.8125rem',
    paddingLeft: '8px',
    paddingTop: '8px',
    paddingRight: '3px'
  },
  quantityWrapper: {
    display: 'inline-flex'
  },
  proposedQuantityBold: {
    fontSize: '0.8125rem',
    paddingTop: '8px',
    fontWeight: 'bold'
  },
  scrollWrapper: {
    overflowY: 'scroll',
    height: '400px'
  },
  card: {
    paddingLeft: '21px'
  },
  divider: {
    marginBottom: '8px',
    marginTop: '8px'
  },
  icon: {
    marginRight: '1px',
    marginLeft: 'auto',
    marginTop: '30px',
    color: 'rgb(66, 66, 66)'
  }
};


export default stockControlStyles;
