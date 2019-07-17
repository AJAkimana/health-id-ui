export const salesHistoryStyles = theme => ({
  paper: {
    width: '95%',
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
    marginTop: 0,
    marginBottom: theme.spacing.unit * 6,
    paddingTop: '0.5em',
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: '95%',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingTop: '0.5em',
    }
  },
  headerGrid: {
    marginLeft: '1.3em',
  }
});

export const SalesToolBarStyles = {
  toolbarWrapper: {
    padding: '1.5em',
    paddingTop: 0,
    paddingBottom: '0.5em',
  },
  paper: {
    backgroundColor: '#FFFFFF',
    paddingRight: '15px',
  },
  iconButton: {
    marginLeft: '1.5em',
    marginRight: '1.5em',
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
  popper: {
    zIndex: '500'
  },
  savePrintPaper: {
    width: '30em',
    padding: '1.5em',
    paddingRight: 0
  },
  printButton: {
    width: '4em',
    textAlign: 'center'
  },
  saveButton: {
    padding: '27px',
    paddingTop: '37px',
    marginLeft: '2em'
  },
  saveButtonImg: {
    width: '3em',
    height: '2.4em'
  },
  savePrintTypo: {
    textAlign: 'center'
  },
  exportSVG: {
    height: '0.8em',
  },
  timeTypo: {
    float: 'left',
    paddingTop: '5px'
  },
  timeSlider: {
    padding: '10px',
    paddingRight: '8px',
    paddingLeft: '14px',
    maxWidth: '82%'
  },
  innerSlider: {
    paddingLeft: '2.2em',
  },
  timeGrid: {
    padding: '1.5em',
    paddingRight: 0,
    paddingTop: '1em',
  },
  textField: {
    width: '30em',
    marginTop: 0,
    marginBottom: 0,
  },
  typo: {
    marginTop: '0.8em',
    marginRight: '0.8em',
  },
  searchPaper: {
    width: '30em',
    paddingRight: '20px',
  },
  FormControl: {
    width: '100%',
    marginTop: '1em',
    marginBottom: '1em',
  },
  calendar: {
    width: '20em'
  }
};

export const toolbarButton = {
  resetButton: {
    textTransform: 'capitalize',
    color: '#424242',
    maxHeight: '40px',
    paddingTop: '1px',
    paddingBottom: '1px',
    marginTop: '0.59em',
  },
  resetIcon: {
    padding: '4px',
    paddingLeft: 0,
    cursor: 'pointer',
    color: '#424242',
    marginBottom: '3px',
  },
  buttonsTypo: {
    fontWeight: 'bold',
  },
};

export const dateTimeStyles = {
  sliderFabStart: {
    height: '25px',
    width: '3.7em',
    marginTop: '3px',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    background: 'linear-gradient(#FAF33E, #7D7A1F)'
  },
  sliderFabEnd: {
    height: '25px',
    width: '3.7em',
    marginTop: '3px',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    background: 'linear-gradient(#FAF33E, #7D7A1F)'
  },
  buttonsGrid: {
    paddingTop: '1em',
    justifyContent: 'flex-end'
  },
  mainButtons: {
    borderRadius: '10px',
    minWidth: '84px',
    marginLeft: '20px'
  }
};

export const HeaderStyles = () => ({
  headerWrapper: {
    top: '0px',
    left: '0px',
    color: '#393939',
    position: 'sticky',
    fontWeight: '800',
    backgroundColor: '#E3E3E3'
  }
});

export const HeaderRowStyles = ({
  row: {
    height: '2.5em'
  }
});
