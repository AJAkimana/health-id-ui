import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { ActionButtonStyles } from '../../../assets/styles/products/addProductStyles';


const ActionButtons = (props) => {
  const { handleSendForApproval, handleAddAnotherProduct, disabled } = props;

  return (
    <Fragment>
      <Button
        disabled={disabled}
        variant="outlined"
        style={ActionButtonStyles.addButton}
        className="new-btn"
        onClick={handleAddAnotherProduct}
      >
      ADD NEW
      </Button>
      <Button
        disabled={disabled}
        variant="contained"
        color="primary"
        style={ActionButtonStyles.doneButton}
        className="create-btn"
        onClick={handleSendForApproval}
      >
    SEND FOR APPROVAL
      </Button>
    </Fragment>
  );
};

ActionButtons.propTypes = {
  handleAddAnotherProduct: PropTypes.func.isRequired,
  handleSendForApproval: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ActionButtons.defaultProps = {
  disabled: false
};

export default ActionButtons;
