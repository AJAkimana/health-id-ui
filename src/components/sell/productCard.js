import React from 'react';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {
  Typography, Grid, CardActions, Card
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import productCardStyles from '../../assets/css/productCardStyles';
import FormatCurrency from '../utils/formatCurrency';

const ProductCard = (props) => {
  const {
    product,
    currency,
    handleClickToAddProduct,
  } = props;
  const {
    productCategory: { name },
    dispensingSize,
  } = product;

  return (
    <Card style={productCardStyles.card}>
      <Grid container style={productCardStyles.row1}>
        <Grid item xs={12}>
          <CardContent style={productCardStyles.content1}>
            <Typography variant="inherit" style={productCardStyles.productName}>
              {product.productName}
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={12}>
          <CardContent style={productCardStyles.content2}>
            <Typography variant="inherit" style={productCardStyles.quantityInStock}>
              {`${dispensingSize.name}`}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>

      <Grid container style={productCardStyles.row2}>
        <Grid item xs={8}>
          <CardContent style={productCardStyles.content2}>
            <Typography variant="inherit" style={productCardStyles.productCategory}>
              {name}
            </Typography>
            <Typography variant="inherit" style={productCardStyles.productPrice}>
              <FormatCurrency
                amount={product.salesPrice}
                currency={currency}
              />
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={4} style={productCardStyles.mediaGrid}>
          <CardMedia
            component="img"
            style={productCardStyles.media}
            image={product.image}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} style={productCardStyles.row3}>
        <div style={productCardStyles.buttonDiv}>
          <CardActions disableActionSpacing style={productCardStyles.cardAction}>
            <IconButton
              id={product.name}
              onClick={() => handleClickToAddProduct(product)}
              style={productCardStyles.iconButton}
            >
              <Add style={productCardStyles.addIcon} />
            </IconButton>
          </CardActions>
        </div>
      </Grid>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  currency: PropTypes.string.isRequired,
  handleClickToAddProduct: PropTypes.func.isRequired,
};

export default ProductCard;
