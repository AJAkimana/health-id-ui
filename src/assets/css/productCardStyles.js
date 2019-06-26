const productCardStyles = {
  card: {
    width: '100%',
    paddingLeft: '1em',
    paddingRight: '0.5em',
    fontSize: 15,
  },
  media: {
    objectFit: 'fill',
  },
  cardContent: {
    fontSize: 10,
  },
  productName: {
    textTransform: 'capitalize'
  },
  productQuantity: {
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
  mediaGrid: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  cardAction: {
    padding: '0.2em'
  },
  iconButton: {
    fontSize: '0.8em',
    padding: '0.2em'
  }
};

export default productCardStyles;
