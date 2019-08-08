import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import { ApproveStockIcon } from '../../assets/images/stock/StockIcons';
import { APPROVE_QUANTITY } from '../../mutations/stockControl';
import { GET_ALL_APPROVED_PRODUCTS, GET_ALL_PROPOSED_EDITS } from '../../queries/stockProducts';
import { ProposedProductStyles } from '../../assets/styles/stock/stock';

export const ApproveQuantity = ({
  classes, ApproveEdit, batchId, productId
}) => (
  <Mutation
    mutation={APPROVE_QUANTITY}
    awaitRefetchQueries
    refetchQueries={() => [
      { query: GET_ALL_APPROVED_PRODUCTS },
      { query: GET_ALL_PROPOSED_EDITS },
    ]}
  >
    {approveQuantity => (
      <>
        <div className={classes.iconWrapper}>
          <IconButton
            data-batchid={batchId}
            data-productid={productId}
            className={classes.iconButton}
            onClick={event => ApproveEdit(event, false, approveQuantity)}
          >
            <ClearIcon />
          </IconButton>
        </div>
        <div className={classes.iconWrapper}>
          <IconButton
            data-batchid={batchId}
            data-productid={productId}
            className={classes.iconButton}
            onClick={event => ApproveEdit(event, true, approveQuantity)}
          >
            <ApproveStockIcon />
          </IconButton>
        </div>
      </>
    )}
  </Mutation>
);

ApproveQuantity.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  batchId: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  ApproveEdit: PropTypes.func.isRequired
};

export default withStyles(ProposedProductStyles)(ApproveQuantity);
