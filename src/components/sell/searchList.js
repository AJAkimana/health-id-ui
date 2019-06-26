import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import searchListStyles from '../../assets/css/searchListStyles';
import FormatCurrency from '../utils/formatCurrency';


const SearchList = ({ product, currency, handleClickToAddProduct }) => {
  const { image, productName, salesPrice } = product;

  return (
    <List component="nav" style={searchListStyles.listItem}>
      <ListItem
        id={productName}
        button
        onClick={() => handleClickToAddProduct(product)}
      >
        <ListItemIcon>
          <IconButton id={productName}>
            <Add style={searchListStyles.addIcon} />
          </IconButton>
        </ListItemIcon>
        <ListItemIcon>
          <img src={image} alt="" style={searchListStyles.productImg} />
        </ListItemIcon>
        <ListItemText primary={productName} />
        <ListItemText
          primary={(
            <FormatCurrency
              amount={salesPrice}
              currency={currency}
            />
          )}
          style={searchListStyles.priceText}
        />
      </ListItem>
    </List>
  );
};

SearchList.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  handleClickToAddProduct: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
};

export default SearchList;
