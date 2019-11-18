const productCardStyles = {
  card: {
    display: 'grid',
    position: 'relative',
    gridTemplateRows: '5rem 2fr 1fr',
    gridTemplateColumns: '1',
    width: '100%',
    height: '12rem',
    paddingTop: '0.5em',
    paddingLeft: '1em',
    paddingRight: '1em',
    fontSize: 15,
  },
  media: {
    width: '65px',
    height: '65px',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  cardContent: {
    fontSize: 10,
  },
  productName: {
    textTransform: 'capitalize',
    fontSize: '12px',
    textWrap: 'no-wrap',
  },
  quantityInStock: {
    textTransform: 'capitalize',
    fontStyle: 'oblique',
    color: 'gray',
    paddingBottom: '1em'
  },
  productCategory: {
    textTransform: 'capitalize',
    fontWeight: 'lighter'
  },
  productPrice: {
    textTransform: 'capitalize',
    marginTop: '0.5em'
  },
  addIcon: {
    cursor: 'pointer'
  },
  content1: {
    paddingLeft: '0.1em',
    paddingRight: '0.1em',
    paddingBottom: '0.1em',
    paddingTop: '0.5em',
  },
  content2: {
    padding: '0.1em'
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '2rem',
  },
  cardAction: {
    padding: '0.2em'
  },
  iconButton: {
    fontSize: '0.8em',
    padding: '0.2em'
  }
};
export const addNewCategories = {
  rootPaper: {
    marginTop: '5px',
    backgroundColor: '#ededed',
    width: '19.5em',
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

export default productCardStyles;
