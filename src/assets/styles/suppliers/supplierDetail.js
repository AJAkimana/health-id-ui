export const supplierDetailStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 'auto',
    backgroundColor: theme.palette.background.paper
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
      marginRight: 'auto'
    }
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: '150px',
    width: '150px',
    borderRadius: '100%',
    margin: '10% 0 0 30%'
  },
  category: {
    marginBottom: '2em'
  },
  dividerDiv: {
    backgroundColor: '#E4E4E4',
    height: 'auto'
  },
  dividerHeaders: {
    marginLeft: '50px',
    verticalAlign: 'center'
  },
  newTextFields: {
    marginBottom: '25px'
  },
  descriptionFields: {
    marginBottom: '5px'
  },
  containerGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '1em 2.4em'
  },
  tableGrid: {
    width: '955px',
    marginLeft: '0em',
    padding: '1em 4em 1em 3em'
  },
  containerGrid2: {
    width: '100%',
    marginLeft: '0em',
    padding: '1em 0.4em 1em 2em;'
  },
  addressText: {
    fontSize: '15px',
    margin: '0px',
  },
  addressTextHeader: {
    color: '#8a8a8a',
    fontSize: '13px'
  },
  textContainerGrid: {
    width: '75%',
    marginLeft: '0em',
    padding: '1em'
  },
  childGrids: {
    padding: '1 2em',
    height: '5%'
  },
  arrowButtonGrid: {
    textAlign: 'center',
    marginTop: '1em',
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 1,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: '72%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  arrowIcon: {
    fontSize: 30,
    color: '#000000',
    cursor: 'pointer'
  },
  buttonsDiv: {
    textAlign: 'right'
  },
  backButton: {
    borderRadius: '7em',
    marginBottom: '50',
    width: '150px',
    marginRight: '4%',
  },
  buttonMainGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '1em 1.4em'
  },
  buttonGrid: {
    position: 'absolute',
    right: '17%'
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

export const tableStyles = {
  header: {
    height: '42px'
  },
  logo: {
    marginRight: '20px',
    marginTop: '-8px'
  },
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '70%'
  },
  noteHeader: {
    width: '100%',
    justifyContent: 'space-between',
  },
  tableHeader: {
    fontWeight: 900,
    fontSize: '15px',
    color: 'black',
  },
  noteRow: {
    cursor: 'pointer'
  },
  cell: {
    width: '30%'
  },
  cellMiddle: {
    width: '40%'
  }
};
