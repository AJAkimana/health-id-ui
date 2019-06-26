import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Paper, Typography, TextField, Grid, Button, Card,
  CardActionArea, CardMedia, Table, TableBody, TableCell,
  TableHead, TableRow, Chip, Tooltip, IconButton
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import BackIcon from '@material-ui/icons/ArrowBack';
import { productDetailStyles, tableStyles } from '../../assets/styles/products/productDetailStyles';
import Dashboard from '../shared/Dashboard/Dashboard';
import Footer from '../shared/Footer';

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
      productName,
      salesPrice,
      skuNumber,
      description,
      manufacturer,
      productCategory,
      measurementUnit,
      image,
      reorderPoint,
      reorderMax,
      brand,
      vatStatus,
      productQuantity,
      nearestExpiryDate,
      preferedSupplier,
      loyaltyWeight,
      backupSupplier,
      tags,
    },
    classes,
    session,
  } = props;
  const withPriceField = AddPriceField(batchInfo);
  const currency = batchInfo[0]
    ? batchInfo[0].outlet.preference.outletCurrency.symbol : '$';
  const renderTextField = (style, name, label, value) => (
    <TextField
      className={style}
      id={name}
      name={name}
      label={label}
      value={value}
      fullWidth
      InputProps={{ disableUnderline: true, readOnly: true }}
    />
  );
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
      <Dashboard isActive="grid3" session={session} />
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.arrowButtonGrid}
      >
        <Grid item>
          <Link to="/products">
            <Tooltip title="Back to products">
              <IconButton>
                <BackIcon className={classes.arrowIcon} />
              </IconButton>
            </Tooltip>
          </Link>
        </Grid>
        <Grid item>
          <Typography variant="h5" className={classes.arrowButtonLabel}>
            {productName}
          </Typography>
        </Grid>
      </Grid>

      <Paper className={classes.paper}>
        <div className={classes.dividerDiv}>
          <Typography paragraph variant="h6" align="left" gutterBottom className={classes.dividerHeaders}>
            Product Information
          </Typography>
        </div>
        <Grid container spacing={24} className={classes.containerGrid}>
          <Grid container item xs={12}>
            <Grid container item xs={8}>
              <Grid container item xs={12} spacing={24}>
                <Grid item xs={4}>
                  {renderTextField(
                    classes.descriptionFields, 'productName', 'Product Name', productName
                  )}
                </Grid>
                <Grid item xs={4}>
                  {renderTextField(
                    classes.descriptionFields, 'productId', 'Product ID', id
                  )}
                </Grid>
                <Grid item xs={4}>
                  {renderTextField(
                    classes.descriptionFields, 'skuNumber', 'SKU Number', skuNumber
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {renderTextField(
                  classes.descriptionFields, 'description', 'Description', description
                )}
              </Grid>
              <Grid container item xs={12} spacing={24}>
                <Grid item xs={4}>
                  {renderTextField(
                    classes.descriptionFields, 'manufacturer', 'Manufacturer', manufacturer
                  )}
                  {renderTextField(
                    classes.descriptionFields, 'salesPrice', 'Sales Price', moneyFormat(salesPrice)
                  )}
                </Grid>
                <Grid item xs={4}>
                  {renderTextField(
                    classes.descriptionFields, 'productCategory', 'Product Category',
                    productCategory.name
                  )}
                  {renderTextField(
                    classes.descriptionFields, 'reorderPoint', 'Reorder Point', reorderPoint
                  )}
                </Grid>
                <Grid item xs={4}>
                  {renderTextField(
                    classes.descriptionFields, 'measurementUnit', 'Measurement Unit',
                    measurementUnit.name
                  )}
                  {renderTextField(
                    classes.descriptionFields, 'reorderMax', 'Reorder Max', reorderMax
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={image}
                    title="Product Image"
                  />
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <div className={classes.dividerDiv}>
          <Typography paragraph variant="h6" align="left" gutterBottom className={classes.dividerHeaders}>
            Details
          </Typography>
        </div>

        <Grid container spacing={24} className={classes.containerGrid}>
          <Grid item xs={3} className={classes.childGrids}>
            {renderTextField(classes.newTextFields, 'brand', 'Brand', brand)}
            {renderTextField(classes.newTextFields, 'vatStatus', 'Vat Status', vatStatus)}
          </Grid>
          <Grid item xs={3} className={classes.childGrids}>
            {renderTextField(
              classes.newTextFields, 'quantity', 'Quantity',
              productQuantity || 0
            )}
            {renderTextField(
              classes.newTextFields, 'nearestExpiryDate', 'Nearest Expiry Date',
              nearestExpiryDate || 'None'
            )}
          </Grid>
          <Grid item xs={3} className={classes.childGrids}>
            {renderTextField(
              classes.newTextFields, 'preferedSupplier', 'Prefered Supplier',
              preferedSupplier.name
            )}
            {renderTextField(
              classes.newTextFields, 'loyaltyWeight', 'Loyalty Weight',
              loyaltyWeight
            )}
          </Grid>
          <Grid item xs={3} className={classes.childGrids}>
            {renderTextField(
              classes.newTextFields, 'backupSupplier', 'Backup Supplier',
              backupSupplier.name
            )}
            <Paper elevation={0} className={classes.tagsRoot}>
              <Typography variant="caption" align="left" className={classes.tagsHeading}>
                Tags
              </Typography>
              {tags.map(tag => (
                <Chip
                  key={tags.indexOf(tag)}
                  label={tag}
                  className={classes.tagChip}
                  id="tag-chip"
                />
              ))}
            </Paper>
          </Grid>
        </Grid>

        <div className={classes.dividerDiv}>
          <Typography paragraph variant="h6" align="left" gutterBottom className={classes.dividerHeaders}>
          Batch Information
          </Typography>
        </div>

        <Grid container spacing={24} className={classes.containerGrid}>
          <Grid item xs={12} style={tableStyles.batchHeader}>
            <Table>
              <TableHead>
                <TableRow style={tableStyles.batchRow}>
                  {renderTableCell('left', tableStyles.tableHeader, 'Date Received')}
                  {renderTableCell('left', tableStyles.tableHeader, 'SKU')}
                  {renderTableCell('left', tableStyles.tableHeader, 'Supplier')}
                  {renderTableCell('left', tableStyles.tableHeader, 'Manufacturer')}
                  {renderTableCell('left', tableStyles.tableHeader, 'Expiry Date')}
                  {renderTableCell('right', tableStyles.tableHeader, 'Quantity')}
                  {renderTableCell('right', tableStyles.tableHeader, 'Unit Cost')}
                  {renderTableCell('right', tableStyles.tableHeader, 'Total Cost')}
                </TableRow>
              </TableHead>
              <TableBody>
                {withPriceField.map(batch => (
                  <TableRow
                    id="outlets-table-row"
                    key={batch.id}
                    style={tableStyles.batchRow}
                  >
                    <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                      {batch.dateReceived}
                    </TableCell>
                    <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                      {skuNumber}
                    </TableCell>
                    <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                      {batch.supplier.name}
                    </TableCell>
                    <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                      {manufacturer}
                    </TableCell>
                    <TableCell component="th" scope="row" style={tableStyles.tableCell}>
                      {batch.expiryDate}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row" style={tableStyles.tableCell}>
                      {batch.quantity ? batch.quantity : 0}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row" style={tableStyles.tableCell}>
                      {currency}
                      {' '}
                      {moneyFormat(batch.unitCost)}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row" style={tableStyles.tableCell}>
                      {currency}
                      {' '}
                      {moneyFormat(batch.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableHead>
                <TableRow style={tableStyles.batchRow}>
                  <TableCell align="left" style={tableStyles.tableFooter} />
                  <TableCell align="left" style={tableStyles.tableFooter} />
                  <TableCell align="left" style={tableStyles.tableFooter} />
                  <TableCell align="right" style={tableStyles.tableHeader}>
                    Total
                  </TableCell>
                  <TableCell align="right" style={tableStyles.tableFooter} />
                  <TableCell align="right" style={tableStyles.tableHeader}>
                    {quantityTotal(withPriceField)}
                  </TableCell>
                  <TableCell align="right" style={tableStyles.tableHeader}>
                    Grand Total
                  </TableCell>
                  <TableCell align="right" style={tableStyles.tableHeader}>
                    {currency}
                    {' '}
                    {moneyFormat(priceTotal(withPriceField))}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Grid>
        </Grid>
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
  session: PropTypes.objectOf(PropTypes.object)
};

ProductDetailRender.defaultProps = {
  session: {}
};

export default withStyles(productDetailStyles)(ProductDetailRender);
