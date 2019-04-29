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
    height: '30',
    bottom: '0'
  },
};

export const FileUploadStyles = {
  image: {
    width: '144px',
    height: '82px',
  },
  previewImage: {
    width: 'auto',
    height: '97.3%',
    opacity: '1',
  },
  root: {
    textAlign: 'center',
    fontFamily: 'Avenir',
    fontSize: '20px',
    color: 'grey',
    opacity: '1',
    height: '100%',
    hover: 'cursor'
  },
  decor: {
    textDecoration: 'underline',
    fontSize: '18px',
  }
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
  emptyDiv: {
    width: 'auto'
  }
};

export const loaderStyles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    color: '#424242',
  },
});
