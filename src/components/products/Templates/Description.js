import React, { Fragment } from 'react';
import {
  Paper, Grid, Card, CardMedia, Chip
} from '@material-ui/core';
import PropTypes from 'prop-types';
import ProductImageHolder from '../../../assets/images/productImageHolder.png';

const Description = (props) => {
  const {
    classes, renderTextField, renderDescriptionField,
    productCategory, description, tags, image, productName
  } = props;
  return (
    <Fragment>
      <Grid container spacing={24} className={classes.containerGrid}>
        <div className={classes.productNameStyles}>
          <h3 className={classes.productName}>{productName}</h3>
          <hr className={classes.titleLine} />
        </div>
        <Grid container item xs={24}>
          <Grid container item xs={12} spacing={24}>
            <Grid item xs={9}>
              <div className={classes.category}>
                {renderTextField(
                  classes.descriptionFields, 'productCategory', 'Category', productCategory.name
                )}
              </div>
              <div className={classes.category}>
                {renderDescriptionField(classes.descriptionText, 'description', 'Description', description)}
              </div>
            </Grid>
            <Grid item xs={3}>
              <Card elevation={0} className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={image === 'none' ? ProductImageHolder : image}
                  title="Product Image"
                />
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.tagsRoot}>
              {tags.length > 1 ? (
                tags.map(tag => (
                  <Chip
                    key={tags.indexOf(tag)}
                    label={tag}
                    className={classes.tagChip}
                    id="tag-chip"
                  />
                ))
              ) : (
                <Chip
                  key="Tag Placeholder"
                  label="Tag Placeholder"
                  className={classes.tagChip}
                  id="tag-chip"
                />
              )}
            </Paper>

          </Grid>


        </Grid>
      </Grid>
    </Fragment>
  );
};

Description.propTypes = {
  classes: PropTypes.shape({
    containerGrid: PropTypes.string,
    category: PropTypes.string,
    card: PropTypes.string,
    media: PropTypes.string,
    descriptionFields: PropTypes.string,
    productNameStyles: PropTypes.string,
    productName: PropTypes.string,
    titleLine: PropTypes.string,
    descriptionText: PropTypes.func.isRequired,
    name: PropTypes.string,
    tagChip: PropTypes.string,
    tagsRoot: PropTypes.string,
  }).isRequired,
  renderTextField: PropTypes.func.isRequired,
  renderDescriptionField: PropTypes.func.isRequired,
  productCategory: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  productName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.func,
    indexOf: PropTypes.string
  })).isRequired,
  image: PropTypes.string.isRequired
};

export default Description;
