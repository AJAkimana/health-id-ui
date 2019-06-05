const profileStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 6,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: '65%',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  dividerDiv: {
    backgroundColor: '#E4E4E4',
    height: 'auto'
  },
  dividerHeaders: {
    marginLeft: '50px',
    verticalAlign: 'center'
  },
  textGrids: {
    marginLeft: '-75px',
    marginBottom: '20px',
  },
  newTextFields: {
    marginBottom: '20px',
  },
  lastTextFields: {
    marginBottom: '45px',
    marginLeft: '-75px',
  },
  birthdayTextField: {
    marginBottom: '45px',
  },
  profileGrid: {
    marginLeft: '40px',
  },
  finalScreenPaper: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      marginTop: theme.spacing.unit * 12,
      width: '69%',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: theme.spacing.unit * 2,
    },
    backgroundColor: '#E4E4E4',
  },
  containerGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '1em 2.4em'
  },
  childGrids: {
    padding: '1 2em'
  },
  profilePhotoDiv: {
    textAlign: 'center'
  },
  profilePhotoDiv2: {
    textAlign: 'center',
    marginTop: '3em'
  },
  profilePhotoContainer: {
    background: '#A3A3A3',
    margin: 'auto',
    paddingTop: '10px',
    width: '100px',
    height: '100px',
    borderRadius: '100%',
  },
  profilePhotoContainer2: {
    background: '#A3A3A3',
    margin: 'auto',
    width: '100',
    maxWidth: 100,
    height: '100',
    maxHeight: 100,
    borderRadius: '100%'
  },
  profileHeader: {
    width: 'auto',
    opacity: '0.5'
  },
  chooseFileButton: {
    width: '150px',
    fontSize: '12px',
    marginLeft: '9px',
    borderRadius: '7em'
  },
  businessGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '1em 1.4em'
  },
  assignedOutletsGrid: {
    textAlign: 'center',
    marginTop: '0',
    margin: 'auto',
  },
  assignedOutletsHeader: {
    marginBottom: '10px',
    marginTop: '-10px',
    opacity: '0.5'
  },
  chips: {
    padding: '0.3em',
    margin: '0.6em',
    border: '2px solid #424242',
    width: '150px'
  },
  changePasswordGrid: {
    width: '100%',
    marginLeft: '0em',
    padding: '1em 1.4em'
  },
  changePasswordChildGrids: {
    padding: '0 2em',
    marginBottom: '2em'
  },
  arrowButtonGrid: {
    textAlign: 'center',
    marginTop: '1em'
  },
  arrowButtonDiv: {
    marginLeft: '14em'
  },
  arrowIcon: {
    fontSize: 30,
    direction: 'row'
  },
  arrowButtonLabel: {
    marginLeft: '1em'
  },
  loaderDiv: {
    textAlign: 'right'
  },
  skipButton: {
    borderRadius: '7em',
    marginBottom: '50',
    width: '150px',
    backgroundColor: '#FAF33E',
    margin: '0.6em',
  },
  doneButton: {
    borderRadius: '7em',
    marginBottom: '50',
    width: '150px',
    margin: '0.6em',
  },
  manageProfileDiv: {
    textAlign: 'right',
    marginTop: '2em',
    marginBottom: '1.2em',
    marginRight: '19em'
  },
  manageProfileButton: {
    width: 'auto',
    maxWidth: '150px',
    fontSize: '12px',
    borderRadius: '7em',
    backgroundColor: '#424242',
    color: 'white'
  },
});

export default profileStyles;
