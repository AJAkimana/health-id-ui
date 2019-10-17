export const SupplierFormStyles = {
  paperForm: {
    marginLeft: '15%',
    width: '70%',
    height: '100%'
  },
  gridContainer: {
    marginLeft: '5%',
    width: '90%',
    marginBottom: '2%'
  },
  textAreaLabel: {
    color: '#A3A3A3',
    fontSize: '16px',
    marginBottom: '1%'
  },
  textArea: {
    maxWidth: '97%',
    border: '1px solid rgb(107, 107, 107)',
    resize: 'none',
    outline: 'none',
    fontSize: '16px',
    fontWeight: 'lighter'
  },
  childGrid: {
    marginTop: '2%'
  },
  tierField: {
    marginTop: '2%',
    paddingLeft: '2%'
  },
  commentaryField: {
    marginTop: '2%',
    paddingRight: '2%'
  },
  lineGrid: {
    marginTop: '1%'
  },
  paymentGrid: {
    marginTop: '4%'
  },
  selectLabel: {
    marginBottom: '3%'
  },
  uploadGrid: {
    marginTop: '2%',
    marginLeft: '10%'
  },
  buttonGrid: {
    marginTop: '3%',
    marginBottom: '3%'
  },
  descriptionField: {
    marginTop: '9%'
  },
  radioButton: {
    marginTop: '2%',
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
};

export const ActionButtonStyles = {
  addButton: {
    borderRadius: '20px',
    border: '1px solid',
    width: '38%',
    margin: 'auto 1%'
  },
  doneButton: {
    borderRadius: '20px',
    width: '58%',
    margin: 'auto 1%'
  }
};

export const ImageUploadStyles = {
  container: {
    width: '100%',
    height: '230px',
    border: '1px solid #ccc'
  },
  uploadDiv: {
    margin: 'auto',
    width: '120px',
    height: '110px'
  },
  imgPlaceholder: {
    marginTop: '10%',
    marginLeft: '10%',
    width: '80%',
    height: '60%'
  },
  uploadedImg: {
    marginTop: '30%',
    width: '100%',
    height: '100%',
    borderRadius: '50%'
  },
  button: {
    borderRadius: '25px',
    color: '#939393',
    marginLeft: '32%',
    border: '1px solid #939393',
    textTransform: 'inherit',
    width: '35%',
    padding: '2px',
    marginBottom: '10%',
    marginTop: '15%',
    background: '#fff'
  },
  label: {
    marginBottom: '3%',
    fontWeight: 'lighter',
    color: '#939393',
    textAlign: 'center',
    fontSize: '16px'
  }
};

export const BackActionStyles = {
  topDiv: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '12%',
    marginTop: '2%',
    marginBottom: '2%'
  },
  backIcon: {
    marginTop: '28%',
    color: '#424242'
  },
  header: {
    color: '#424242'
  }
};

export const SearchSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? '#E4E4E4' : '#FFFFFF',
    color: '#000',
    padding: 7
  }),
  control: (provided, state) => ({
    width: '90%',
    borderBottom: state.isFocused ? '2px solid #ada61f' : '1px solid #939393',
    padding: 0,
    marginTop: '4%',
    color: 'currentColor',
    display: 'inline-flex'
  })
};
