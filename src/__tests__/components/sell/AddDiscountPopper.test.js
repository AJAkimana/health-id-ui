import React from 'react';
import { mount } from 'enzyme';
import AddDiscountPopper from '../../../components/sell/addDiscountPopper';

const props = {
  state: {
    openDicountPopper: false,
    discountAnchorEl: '',
    placement: '',
    discountValue: '',
  },
  handleDiscountPopperClickAway: jest.fn(),
  handleDiscountButton: jest.fn(),
};
describe('test AddDiscountPopper component', () => {
  let wrapper;
  it('it renders AddDiscountPopper component', () => {
    wrapper = mount((
      <AddDiscountPopper {...props} />
    ));
    const popper = wrapper.find('Popper').length;
    expect(popper).toBe(1);
  });
});
