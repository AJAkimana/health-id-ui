import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {
  Typography, Grid, CardActions, Card
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import productCardStyles from '../../assets/css/productCardStyles';
import FormatCurrency from '../utils/formatCurrency';

const styles = productCardStyles;

const ProductCard = (props) => {
  const {
    classes,
    product,
    currency,
    handleClickToAddProduct,
  } = props;
  const {
    productCategory: { name },
    measurementUnit,
  } = product;

  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={12}>
          <CardContent style={productCardStyles.content1}>
            <Typography variant="inherit" className={classes.productName}>
              {product.productName}
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={8}>
          <CardContent style={productCardStyles.content2}>
            <Typography variant="inherit" className={classes.productQuantity}>
              {`${measurementUnit.name}`}
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={8}>
          <CardContent style={productCardStyles.content2}>
            <Typography variant="inherit" className={classes.productCategory}>
              {name}
            </Typography>
            <Typography variant="inherit" className={classes.productPrice}>
              {<FormatCurrency
                amount={product.salesPrice}
                currency={currency}
              />}
            </Typography>
          </CardContent>

        </Grid>

        <Grid item xs={3} className={classes.mediaGrid}>
          <CardMedia
            component="img"
            className={classes.media}
            image={product.image}
          />
        </Grid>

        <Grid item xs={12}>
          <div className={classes.buttonDiv}>
            <CardActions disableActionSpacing className={classes.cardAction}>
              <IconButton
                id={product.name}
                onClick={() => handleClickToAddProduct(product)}
                className={classes.iconButton}
              >
                <Add className={classes.addIcon} />
              </IconButton>
            </CardActions>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

ProductCard.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  product: PropTypes.instanceOf(Object).isRequired,
  currency: PropTypes.string.isRequired,
  handleClickToAddProduct: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProductCard);
