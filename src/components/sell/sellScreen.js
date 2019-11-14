import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Paper, Button, InputBase, InputAdornment, Radio,
  Typography, Table, TableBody, TableCell, TableHead, TableRow,
  Tooltip, List,
} from '@material-ui/core';
import {
  RadioButtonUnchecked, RadioButtonChecked
} from '@material-ui/icons';
import FormatCurrency from '../utils/formatCurrency';
import { addedItems, tableStyles } from '../../assets/css/sellScreenStyles';
import AddCustomerDialog from './addCustomerDialog';
import CustomerDetailDialog from './customerDetailDialog';
import HoldSaleDialog from './holdSaleDialog';
import AddDiscountPopper from './addDiscountPopper';
import AddProductNotePopper from './addProductNotePoppper';
import AddCustomerPopper from './addCustomerPopper';
import SalesOnHoldDialog from './salesOnHoldDialog';
import {
  NotesIcon, UserIcon, TrashIcon, ArchieveIcon, PauseIcon
} from '../../assets/SvgIcons/sellScreenSvgs';
import ViewProducts from './viewProducts';

export const SellScreen = ({
  state,
  handleChange,
  handleDiscountButton,
  renderTableRow,
  handleNoteBackButton,
  handleNoteAddButton,
  handleAddHeldSaleButton,
  handleReturnSaleToCart,
  handleCartNoteDialogClose,
  handleHoldNoteInPutChange,
  handleCustomerInputChange,
  handleCustomerDialogInPutChange,
  handleDiscardSaleButton,
  handleHoldSaleButton,
  handleSalesOnHoldButton,
  handleDiscountClick,
  handleDiscountPopperClickAway,
  handleNotePopperClickAway,
  handleCustomerPopperClickAway,
  handleAddNewCustomer,
  handleEditSelectedCustomer,
  handleCustomerDialogClose,
  renderSingleCustomer,
  handleAddCustomerButton,
  renderCartTotal,
  renderCartDiscount,
  renderGrandTotal,
  validateCustomerDialogInputs,
  updateCustomers,
  filterProducts,
  renderSearchBar,
  switchComponentRendering,
  handlePrimaryPhoneChange,
  handleSecondaryPhoneChange,
  handleContactPhoneChange,
  handleClickToPay
}) => {
  const {
    mainCartNote,
    buyingForValue,
    cartItems,
    currency,
    discount,
    firstName,
    selectedCustomer,
    openDicountPopper,
  } = state;
  const renderTableCell = (align, style, name) => (
    <TableCell
      align={align || 'inherit'}
      style={style}
    >
      {name || ''}
    </TableCell>
  );

  return (
    <Fragment>
      <Grid container spacing={24}>
        <Grid container item xs={12}>
          <Grid container item xs={7} style={addedItems.productsWrapper}>
            <ViewProducts
              state={state}
              filterProducts={filterProducts}
              renderSearchBar={renderSearchBar}
              switchComponentRendering={switchComponentRendering}
            />
          </Grid>
          <Grid container item xs={5} style={addedItems.cartWrapper}>
            <Grid container item xs={12} style={addedItems.buttonsGrid}>
              <Button
                style={addedItems.buttons}
                size="large"
                onClick={handleSalesOnHoldButton}
              >
                <ArchieveIcon style={addedItems.buttonsIcons} />
                <Typography variant="subtitle1" style={addedItems.buttonsTypo}>
                  Sales on Hold
                </Typography>
              </Button>
              <Button
                style={addedItems.buttons}
                size="large"
                disabled={cartItems.length === 0}
                onClick={handleHoldSaleButton}
              >
                <PauseIcon style={addedItems.buttonsIcons} />
                <Typography variant="subtitle1" style={addedItems.buttonsTypo}>
                  Hold Sale
                </Typography>
              </Button>
              <Button
                style={addedItems.buttons}
                size="large"
                onClick={handleDiscardSaleButton}
              >
                <TrashIcon style={addedItems.buttonsIcons} />
                <Typography variant="subtitle1" style={addedItems.buttonsTypo}>
                  Discard Sale
                </Typography>
              </Button>
            </Grid>
            <Paper style={addedItems.paper}>
              <form style={addedItems.container} noValidate autoComplete="off">
                {!selectedCustomer ? (
                  <InputBase
                    id="customer-input"
                    placeholder="Add Customer..."
                    style={addedItems.inputRoot}
                    name="customerInput"
                    value={firstName}
                    autoFocus
                    onChange={handleCustomerInputChange('bottom-start')}
                    startAdornment={(
                      <InputAdornment position="start">
                        <UserIcon style={addedItems.adornment} />
                      </InputAdornment>
                    )}
                  />
                ) : (
                  <List style={addedItems.singleCustomerList}>
                    {renderSingleCustomer(selectedCustomer, 'isSelected')}
                  </List>
                )}
                <AddCustomerPopper
                  state={state}
                  handleAddNewCustomer={handleAddNewCustomer}
                  renderSingleCustomer={renderSingleCustomer}
                  handleCustomerPopperClickAway={handleCustomerPopperClickAway}
                />
                <AddCustomerDialog
                  state={state}
                  handleCustomerDialogClose={handleCustomerDialogClose}
                  handleCustomerDialogInPutChange={handleCustomerDialogInPutChange}
                  handleAddCustomerButton={handleAddCustomerButton}
                  validateCustomerDialogInputs={validateCustomerDialogInputs}
                  updateCustomers={updateCustomers}
                  handlePrimaryPhoneChange={handlePrimaryPhoneChange}
                  handleSecondaryPhoneChange={handleSecondaryPhoneChange}
                  handleContactPhoneChange={handleContactPhoneChange}
                />
                <CustomerDetailDialog
                  state={state}
                  handleEditSelectedCustomer={handleEditSelectedCustomer}
                  handleCustomerDialogClose={handleCustomerDialogClose}
                  handleCustomerDialogInPutChange={handleCustomerDialogInPutChange}
                  handleAddCustomerButton={handleAddCustomerButton}
                  validateCustomerDialogInputs={validateCustomerDialogInputs}
                  updateCustomers={updateCustomers}
                  handlePrimaryPhoneChange={handlePrimaryPhoneChange}
                  handleSecondaryPhoneChange={handleSecondaryPhoneChange}
                  handleContactPhoneChange={handleContactPhoneChange}
                />
                <HoldSaleDialog
                  state={state}
                  handleCartNoteDialogClose={handleCartNoteDialogClose}
                  handleHoldNoteInPutChange={handleHoldNoteInPutChange}
                  handleAddHeldSaleButton={handleAddHeldSaleButton}
                />
                <SalesOnHoldDialog
                  state={state}
                  handleCartNoteDialogClose={handleCartNoteDialogClose}
                  handleHoldNoteInPutChange={handleHoldNoteInPutChange}
                  handleReturnSaleToCart={handleReturnSaleToCart}
                />
                <Grid container item xs={12} style={addedItems.buyingFor}>
                  <Grid item xs={3} style={addedItems.buyingForTypo}>
                    <Typography inline variant="subtitle2" style={addedItems.buyingForTypo}>
                      Buying For:
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Radio
                      name="buyingForValue"
                      checked={buyingForValue === 'self'}
                      onChange={handleChange}
                      value="self"
                      style={addedItems.radio}
                      color="primary"
                      icon={<RadioButtonUnchecked fontSize="default" color="disabled" />}
                      checkedIcon={<RadioButtonChecked fontSize="default" />}
                    />
                    <Typography inline variant="subtitle2" style={addedItems.radioLable}>
                      Self
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Radio
                      name="buyingForValue"
                      checked={buyingForValue === 'other'}
                      onChange={handleChange}
                      value="other"
                      style={addedItems.radio}
                      color="primary"
                      icon={<RadioButtonUnchecked fontSize="default" color="disabled" />}
                      checkedIcon={<RadioButtonChecked fontSize="default" />}
                    />
                    <Typography inline variant="subtitle2" style={addedItems.radioLable}>
                      Someone else
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12} style={addedItems.buyingFor}>
                  <Paper elevation={0} style={addedItems.tablePaper}>
                    <Table style={tableStyles.table}>
                      <colgroup>
                        <col width="24%" />
                        <col width="20%" />
                        <col width="16%" />
                        <col width="16%" />
                        <col width="8%" />
                        <col width="8%" />
                        <col width="8%" />
                      </colgroup>
                      <TableHead>
                        <TableRow style={tableStyles.headerRow}>
                          {renderTableCell('left', tableStyles.tableHeader, 'ITEM')}
                          {renderTableCell('left', tableStyles.tableHeader, 'QUANTITY')}
                          {renderTableCell('left', tableStyles.tableHeader, 'PRICE')}
                          {renderTableCell('left', tableStyles.tableHeader, 'TOTAL')}
                          {renderTableCell('center', tableStyles.tableHeader, '')}
                          {renderTableCell('center', tableStyles.tableHeader, '')}
                          {renderTableCell('center', tableStyles.tableHeader, '')}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartItems.map(item => (
                          renderTableRow(item)
                        ))}
                      </TableBody>
                    </Table>
                    <AddProductNotePopper
                      state={state}
                      openDicountPopper={openDicountPopper}
                      handleChange={handleChange}
                      handleNotePopperClickAway={handleNotePopperClickAway}
                      handleNoteAddButton={handleNoteAddButton}
                      handleNoteBackButton={handleNoteBackButton}
                    />
                  </Paper>
                  <Grid container item xs={12} style={tableStyles.totals}>
                    <Typography inline variant="h6" style={tableStyles.subtotal}>
                      SUBTOTAL:
                    </Typography>
                    <Typography inline variant="h6" style={tableStyles.currency}>
                      <FormatCurrency
                        amount={renderCartTotal(cartItems)}
                        currency={currency}
                      />
                    </Typography>
                  </Grid>
                  <Grid container item xs={12} style={tableStyles.discountWrapper}>
                    <Grid item xs={1} style={tableStyles.discount}>
                      <Typography inline variant="caption" style={tableStyles.discountNum}>
                        {discount}
                        %
                      </Typography>
                    </Grid>
                    <Grid container item xs={11} style={tableStyles.discount}>
                      <Tooltip title="Add Discount">
                        <Typography
                          id="discount-input"
                          inline
                          variant="caption"
                          style={tableStyles.discountTypo}
                          onClick={handleDiscountClick('left-start')}
                        >
                          DISCOUNT:
                        </Typography>
                      </Tooltip>
                      <AddDiscountPopper
                        state={state}
                        openDicountPopper={openDicountPopper}
                        handleChange={handleChange}
                        handleDiscountPopperClickAway={handleDiscountPopperClickAway}
                        handleDiscountButton={handleDiscountButton}
                      />
                      <Typography inline variant="caption" style={tableStyles.discountTotal}>
                        <FormatCurrency
                          amount={renderCartDiscount(cartItems)}
                          currency={currency}
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                  <InputBase
                    placeholder="Leave a note about sale..."
                    style={addedItems.inputRoot}
                    value={mainCartNote}
                    onChange={handleHoldNoteInPutChange}
                    startAdornment={(
                      <InputAdornment position="start">
                        <NotesIcon style={addedItems.adornment} />
                      </InputAdornment>
                    )}
                  />
                </Grid>
                <Grid container item xs={12} style={addedItems.buyingFor}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleClickToPay}
                    disabled={!(cartItems.length > 0)}
                  >
                    <Grid container item xs={12} style={tableStyles.payButton}>
                      <Typography inline variant="h6" style={tableStyles.buttonLabel}>
                        PAY
                      </Typography>
                      <Typography inline variant="h6" style={tableStyles.buttonLabel}>
                        <FormatCurrency
                          amount={renderGrandTotal()}
                          currency={currency}
                        />
                      </Typography>
                    </Grid>
                  </Button>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

