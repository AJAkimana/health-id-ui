export const FinalScreenStyle = {
  root: {
    marginLeft: '80px',
    marginRight: '80px',
    backgroundColor: '#424242',
  },
  main: {
    backgroundColor: '#FAF33E',
    padding: '1em 2em',
    textAlign: 'center',
    margin: '2em auto',
    color: '#2C3A47',
  },
  container: {
    backgroundColor: '#424242',
    padding: '1em 4em',
  },
  logo: {
    display: 'block',
    position: 'relative',
    marginTop: '-11em',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
  button: {
    marginTop: '2em',
    padding: '10px',
    fontSize: '12px',
    width: '300px',
    color: '#FAF33E',
    backgroundColor: '#424242',
  },
  productButton: {
    border: '2px solid',
    borderColor: 'white',
    color: 'gray',
    fontSize: '12px',
    margin: '10px auto',
  },
  registerButton: {
    border: '2px solid',
    borderColor: 'white',
    color: 'gray',
    fontSize: '12px',
    margin: '30px auto',
  },
  imageText: {
    fontFamily: 'Avenir',
    fontSize: '18px',
    marginTop: '3em',
  },
  modalText: {
    fontFamily: 'Avenir',
    fontSize: '15px',
    color: '#FFFFFF',
    margin: '10px auto',
  },
  modalTextBig: {
    fontFamily: 'Avenir',
    fontSize: '20px',
    color: '#FFFFFF',
    margin: '10px auto',
  },
  item: {
    textAlign: 'center',
    margin: '20px auto',
  },
  productListImage: {
    width: '136.57px',
    height: '100px',
  },
  supplierListImage: {
    width: '205.92px',
    height: '100px',
  },
  registerImage: {
    width: '149.24px',
    height: '100px',
  }
};

export const StepperStyles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: '65%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 1,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  finalScreenPaper: {
    width: 'auto',
    marginTop: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      marginTop: theme.spacing.unit * 12,
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: theme.spacing.unit * 2,
    },
    backgroundColor: '#E4E4E4',
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    backgroundColor: '#E4E4E4',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    width: '160px',
  },
  backButton: {
    border: '2px solid',
    borderRadius: '25px',
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    width: '160px',
  },
  iconContainer: {
    transform: 'scale(2)',
  }
});

export const BusinessSetUpStyles = {
  textField: {
    marginBottom: '20px',
  },
  paper: {
    height: '245px',
    opacity: '0.5',
    marginTop: '8px',
  },
};

export const FooterStyles = {
  appbar: {
    backgroundColor: '#424242',
    marginTop: 'calc(12% + 64px)',
    bottom: '0',
    position: 'relative'
  },
};

export const FileUploadStyles = {
  image: {
    width: '144px',
    height: '82px',
  },
  previewImage: {
    maxWidth: '500px',
    height: '244px',
  },
  root: {
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: '20px',
    color: 'grey',
    opacity: '1',
    height: '100%',
    hover: 'cursor',
  },
};

export const NavBarStyles = {
  appbar: {
    backgroundColor: '#424242',
  },
  logo: {
    width: '3%',
  },
  toolBar: {
    justifyContent: 'space-between'
  },
  typography: {
    color: '#FAF33E',
    fontSize: '1.8rem',
    justifyContent: 'center'
  },
};

export const loaderStyles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    color: '#424242',
  },
});

export const dialogButtonStyles = {
  backgroundColor: '#FAF33E',
  color: '#424242',
};

export const RadioGroupStyles = {
  radioGroup: {
    justifyContent: 'space-between'
  }
};

export const ContentWrapper = {
  wrapper: {
    paddingBottom: 0,
    justifyContent: 'space-between',
  },
  table: {
    paddingTop: 0
  },
  headers: {
    backgroundColor: '#e8e8e8',
    justifyContent: 'Left',
    paddingTop: '2px',
    paddingBottom: '2px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  receiptHeader: {
    marginLeft: '10px',
    marginTop: '20px',
  },
  receipts: {
    height: 140,
    width: 100,
    cursor: 'pointer'
  },
  receiptsWrapper: {
    marginRight: '15px',
  },
  receiptTemp: {
    width: '100px'
  },
  addRegisterStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer'
  },
  underline: {
    textDecoration: 'underline',
    marginTop: '2px',
    marginBottom: '2px',
  },
  button: {
    borderRadius: '25px',
    width: '160px',
    float: 'right'
  },
  loader: {
    float: 'right'
  },
  buttonStyle: {
    justifyContent: 'space-between'
  },
  bold: {
    fontSize: '15px'
  },
  datePicker: {
    width: '100%',
  },
  pickers: {
    width: '100%',
    margin: 0,
  },
};

export const OutletsTable = {
  table: {
    borderCollapse: 'separate',
    borderSpacing: '0 0.25em'
  },
  row: {
    backgroundColor: '#E4E4E4',
  },
  tableCell: {
    fontSize: 17,
  },
  iconsCell: {
    display: 'inline-flex',
  },
  paperEdit: {
    justifyContent: 'space-between',
    backgroundColor: '#1C7CFF',
    marginRight: '10px',
    padding: '5px 8px',
    cursor: 'pointer',
  },
  paperDelete: {
    justifyContent: 'space-between',
    backgroundColor: '#FF4141',
    marginRight: '10px',
    padding: '5px 8px',
    cursor: 'pointer',
  },
  icons: {
    color: '#FFFFFF',
  },
  typoNormal: {
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  typoSmall: {
    textDecoration: 'underline',
    fontSize: '12px'
  },
  capitalize: {
    textTransform: 'capitalize'
  }
};
