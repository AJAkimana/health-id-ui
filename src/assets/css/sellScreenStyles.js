import red from '@material-ui/core/colors/red';

export const addedItems = {
  root: {
    marginLeft: '80px',
    marginRight: '80px',
    backgroundColor: '#424242',
  },
  container: {
    margin: '20px'
  },
  cartWrapper: {
    paddingRight: '2em',
    paddingLeft: '2em'
  },
  productsWrapper: {
    paddingLeft: '2em'
  },
  paper: {
    width: '100%',
    backgroundColor: '#424242',
  },
  tablePaper: {
    width: '100%',
    backgroundColor: '#424242',
    height: '13em',
    minHeight: '13em',
    overflow: 'auto',
  },
  buttonsGrid: {
    margin: '3px',
    justifyContent: 'space-between'
  },
  buttons: {
    textTransform: 'capitalize',
    color: '#424242',
  },
  buttonsIcons: {
    padding: '4px',
    cursor: 'pointer',
    color: '#424242',
    marginRight: '3px',
  },
  buttonsTypo: {
    fontWeight: 'bold',
  },
  box: {
    borderColor: '#d8d8d8',
    padding: '1px',
    width: '100%',
  },
  inputRoot: {
    backgroundColor: '#666666',
    color: 'white',
    width: '100%',
    padding: 5,
    paddingLeft: 4,
    paddingRight: 4,
    border: 8,
    borderColor: '#424242'
  },
  inputInput: {
    paddingTop: 10,
    paddingRight: 2,
    paddingBottom: 2,
    paddingLeft: 1,
    width: '100%',
  },
  adornment: {
    color: '#999999',
    fontSize: '1em',
    marginBottom: '4px'
  },
  singleCustomerList: {
    paddingTop: 0,
    paddingBottom: '2px',
  },
  listItemText: {
    paddingLeft: '5px',
  },
  listItemTrashIcon: {
    marginRight: '15px',
    fontSize: '16px',
    color: '#cccccc',
    cursor: 'pointer'
  },
  textField: {
    margin: 0
  },
  buyingFor: {
    marginTop: '0.5em',
    marginBottom: '1em',

  },
  buyingForTypo: {
    color: '#d8d8d8',
  },
  radio: {
    padding: 0
  },
  radioLable: {
    color: '#d8d8d8',
    paddingTop: 0,
    paddingLeft: '5px'
  }
};

export const tableStyles = {
  table: {
    minWidth: 200,
  },
  tableHeader: {
    fontWeight: 600,
    fontSize: '12px',
    padding: '5px',
    paddingLeft: '15px',
    color: 'white',
    borderBottom: 0,
  },
  headerRow: {
    height: '40px',
    backgroundColor: '#666666',
  },
  batchRow: {
    height: '45px',
    borderBottom: '1px solid #666666',
  },
  typoCell: {
    color: 'white',
    padding: '2px',
    paddingLeft: '15px',
    borderBottom: 0,
  },
  tableCell: {
    color: '#e8e8e8',
    padding: '2px',
    paddingRight: '10px',
    borderBottom: 0,
  },
  currency: {
    color: '#e8e8e8',
    padding: '2px',
    paddingRight: '1px',
    borderBottom: 0,
  },
  tableTypo: {
    color: '#e8e8e8',
    textTransform: 'capitalize',
  },
  tableTypoCaption: {
    color: '#c6c6c6',
    textTransform: 'capitalize',
  },
  icons: {
    color: 'white',
    padding: '4px',
    cursor: 'pointer',
  },
  addIcon: {
    padding: 0,
    fontSize: '20px',
    marginTop: '2px',
  },
  iconsCell: {
    display: 'inline-flex',
    paddingLeft: '10px',
  },
  paperIcon: {
    justifyContent: 'space-between',
    backgroundColor: '#424242',
    maxWidth: '20px',
    cursor: 'pointer',
  },
  paperQuantity: {
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '40px',
    height: '30px',
    cursor: 'pointer',
  },
  paperInput: {
    justifyContent: 'center',
    backgroundColor: 'white',
    maxWidth: '35px',
    height: '25px',
    paddingLeft: '5px',
  },
  totals: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1em',
    marginBottom: 0,
  },
  discountWrapper: {
    display: 'flex',
    margin: '17px',
    marginTop: 0,
    marginBottom: '5px',
  },
  discount: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  discountNum: {
    color: 'white',
    padding: '2px',
    fontSize: '13px',
  },
  discountTypo: {
    color: '#5773ed',
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: '2px',
    fontSize: '13px',
  },
  discountTotal: {
    color: 'white',
    padding: '2px',
    fontSize: '13px',
  },
  payButton: {
    justifyContent: 'space-between'
  },
  buttonLabel: {
    fontSize: '25px',
  },
};

