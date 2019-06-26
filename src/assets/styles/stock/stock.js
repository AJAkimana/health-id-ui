import { makeStyles } from '@material-ui/styles';

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
  svg: {
    height: '0.8em'
  },
  popper: {
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
  }
};

export const searchStyles = theme => ({
  main: {
    display: 'inline-flex',
    minWidth: '600px',
  },
  searchIcon: {
    color: theme.palette.text.secondary,
  },
  clearIcon: {
    '&:hover': {
      color: theme.palette.error.main
    }
  }
});

export const TableHeaderStyles = makeStyles({
  headerWrapper: {
    top: ' 0px',
    left: '0px',
    color: '#393939',
    zIndex: '100',
    position: 'sticky',
    fontWeight: '800',
    backgroundColor: '#E3E3E3'
  }
});

export const TableStyles = {
  root: {
    width: '100%'
  },
  paper: {
    width: '100%'
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  name: {
    textDecoration: 'underline',
    fontStyle: 'italic'
  }
};

export const initializeProductCardStyles = makeStyles({
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
});

export const ProposedProductStyles = {
  root: {
    width: '100%',
    maxWidth: 360
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

export default stockControlStyles;
