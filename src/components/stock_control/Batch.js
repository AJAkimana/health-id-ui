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
  proposed,
  setValue,
  handleClick,
  classes
}) => {
  const {
    heading, icon, proposedQuantity,
    proposedQuantityBold, quantityWrapper
  } = classes;

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
        <div className={quantityWrapper}>
          <div className={proposedQuantity}>{`${quantity} ${(proposed || (expanded === id)) ? 'to ' : ''}`}</div>
          {expanded !== id ? (
            <div className={proposedQuantityBold}>{proposed}</div>
          ) : (
            <input
              name="quantity"
              className="quantity-input"
              type="number"
              onClick={(event) => {
                event.stopPropagation();
              }}
              onChange={(event) => {
                setValue([Number(event.target.value)]);
              }}
              required
              autoFocus
            />
          )}
        </div>
      </Grid>
      <Grid item xs={12} sm={2}>
        <IconButton data-panel={id} className={icon} disabled={proposed} onClick={handleClick}>
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
  proposed: PropTypes.number,
  setValue: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired
};

Batch.defaultProps = {
  classes: {},
  quantity: 0,
  proposed: null,
  dateReceived: ''
};

export default withStyles(BatchCardStyles)(Batch);
