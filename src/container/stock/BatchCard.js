import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Divider } from '@material-ui/core';

import notify from '../../components/shared/Toaster';
import Batch from '../../components/stock_control/Batch';
import { EDIT_QUANTITY } from '../../mutations/stockControl';
import { BatchCardStyles } from '../../assets/styles/stock/stock';

export const BatchCard = ({
  classes, data, name, productId
}) => {
  const {
    title, secondaryTitle, scrollWrapper, root, divider, card
  } = classes;
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState('');

  const handleClick = (event, id, editQuantity) => {
    const variables = {
      variables: { quantities: value, batchId: id, product: productId }
    };
    const { panel } = event.currentTarget.dataset;

    if (expanded !== id) {
      setExpanded(panel);
    } else {
      editQuantity(variables)
        .then(response => notify(response.data.proposedQuantity.notification))
        .catch(error => notify(error.message.split(':')[1].trim()));
      setExpanded(false);
    }
  };

  return (
    <div className={root}>
      <div className={title}>{name}</div>
      <div className={secondaryTitle}>Select a batch of products to edit</div>
      <div className={clsx('scroll', data.length > 3 && scrollWrapper)}>
        {data.map(({
          dateReceived, expiryDate, quantity, id
        }) => (
          <div key={id} data-id={id} className={card}>
            <Divider className={divider} />
            <Mutation mutation={EDIT_QUANTITY}>
              {proposedQuantity => (
                <Batch
                  id={id}
                  expanded={expanded}
                  dateReceived={dateReceived}
                  expiryDate={expiryDate}
                  quantity={quantity}
                  setValue={setValue}
                  handleClick={event => handleClick(event, id, proposedQuantity)}
                />
              )}
            </Mutation>
          </div>
        ))}
      </div>
    </div>
  );
};

BatchCard.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.arrayOf(Object).isRequired,
  name: PropTypes.string.isRequired,
  productId: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default withStyles(BatchCardStyles)(BatchCard);