SellScreen.propTypes = {
  state: PropTypes.instanceOf(Object),
  handleChange: PropTypes.func.isRequired,
  handleDiscountButton: PropTypes.func.isRequired,
  renderTableRow: PropTypes.func.isRequired,
  handleNoteBackButton: PropTypes.func.isRequired,
  handleNoteAddButton: PropTypes.func.isRequired,
  handleAddHeldSaleButton: PropTypes.func.isRequired,
  handleReturnSaleToCart: PropTypes.func.isRequired,
  handleCartNoteDialogClose: PropTypes.func.isRequired,
  handleHoldNoteInPutChange: PropTypes.func.isRequired,
  handleCustomerInputChange: PropTypes.func.isRequired,
  handleCustomerDialogInPutChange: PropTypes.func.isRequired,
  handleDiscardSaleButton: PropTypes.func.isRequired,
  handleHoldSaleButton: PropTypes.func.isRequired,
  handleSalesOnHoldButton: PropTypes.func.isRequired,
  handleDiscountClick: PropTypes.func.isRequired,
  handleDiscountPopperClickAway: PropTypes.func.isRequired,
  handleNotePopperClickAway: PropTypes.func.isRequired,
  handleCustomerPopperClickAway: PropTypes.func.isRequired,
  handleAddNewCustomer: PropTypes.func.isRequired,
  handleCustomerDialogClose: PropTypes.func.isRequired,
  renderSingleCustomer: PropTypes.func.isRequired,
  renderSearchBar: PropTypes.func.isRequired,
  handleAddCustomerButton: PropTypes.func.isRequired,
  renderCartTotal: PropTypes.func.isRequired,
  renderCartDiscount: PropTypes.func.isRequired,
  renderGrandTotal: PropTypes.func.isRequired,
  validateCustomerDialogInputs: PropTypes.func.isRequired,
  updateCustomers: PropTypes.func.isRequired,
  filterProducts: PropTypes.func.isRequired,
  switchComponentRendering: PropTypes.func.isRequired,
  handlePrimaryPhoneChange: PropTypes.func.isRequired,
  handleSecondaryPhoneChange: PropTypes.func.isRequired,
  handleContactPhoneChange: PropTypes.func.isRequired,
  handleClickToPay: PropTypes.func.isRequired,
  handleEditSelectedCustomer: PropTypes.func.isRequired
};

SellScreen.defaultProps = {
  state: {},
};

export default SellScreen;
