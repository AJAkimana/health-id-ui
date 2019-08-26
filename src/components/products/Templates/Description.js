import React, { Fragment } from 'react';
import {
  Paper, Grid, Card,
  CardActionArea, CardMedia, Chip
} from '@material-ui/core';
import PropTypes from 'prop-types';

const Description = (props) => {
  const {
    classes, renderTextField,
    productCategory, description, tags, image
  } = props;

  return (
    <Fragment>
      <Grid container spacing={24} className={classes.containerGrid}>
        <Grid container item xs={12}>
          <Grid container item xs={8} spacing={24}>
            <Grid item xs={12}>
              <div className={classes.category}>
                {renderTextField(
                  classes.descriptionFields, 'productCategory', 'Category', productCategory.name
                )}
              </div>
              <div>
                {renderTextField(
                  classes.descriptionFields, 'description', 'Description', description
                )}
              </div>

              <Paper elevation={0} className={classes.tagsRoot}>
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

          <Grid item xs={4}>
            <Card elevation={0} className={classes.card}>
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
    name: PropTypes.string,
    tagChip: PropTypes.string,
    tagsRoot: PropTypes.string,
  }).isRequired,
  renderTextField: PropTypes.func.isRequired,
  productCategory: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    map: PropTypes.func,
    indexOf: PropTypes.string
  })).isRequired,
  image: PropTypes.string.isRequired
};

export default Description;
