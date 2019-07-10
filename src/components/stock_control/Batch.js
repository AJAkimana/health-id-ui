import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { KeyboardArrowRight, Check } from '@material-ui/icons';

import { BatchCardStyles } from '../../assets/styles/stock/stock';

export const Batch = ({
  id,
  expanded,
  dateReceived,
  expiryDate,
  quantity,
  setValue,
  handleClick,
  classes
}) => {
  const { heading, icon } = classes;

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={4}>
        <Typography className={heading}>Date received : </Typography>
        <Typography className={heading}>Expiry Date : </Typography>
        <Typography className={heading}>Quantity : </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography className={heading}>{dateReceived}</Typography>
        <Typography className={heading}>{expiryDate}</Typography>
        {expanded !== id ? (
          <Typography className={heading}>{quantity}</Typography>
        ) : (
          <input
            name="quantity"
            className="quantity-input"
            type="number"
            required
            defaultValue={quantity}
            onClick={(event) => {
              event.stopPropagation();
            }}
            onChange={(event) => {
              setValue([event.target.value]);
            }}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={2}>
        <IconButton data-panel={id} className={icon} onClick={handleClick}>
          {expanded !== id ? <KeyboardArrowRight /> : <Check />}
        </IconButton>
      </Grid>
    </Grid>
  );
};

Batch.propTypes = {
  classes: PropTypes.instanceOf(Object),
  id: PropTypes.string.isRequired,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  dateReceived: PropTypes.string,
  expiryDate: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  setValue: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
};

Batch.defaultProps = {
  classes: {},
  quantity: 0,
  dateReceived: ''
};

export default withStyles(BatchCardStyles)(Batch);
