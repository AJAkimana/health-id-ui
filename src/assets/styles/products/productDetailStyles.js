export const productDetailStyles = theme => ({
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
  dividerHeaders: {
    marginLeft: '50px',
    verticalAlign: 'center'
  },
  newTextFields: {
    marginBottom: '5px'
  },
  descriptionFields: {
    marginBottom: '5px'
  },
  descriptionText: {
    marginTop: '1.1em',
    overflow: 'scroll',
    width: '100%',
    height: '7em',
    wordWrap: 'break-word;'
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
  tagsRoot: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  tagsHeading: {
    marginRight: '80%',
    marginBottom: '4px',
    color: '#898989'
  },
  tagChip: {
    margin: theme.spacing.unit / 4,
    marginTop: '15px',
    borderRadius: '7px',
    background: '#424242',
    color: 'white',
    marginBottom: '45px'
  },
  batchTextFields: {
    marginBottom: '5px',
  },
  containerGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '0 2.4em'
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
      marginRight: 'auto',
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
  },
  buttonMainGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '1em 1.4em'
  },
  batchRow: {
    height: '25px',
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
});

export const tableStyles = {
  batchHeader: {
    padding: 0,
    verticalAlign: 'center',
    justifyContent: 'space-between',
    height: 'auto'
  },
  tableHeader: {
    fontWeight: 900,
    fontSize: '15px',
    padding: '5px',
    border: '1px solid #cccccc',
    color: 'black'
  },
  tableFooter: {
    fontWeight: 900,
    fontSize: '15px',
    padding: '5px',
    color: 'black'
  },
  batchRow: {
    height: '25px',
    border: '1px solid #cccccc',
  },
  tableCell: {
    padding: '5px',
    border: '1px solid #cccccc',
  },
  tableCellRight: {
    padding: '5px',
    border: '1px solid #cccccc',
  },
};
