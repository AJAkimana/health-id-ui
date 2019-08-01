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

export const MainProfileStyles = {
  container: {
    padding: '1rem 0',
  },
  backBox: {
    textAlign: 'center',
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
  },
  paper: {
    width: '100%',
    paddingBottom: '2rem',
  },
  formTitle: {
    textAlign: 'center',
    padding: '1rem 0',
  },
  formRow: {
    padding: '0 2rem',
  },
  mlAuto: {
    marginLeft: 'auto',
  },
  profileForm: {
    margin: '0 auto',
  },
  textField: {
    margin: '1rem 0 !important',

    '& *::before, & *::after': {
      borderBottom: 'none !important',
    },

    '& input:disabled': {
      color: 'rgb(84, 84, 84) !important'
    },

    '& label': {
      fontSize: '1.2rem !important'
    }
  },
  profileBox: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '1.5rem',
  },
  link: {
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLink: {
    textDecoration: 'none',
  },
  button: {
    textDecoration: 'none',
    color: 'currentColor',
  },
  avatarIconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 2rem',
  },
  avatarIcon: {
    width: '12rem',
    height: '12rem'
  },
  flex: {
    display: 'flex',
  },
  contentHeader: {
    padding: '0.5rem 2rem',
    backgroundColor: '#E8E8E8',
  },
  passwordBox: {
    margin: '0 auto',
    padding: '1.5rem',
  },
};


export const MainBusinessSetUpStyles = {
  container: {
    padding: '1rem 0',
  },
  textField: {
    marginBottom: '20px',
  },
  linkGrid: {
    marginBottom: '50px',
    marginTop: '20px',
  },
  linkcolor: {
    color: '#424242',
    marginBottom: '20px',
  },
  formBox: {
    margin: '2rem auto',
  },
  formTitle: {
    textAlign: 'center',
    padding: '1rem 0',
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
  },
  profileBox: {
    display: 'flex',
    padding: '1rem 2rem',
  },
  backBox: {
    textAlign: 'center',
  },
  link: {
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentHeader: {
    padding: '1rem',
    textAlign: 'center',
    borderBottom: 'solid 1px #E8E8E8',
  },
  subContentHeader: {
    padding: '0.5rem 2rem',
    backgroundColor: '#A3A3A3',
  },
  loaderText: {
    padding: '1rem',
    textAlign: 'center',
  }
};

export const MainInvitedUsersStyles = {
  category: {
    paddingBottom: '2rem',
  }
};

export const MainOutletSetupStyles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
  },
  link: {
    textDecoration: 'none',
  },
  optionsLink: {
    width: '25px',
    height: '25px',
    color: 'currentColor',
  },
  backArrowBox: {
    textAlign: 'center',
  },
  backArrow: {
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTitle: {
    textAlign: 'center',
    padding: '0.5rem 0',
  },
  tableBox: {
    margin: '0 auto',
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
  },
  outletTypeTitle: {
    padding: '1rem',
    backgroundColor: '#A3A3A3',
  },
  outletType: {
    margin: '0 auto',
  }
};

export const SetupHeader = {
  container: {
    padding: '1rem 0',
  },
  backBox: {
    textAlign: 'center',
  },
  backButton: {
    borderRadius: '50%',
  },
  link: {
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'currentColor',
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
  },
  formTitle: {
    textAlign: 'center',
    padding: '1rem 0',
  },
};

export const MainSetupStyles = {
  container: {
    margin: '0 auto',
  },
  option: {
    textDecoration: 'none',
    color: 'currentColor',
  },
  paper: {
    width: '100%',
    marginTop: '4rem',
  },
  usernameBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem 1rem 4rem',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px',
  },
  usernameDetailsBox: {
    display: 'flex'
  },
  usernameDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '1rem',
  },
  navsBox: {
    padding: '2rem 0',
  },
  navs: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1.5rem 4rem',

    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.05)',
    }
  },
  link: {
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'currentColor',
  },
  backButton: {
    borderRadius: '50% !important',
  },
};

export const MainPreferencesStyles = {
  container: {
    padding: '1rem 0',
  },
  formContainer: {
    alignItems: 'center',
    marginBottom: '1rem',
  },
  formRow: {
    display: 'flex',
    alignItems: 'center',
  },
  textFieldBox: {
    display: 'flex',
    alignItems: 'center',
  },
  textFieldTitle: {
    marginLeft: '1rem',
  },
  backBox: {
    textAlign: 'center',
  },
  backButton: {
    borderRadius: '50%',
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
  },
  link: {
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'currentColor',
  },
  button: {
    textDecoration: 'none',
    color: 'currentColor',
  },
  section: {
    marginBottom: '1.5rem',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.5rem',
    textTransform: 'uppercase',
  },
  sectionContent: {
    padding: '0 1.5rem 2rem 1.5rem',
  },
  selectBox: {
    padding: '0 2rem',
  },
  paperTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '0',
    padding: '1rem',
    backgroundColor: '#E8E8E8',
  },
  table: {
    marginTop: '1rem',
  },
  tableBox: {
    maxHeight: '18rem',
    overflow: 'scroll',
  },
  description: {
    padding: '1rem',
    color: '#A3A3A3',
  },
  lock: {
    width: '14px',
    height: '14px',
    marginLeft: '0.5rem',
    fontSize: '1rem',
  },
  paymentButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  vat: {
    padding: '4px 0',
  }
};

export const selectFieldStyles = {
  root: {
    flexGrow: 1
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  noOptionsMessage: {
    padding: '10px',
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 100000,
    marginTop: '10px',
    left: 0,
    right: 0,
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

export const AddUserStyles = {
  paper: {
    marginBottom: '15px',
    paddingLeft: '30px',
    backgroundColor: '#F5F5F5',
  },
  delete: {
    justifyContent: 'space-between',
    padding: '5px 8px',
    cursor: 'pointer',
    width: '40px',
    color: 'white',
    backgroundColor: 'red',
  },
  edit: {
    justifyContent: 'space-between',
    backgroundColor: '#1C7CFF',
    padding: '5px 8px',
    cursor: 'pointer',
    width: '40px',
  },
  autorenew: {
    justifyContent: 'space-between',
    padding: '5px 8px',
    cursor: 'pointer',
    width: '40px',
    color: 'white',
    backgroundColor: '#44C382',
  },
  underline: {
    textDecoration: 'underline',
  },
  addGrid: {
    cursor: 'pointer',
    marginLeft: '80%',
    marginBottom: '12px',
  },
  controls: {
    display: 'inline-block'
  },
  form: {
    width: '80%',
    margin: 'auto',
  },
  textFields: {
    marginBottom: '20px',
  }
};
