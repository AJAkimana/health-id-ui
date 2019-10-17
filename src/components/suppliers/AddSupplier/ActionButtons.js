import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { ActionButtonStyles } from '../../../assets/styles/suppliers/addSupplierStyles';


const ActionButtons = (props) => {
  const { handleSendForApproval, handleAddAnotherSupplier, disabled } = props;

  return (
    <Fragment>
      <Button
        id="saveNew"
        disabled={disabled}
        variant="outlined"
        style={ActionButtonStyles.doneButton}
        className="new-btn"
        onClick={handleAddAnotherSupplier}
      >
      SAVE AND ADD NEW
      </Button>
      <Button
        id="save"
        disabled={disabled}
        variant="contained"
        color="primary"
        style={ActionButtonStyles.addButton}
        className="create-btn"
        onClick={handleSendForApproval}
      >
    SAVE
      </Button>
    </Fragment>
  );
};

ActionButtons.propTypes = {
  handleAddAnotherSupplier: PropTypes.func.isRequired,
  handleSendForApproval: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ActionButtons.defaultProps = {
  disabled: false
};

export default ActionButtons;
