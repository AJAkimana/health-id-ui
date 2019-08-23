import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, TextField, Select, FormControl, MenuItem, InputLabel, Typography,
} from '@material-ui/core';
import { ProductFormStyles } from '../../../assets/styles/products/addProductStyles';
import ActionButtons from './ActionButtons';
import TagInput from './Inputs/Tags';
import ImageUpload from './Inputs/ImageUpload';
import ProductDescriptions from './Inputs/ProductDescriptions';


const ProductForm = (props) => {
  const {
    state: {
      tags, categoryId, measurementUnitId, vatStatus, preferredSupplierId, backupSupplierId,
      productName, productDescription, brand, manufacturer, loyaltyWeight, productImage,
    },
    state,
    handleChange, handleAddition, handleDelete, onSelectFile,
    handleOnCropChange, handleClose, handleSave, handleSendForApproval,
    handleAddAnotherProduct, handleProductName, handleCategoryChange, handleOnDrop, initialData
  } = props;

  const {
    approvedSuppliers,
    productCategories,
    measurementUnit,
  } = initialData;


  const disableButton = !productName || !brand || !manufacturer || !productDescription
  || !manufacturer || !preferredSupplierId || !backupSupplierId || !categoryId
  || !measurementUnitId;

  return (
    <Paper
      style={ProductFormStyles.paperForm}
    >
      <form>
        <Grid
          container
          spacing={24}
          style={ProductFormStyles.gridContainer}
        >
          <Grid
            item
            xs={8}
            style={ProductFormStyles.descriptionsGrid}
          >
            <ProductDescriptions
              productName={productName}
              handleProductName={handleProductName}
              handleChange={handleChange}
              productDescription={productDescription}
            />
          </Grid>
          {/* rows 1-3 image */}
          <Grid
            item
            xs={3}
            style={ProductFormStyles.uploadGrid}
          >
            <ImageUpload
              state={state}
              productImage={productImage}
              handleOnDrop={handleOnDrop}
              handleOnCropChange={handleOnCropChange}
              onSelectFile={onSelectFile}
              handleClose={handleClose}
              handleSave={handleSave}
            />
          </Grid>
          {/* row 4 brand, manufacturer */}
          <Grid
            item
            xs={6}
            style={ProductFormStyles.childGrid}
          >
            <TextField
              onChange={handleChange}
              type="text"
              label="Brand"
              name="brand"
              value={brand}
              fullWidth
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={ProductFormStyles.childGrid}
          >
            <TextField
              label="Manufacturer"
              type="text"
              fullWidth
              name="manufacturer"
              value={manufacturer}
              onChange={handleChange}
            />

          </Grid>
          {/* suppliers */}
          <Grid
            item
            xs={4}
            style={ProductFormStyles.childGrid}
          >
            <FormControl
              fullWidth
            >
              <InputLabel htmlFor="preferred-supplier">Preferred Supplier</InputLabel>
              <Select
                value={preferredSupplierId}
                className="preferredSupplierId"
                onChange={handleChange}
                inputProps={{
                  name: 'preferredSupplierId',
                  id: 'preferred-supplier',
                }}
              >
(
                {approvedSuppliers && (
                  approvedSuppliers.map(supplier => (
                    <MenuItem className="preferredSupplier" key={supplier.id} value={supplier.id}>{supplier.name}</MenuItem>
                  ))
                )
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={4}
            style={ProductFormStyles.childGrid}
          >
            <FormControl
              fullWidth
            >
              <InputLabel htmlFor="backup-supplier">Backup Supplier</InputLabel>
              <Select
                value={backupSupplierId}
                onChange={handleChange}
                inputProps={{
                  name: 'backupSupplierId',
                  id: 'backup-supplier',
                }}
              >
                {approvedSuppliers && (
                  approvedSuppliers.map(supplier => (
                    <MenuItem className="backupSupplier" key={supplier.id} value={supplier.id}>{supplier.name}</MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          {/* loyalty weight */}
          <Grid
            item
            xs={4}
            style={ProductFormStyles.childGrid}
          >
            {/* is prefilled depending on the category selected */}
            <TextField
              label="Loyalty Weight"
              type="number"
              placeholder="Please input a number"
              fullWidth
              name="loyaltyWeight"
              onChange={handleChange}
              value={loyaltyWeight}
            />
          </Grid>
          {/* category */}
          <Grid
            item
            xs={4}
            style={ProductFormStyles.childGrid}
          >
            <FormControl
              fullWidth
            >
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select
                value={categoryId}
                onChange={handleCategoryChange}
                inputProps={{
                  name: 'categoryId',
                  id: 'category',
                }}
              >
                {productCategories && (
                  productCategories.map(item => (
                    <MenuItem className="category" key={item.id} value={item.id}>{item.name}</MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          {/* measurement unit */}
          <Grid
            item
            xs={4}
            style={ProductFormStyles.childGrid}
          >
            <FormControl
              fullWidth
            >
              <InputLabel htmlFor="measurementUnitId">Measurement Unit</InputLabel>
              <Select
                value={measurementUnitId}
                onChange={handleChange}
                inputProps={{
                  name: 'measurementUnitId',
                  id: 'measurementUnitId',
                }}
              >
                {measurementUnit && (
                  measurementUnit.map(unit => (
                    <MenuItem className="measurementUnit" key={unit.id} value={unit.id}>{unit.name}</MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          {/* VAT Status */}
          <Grid
            item
            xs={4}
            style={ProductFormStyles.childGrid}
          >
            <FormControl
              fullWidth
            >
              <InputLabel htmlFor="vat-status">VAT Status</InputLabel>
              <Select
                value={vatStatus}
                onChange={handleChange}
                inputProps={{
                  name: 'vatStatus',
                  id: 'vat-status',
                }}
              >
                <MenuItem value>
                  VAT
                </MenuItem>
                <MenuItem value={false}>
                  No VAT
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* tags */}
          <Grid
            item
            xs={12}
            style={ProductFormStyles.childGrid}
          >
            <Typography
              style={ProductFormStyles.textAreaLabel}
            >
              Tags
            </Typography>
            <TagInput
              handleAddition={handleAddition}
              handleDelete={handleDelete}
              tags={tags}
            />
          </Grid>
          <Grid item xs={6} />
          <Grid
            item
            xs={6}
            style={ProductFormStyles.buttonGrid}
          >
            <ActionButtons
              disabled={disableButton}
              handleSendForApproval={handleSendForApproval}
              handleAddAnotherProduct={handleAddAnotherProduct}
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

ProductForm.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  initialData: PropTypes.shape({
    approvedSuppliers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    productCategories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        isVatApplicable: PropTypes.bool,
        loyaltyWeight: PropTypes.number,
        markup: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    measurementUnit: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddition: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleOnCropChange: PropTypes.func.isRequired,
  handleOnDrop: PropTypes.func.isRequired,
  onSelectFile: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleAddAnotherProduct: PropTypes.func.isRequired,
  handleSendForApproval: PropTypes.func.isRequired,
  handleProductName: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
};

export default ProductForm;
