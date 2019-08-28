import React from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, ListItemIcon,
  ListItemText, IconButton, Tooltip,
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import FormatCurrency from '../utils/formatCurrency';
import searchListStyles from '../../assets/css/searchListStyles';

const SearchList = ({ product, currency, handleClickToAddProduct }) => {
  const {
    image, productName, salesPrice, productQuantity
  } = product;

  return (
    <List component="nav" style={searchListStyles.listItem}>

      <ListItem
        id={productName}
        button
        onClick={() => handleClickToAddProduct(product)}
      >
        <ListItemIcon>
          {
            productQuantity > 0
              ? (
                <IconButton id={productName}>
                  <Add style={searchListStyles.addIcon} />
                </IconButton>
              )
              : (
                <Tooltip title="Out of stock" TransitionComponent={Zoom}>
                  <IconButton id={productName}>
                    <Add style={searchListStyles.addIcon} />
                  </IconButton>
                </Tooltip>
              )
          }
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
