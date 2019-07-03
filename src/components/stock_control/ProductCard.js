import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Typography, CardContent, CardActions, Chip, Card } from '@material-ui/core';

import { productCardStyles } from '../../assets/styles/stock/stock';

export const ProductCard = ({ data, classes }) => {
  const {
    name, description, image, tags
  } = data;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.wrapper} variant="body2" component="div">
          <div className={classes.description}>{description}</div>
          <img className={classes.productImage} src={image} alt="Not found" />
        </Typography>
      </CardContent>
      <CardActions>
        {tags.length > 0
          ? tags.map(tag => <Chip key={tag} label={tag} className={classes.chip} />)
          : ''
        }
        <KeyboardArrowRight className={classes.icon} />
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  data: PropTypes.objectOf(Object).isRequired
};


export default withStyles(productCardStyles)(ProductCard);
