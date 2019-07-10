import React from 'react';
import { shallow } from 'enzyme';
import { Popover, Button } from '@material-ui/core';
import ConfirmClose from '../../components/payment/confirmClosePopOver';

const props = {
  isConfirmPopperOpen: true,
  confirmAnchorEl: { id: '' },
  confirmPlacement: 'top',
  handleCloseConfirmPopOver: jest.fn(),
  handleClosePaymentDialog: jest.fn()
};
describe('test ConfirmClose component', () => {
  it('it renders correctly provided it has all the required props', () => {
    const wrapper = shallow((
      <ConfirmClose {...props} />
    ));
    expect(wrapper.find(Popover).length).toBe(1);
    expect(wrapper.find(Button).length).toBe(2);
  });
});
