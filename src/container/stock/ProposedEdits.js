import React, { useState } from 'react';
import { BulletList } from 'react-content-loader';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography, ListItemText, Divider, ListItem, List
} from '@material-ui/core';

import ApproveQuantity from './ApproveQuantity';
import { GET_ALL_PROPOSED_EDITS } from '../../queries/stockProducts';
import { ProposedProductStyles } from '../../assets/styles/stock/stock';
import notify from '../../components/shared/Toaster';

export const ProposedEdits = ({ classes }) => {
  const [proposedEdits, setProposedEdits] = useState([]);

  const ApproveEdit = (event, toApprove, approveQuantity) => {
    const { batchid, productid } = event.currentTarget.dataset;
    const requestData = { batchId: batchid, product: [Number(productid)], isApproved: toApprove };
    const approveComment = toApprove ? 'approved' : 'declined';

    approveQuantity({ variables: { comment: approveComment, ...requestData } })
      .then(response => notify(response.data.approveQuantity.message.replace(/-/gi, '/')))
      .catch(error => notify(error.message.split(':')[1]));
  };

  return (
    <Query query={GET_ALL_PROPOSED_EDITS} pollInterval={500}>
      {({ loading, data }) => {
        if (loading) {
          return <BulletList />;
        }
        if (data.proposedQuantityEdits.length === 0) {
          return (
            <div className={classes.noProposedEditWrapper}>
              <span className={classes.noProposedEdit}>No changes to approve</span>
            </div>
          );
        }

        setProposedEdits(data.proposedQuantityEdits);
        return (
          <List className={clsx(classes.root, proposedEdits.length > 4 && classes.scrollWrapper)}>
            {proposedEdits.map((product, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <Divider variant="inset" className={classes.divider} component="li" />
                <ListItem alignItems="flex-start" key={product.batch.id} data-batch={product.batch.id}>
                  <ListItemText
                    disableTypography
                    primary={product.product.productName}
                    secondary={(
                      <div className={classes.listWrapper}>
                        <div>
                          {`Date received: ${product.batch.dateReceived ? product.batch.dateReceived.replace(/-/gi, '/') : ''}`}
                        </div>
                        <Typography
                          component="div"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {`Quantity change from: ${product.batch.quantity} to `}
                          <b>{product.quantityReceived}</b>
                          <ApproveQuantity
                            batchId={product.batch.id}
                            productId={product.product.id}
                            ApproveEdit={ApproveEdit}
                          />
                        </Typography>
                        <div>
                          {`Changed by: ${product.proposedBy.username}`}
                        </div>
                      </div>
                    )}
                  />
                </ListItem>
              </div>
            ))}
          </List>
        );
      }}
    </Query>
  );
};

ProposedEdits.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(ProposedProductStyles)(ProposedEdits);
