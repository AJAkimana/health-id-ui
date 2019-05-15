import React from 'react';
import { shallow } from 'enzyme';
import ReceiptTemplate01 from '../components/utils/ReceiptTemplate01';

const props = {
  state: {
    amountToPay: true,
    barcode: true,
    cashier: true,
    changeDue: true,
    discountTotal: true,
    loyalty: true,
    loyaltyBalance: true,
    loyaltyEarned: true,
    purchaseTotal: true,
    receipt: true,
    receiptNo: true,
    subtotal: true,
    totalTax: true,
    receiptOpen: true,
  },
  handleTemplateChange: jest.fn(),
  handleReceiptTemplateClose: jest.fn(),
  handleReceiptTemplateSubmit: jest.fn(),
};

describe('Render outletList component', () => {
  const wrapper = shallow(<ReceiptTemplate01 {...props} />);
  it('renders receiptTemplate dialog', () => {
    expect(wrapper.find('#template-dialog').length).toBe(1);
  });
});
