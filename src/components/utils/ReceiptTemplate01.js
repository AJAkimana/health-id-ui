import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';

const ReceiptTemplate01 = ({
  state,
  handleTemplateChange,
  handleReceiptTemplateClose,
  handleReceiptTemplateSubmit,
}) => {
  const {
    amountToPay,
    barcode,
    cashier,
    changeDue,
    discountTotal,
    loyalty,
    loyaltyBalance,
    loyaltyEarned,
    purchaseTotal,
    receipt,
    receiptNo,
    subtotal,
    totalTax,
    receiptOpen,
  } = state;

  return (
    <React.Fragment>
      <Dialog
        open={receiptOpen}
        onClose={handleReceiptTemplateClose}
        aria-labelledby="receipt-template"
        id="template-dialog"
      >
        <DialogTitle id="receipt-template">Receipt Template</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel
              control={(
                <Switch
                  checked={cashier}
                  onChange={handleTemplateChange('cashier')}
                  value="cashier"
                />
              )}
              label="Cashier"
            />
            <FormControlLabel
              control={(
                <Switch
                  checked={barcode}
                  onChange={handleTemplateChange('barcode')}
                  value="barcode"
                />
              )}
              label="Barcode"
            />
            <FormControlLabel
              control={(
                <Switch
                  checked={receipt}
                  onChange={handleTemplateChange('receipt')}
                  value="receipt"
                />
              )}
              label="Receipt"
            />
            <FormControlLabel
              control={(
                <Switch
                  checked={receiptNo}
                  onChange={handleTemplateChange('receiptNo')}
                  value="receiptNo"
                />
              )}
              label="Receipt Number"
            />
            <FormControlLabel
              control={(
                <Switch
                  checked={loyalty}
                  onChange={handleTemplateChange('loyalty')}
                  value="loyalty"
                />
              )}
              label="Loyalty"
            />
            <FormControlLabel
              control={(
                <Switch
                  checked={loyaltyEarned}
                  onChange={handleTemplateChange('loyaltyEarned')}
                  value="loyaltyEarned"
                />
              )}
              label="Loyalty Earned"
            />
            <FormControlLabel
              control={(
                <Switch
                  checked={loyaltyBalance}
                  onChange={handleTemplateChange('loyaltyBalance')}
                  value="loyaltyBalance"
                />
              )}
              label="Loyalty Balance"
            />
            <FormControlLabel
              control={(
                <Switch
                  checked={subtotal}
                  onChange={handleTemplateChange('subtotal')}
                  value="subtotal"
                />
              )}
              label="Sub Total"
            />
            <FormControlLabel
              control={(
                <Switch
                  checked={totalTax}
                  onChange={handleTemplateChange('totalTax')}
                  value="totalTax"
                />
              )}
              label="Total Tax"
            />
            <FormControlLabel
              control={(
                <Switch
                  checked={purchaseTotal}
                  onChange={handleTemplateChange('purchaseTotal')}
                  value="purchaseTotal"
                />
              )}
              label="Purchase Total"
            />
            <FormControlLabel
              control={(
                <Switch
                  checked={discountTotal}
                  onChange={handleTemplateChange('discountTotal')}
                  value="discountTotal"
                />
              )}
              label="Discount Total"
            />
            <FormControlLabel
              control={(
                <Switch
                  checked={amountToPay}
                  onChange={handleTemplateChange('amountToPay')}
                  value="amountToPay"
                />
              )}
              label="Amount To Pay"
            />
            <FormControlLabel
              control={(
                <Switch
                  checked={changeDue}
                  onChange={handleTemplateChange('changeDue')}
                  value="changeDue"
                />
              )}
              label="Change Due"
            />
          </FormGroup>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleReceiptTemplateClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleReceiptTemplateSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

ReceiptTemplate01.propTypes = {
  handleTemplateChange: PropTypes.func.isRequired,
  handleReceiptTemplateClose: PropTypes.func.isRequired,
  handleReceiptTemplateSubmit: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
};

export default ReceiptTemplate01;
