import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Paper, Grid, Button, TableCell
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { productDetailStyles } from '../../assets/styles/products/productDetailStyles';
import ProductHeader from './Templates/Header';
import Footer from '../shared/Footer';
import BatchInformation from './Templates/BatchInformation';
import Description from './Templates/Description';
import ProductInformation from './Templates/ProductInformation';
import StockDetails from './Templates/StockDetails';
import RenderDescriptionField from './Templates/renderDescriptionField';
import RenderTextField from './Templates/RenderTextField';

import { useStateValue } from '../../providers/stateProvider';


const productsLink = props => <Link to="/products" {...props} />;

const moneyFormat = num => `${num.toFixed(2)}`;

const subtotal = items => items.map(
  ({ price }) => price
).reduce((sum, i) => sum + i, 0);

const quantityTotal = pricedArray => pricedArray.map(
  ({ quantity }) => quantity
).reduce((sum, i) => sum + i, 0);

const priceColumn = (quantity, unitCost) => quantity * unitCost;

const createRow = ({
  id, dateReceived, supplier, expiryDate, quantity, unitCost
}) => {
  const price = priceColumn(quantity, unitCost);
  return {
    id, dateReceived, supplier, expiryDate, quantity, unitCost, price
  };
};

const priceTotal = pricedArray => subtotal(pricedArray);

const AddPriceField = batchArray => batchArray.map(batch => createRow(batch));

export const ProductDetailRender = (props) => {
  const {
    product: {
      id,
      batchInfo,
      outlet,
      productName,
      salesPrice,
      skuNumber,
      description,
      manufacturer,
      productCategory,
      measurementUnit,
      image,
      brand,
      vatStatus,
      productQuantity,
      reorderMax,
      reorderPoint,
      nearestExpiryDate,
      preferredSupplier,
      loyaltyWeight,
      backupSupplier,
      tags,
    },
    classes,
  } = props;

  const [, dispatch] = Object.values(useStateValue());

  React.useEffect(() => {
    dispatch({
      type: 'changeGrid',
      grid: 'grid3'
    });
  }, []);

  const withPriceField = AddPriceField(batchInfo);
  let currency = '₦';
  if (outlet.outletpreference) {
    currency = outlet.outletpreference.outletCurrency.symbol;
  }

  const renderTableCell = (align, style, name) => (
    <TableCell
      align={align || ''}
      style={style}
    >
      {name}
    </TableCell>
  );

  return (
    <React.Fragment>
      <ProductHeader classes={classes} previousPage="/products/approved" productName={productName}>
        <Button variant="contained" color="primary" className={classes.editButton}>
            Edit
        </Button>
      </ProductHeader>

      <Paper className={classes.paper}>
        <Description
          classes={classes}
          productName={productName}
          renderTextField={RenderTextField}
          renderDescriptionField={RenderDescriptionField}
          productCategory={productCategory}
          description={description}
          tags={tags}
          image={image}
        />

        <ProductInformation
          classes={classes}
          renderTextField={RenderTextField}
          measurementUnit={measurementUnit}
          loyaltyWeight={loyaltyWeight}
          preferredSupplier={preferredSupplier}
          backupSupplier={backupSupplier}
          id={id}
          skuNumber={skuNumber}
          vatStatus={vatStatus}
          manufacturer={manufacturer}
          brand={brand}
        />

        <StockDetails
          classes={classes}
          renderTextField={RenderTextField}
          salesPrice={salesPrice}
          reorderMax={reorderMax}
          reorderPoint={reorderPoint}
          nearestExpiryDate={nearestExpiryDate}
          productQuantity={productQuantity}
        />

        <BatchInformation
          classes={classes}
          renderTableCell={renderTableCell}
          withPriceField={withPriceField}
          skuNumber={skuNumber}
          manufacturer={manufacturer}
          currency={currency}
          moneyFormat={moneyFormat}
          quantityTotal={quantityTotal}
          priceTotal={priceTotal}
        />

        <Grid container spacing={24} className={classes.buttonMainGrid}>
          <Grid item xs={12}>
            <div className={classes.buttonsDiv}>
              <Button
                component={productsLink}
                variant="contained"
                color="primary"
                className={classes.backButton}
              >
                back
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Footer />
    </React.Fragment>
  );
};

ProductDetailRender.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
};

export default withStyles(productDetailStyles)(ProductDetailRender);
