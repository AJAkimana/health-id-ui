const supplyStyles = {
  checkImage: {
    width: '24px',
    marginLeft: '2px'
  },
  starStyle: {
    width: '24px',
    color: '#f5f141'
  },
  emptyStar: {
    width: '24px',
    color: '#e6e6de'
  },
  noteStyle: {
    color: '#ababa2'
  },
  titleFont: {
    fontSize: '12px !important'
  },
  tableRow: {
    cursor: 'pointer'
  },
  Links: {
    color: '#424242 !important',
    textDecoration: 'none !important'
  },
  menuLink: {
    textDecoration: 'none',
    color: 'inherit'
  }
};

const lowerNavbarStyles = {
  gridContainer: {
    backgroundColor: '#ffffff',
    height: '70px',
    borderBottom: '1px solid #A3A3A3'

  },
  items: {
    marginLeft: '35px',
    marginTop: '25px',
    fontWeight: '500',
    textAlign: 'center'
  },
  itemActive: {
    marginLeft: '35px',
    marginTop: '25px',
    fontWeight: '700',
    backgroundColor: '#A3A3A3',
    borderBottom: '3px solid #f5f141',
    textAlign: 'center',
    cursor: 'pointer',
    paddingLeft: '15px',
    paddingRight: '15px',

  },
  typographyText: {
    justifyContent: 'flex-start',
    paddingTop: '0.8em',
    color: 'black',
    cursor: 'pointer'
  },
  switchFormGroup: {
    marginLeft: '10px',
  }
};

const styledFooter = {
  icons: {
    width: '18px',
    color: 'rgb(255,255,255)',
    margin: '-4px 5px',
    padding: '0 0 1px 0',
  },
  item1: {
    margin: '0 auto',
    padding: '10px 0',
    fontWeight: '700',
    textAlign: 'center',
    color: '#fff'
  },
  item2: {
    margin: '0 auto',
    padding: '10px 0',
    fontWeight: '700',
    textAlign: 'center',
    borderLeft: '2px solid #fff',
    borderRight: '2px solid #fff',
    color: '#fff'
  },
  item3: {
    margin: '0 auto',
    padding: '10px 0',
    fontWeight: '700',
    textAlign: 'center',
    color: '#fff'
  },
  naira: {
    fontSize: '12px'
  }
};
const supplierNoteStyle = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '150px',
    width: '80%',
    fontFamily: 'Avenir'
  },
  modalContent: {
    outline: 'none',
  },
  modalTitle: {
    display: 'flex',
    borderBottom: '1px solid #A3A3A3',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '20px',
    paddingRight: '5px'
  },
  titleStyle: {
    fontWeight: '700'
  },
  modalBody: {
    display: 'flex',
    alignItems: 'center',
    height: '100px',
    width: '100%',
    paddingTop: '60px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '70px',
    fontSize: '8px'
  },
  noteBody: {
    padding: '20px',
    fontWeight: '300',
    fontSize: '15px'
  },
  noteFooter: {
    padding: '20px',
    fontWeight: '200',
    fontSize: '12px',
    display: 'flex'
  },
  footerCaption: {
    marginRight: '20px',
    fontWeight: '200',
    fontSize: '12px'
  },
  footerUser: {
    fontWeight: '400',
    fontSize: '12px'

  },
  popperSection: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '2rem',
  },
  deletePopper: {
    zIndex: '3000',
  },
  deletePopperInner: {
    padding: '1.5rem',
  },
  deletePopperButtonsBox: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem 0 0 0',
  },
  deletePopperButton: {
    marginRight: '1.5rem',
  },
};

export {
  supplyStyles, lowerNavbarStyles, styledFooter, supplierNoteStyle
};
