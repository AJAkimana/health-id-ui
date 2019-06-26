import React from 'react';
import { shallow } from 'enzyme';
import { SellScreen } from '../../../components/sell/sellScreen';

const props = {
  state: {
    mainCartNote: '',
    buyingForValue: '',
    cartItems: [{}],
    currency: '',
    discount: '',
    firstName: '',
    selectedCustomer: '',
    openDicountPopper: false,
  },
  handleChange: jest.fn(),
  handleDiscountButton: jest.fn(),
  renderTableRow: jest.fn(),
  handleNoteBackButton: jest.fn(),
  handleNoteAddButton: jest.fn(),
  handleAddHeldSaleButton: jest.fn(),
  handleReturnSaleToCart: jest.fn(),
  handleCartNoteDialogClose: jest.fn(),
  handleHoldNoteInPutChange: jest.fn(),
  handleCustomerInputChange: jest.fn(),
  handleCustomerDialogInPutChange: jest.fn(),
  handleDiscardSaleButton: jest.fn(),
  handleHoldSaleButton: jest.fn(),
  handleSalesOnHoldButton: jest.fn(),
  handleDiscountClick: jest.fn(),
  handleDiscountPopperClickAway: jest.fn(),
  handleNotePopperClickAway: jest.fn(),
  handleCustomerPopperClickAway: jest.fn(),
  handleAddNewCustomer: jest.fn(),
  handleCustomerDialogClose: jest.fn(),
  renderSingleCustomer: jest.fn(),
  handleAddCustomerButton: jest.fn(),
  renderCartTotal: jest.fn(),
  renderCartDiscount: jest.fn(),
  renderGrandTotal: jest.fn(),
  validateCustomerDialogInputs: jest.fn(),
  updateCustomers: jest.fn(),
  filterProducts: jest.fn(),
  renderSearchBar: jest.fn(),
  switchComponentRendering: jest.fn(),
};
describe('sellScreen component', () => {
  let wrapper;
  it('it renders the sellScreen component', () => {
    wrapper = shallow((
      <SellScreen {...props} />
    ));
    const fragment = wrapper.find('Fragment').length;
    expect(fragment).toBe(1);
  });
});