export const tableQuantityStyles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconsGrid: {
    paddingLeft: '2px',
  },
  icon: {
    margin: 0,
    fontSize: '20px',
    color: '#707070',
    cursor: 'pointer',
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
  iconsCell: {
    display: 'inline-flex',
    paddingLeft: '10px',
  },
  paperQuantity: {
    marginTop: '5px',
    justifyContent: 'center',
    backgroundColor: '#707070',
    width: '40px',
    height: '30px',
    cursor: 'pointer',
  },
  paperInput: {
    marginTop: '5px',
    justifyContent: 'center',
    backgroundColor: '#707070',
    width: '40px',
    height: '30px',
    paddingLeft: '5px',
    color: 'white',
  },
  paperIcon: {
    justifyContent: 'space-between',
    backgroundColor: '#424242',
    maxWidth: '20px',
  },

});

export const addCustomerDialog = {

  buttonWrapper: {
    paddingRight: '12px'
  },
  cancelButton: {
    width: '120px',
    margin: '0.6em',
  },
  addButton: {
    width: '120px',
    margin: '0.6em',
  },
  cartAddButton: {
    marginLeft: '5px',
  },
  productAvatar: {
    margin: 10,
    width: 80,
    height: 80,
  },
  listedHeldItems: {
    height: '80px'
  },
  dialogTitle: {
    backgroundColor: '#FAF33E',
    paddingBottom: 0,
    paddingTop: '5px'
  },
  dialogContent: {
    padding: 0,
  },
  dialogContentGrid: {
    paddingBottom: 0,
  },
  phoneInput: {
    marginTop: '2px',
    marginBottom: '4px',
  },
  phoneInputLabel: {
    color: '#898989'
  },
  phoneInputHelper: {
    color: '#ff0000'
  },
  dialogContentGridTop: {
    paddingTop: 0,
  },
  holdSaleGridTop: {
    paddingTop: '12px',
  },
  holdSaleGridRight: {
    paddingRight: '12px',
  },
  GridPaddingRight: {
    paddingRight: 0,
  },
  list: {
    paddingTop: 0,
  },
  retrieveIcon: {
    marginRight: '10px',
    color: '#878205',
  },
  cautionIcon: {
    fontSize: '3em'
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center'
  }
};

export const addDiscountPopper = {
  paper: {
    marginRight: '15px',
    backgroundColor: '#ededed',
    width: '20em',
    maxWidth: '20em'
  },
  gridWrapper: {
    padding: '15px',
  },
  textField: {
    marginLeft: '10px',
    marginRight: '8px',
  },
  addDiscountButton: {
    padding: '14px',
    paddingLeft: '18px',
    paddingRight: '18px'
  },
  addDiscountButtonWrapper: {
    marginTop: '17px',
  },
  buttonWrapper: {
    justifyContent: 'right'
  },
  cartAddButton: {
    marginLeft: '5px',
  },
  backButton: {
  },
  typo: {
    marginLeft: '10px',
    color: '#878205'
  },
  noteTypo: {
    color: '#878205'
  },
  rootGrid: {
    padding: '15px',
    paddingTop: '5px',
    paddingBottom: '5px'
  }
};

export const addCustomerPopper = {
  rootPaper: {
    marginTop: '5px',
    backgroundColor: '#ededed',
    width: '29.25em',
    maxWidth: '29.25em'
  },
  zeroBottomPadding: {
    paddingBottom: 0
  },
  listedCustomers: {
    paddingBottom: 0,
    maxHeight: '18em',
    overflow: 'auto',
  },
  addCircleIcon: {
    marginRight: '4px',
    marginTop: '3px',
    fontSize: '15px',
    color: '#878205'
  },
  typoWrapper: {
    padding: '10px',
    textAlign: 'center'
  },
  typo: {
    color: '#878205',
    cursor: 'pointer'
  }
};
