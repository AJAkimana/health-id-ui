import React from 'react';
import { mount } from 'enzyme';
import AddProductNotePopper from '../../../components/sell/addProductNotePoppper';

const props = {
  state: {
    openNotePopper: false,
    productNoteAnchorEl: '',
    placement: '',
    cartItemNoteValue: '',
  },
  handleChange: jest.fn(),
  handleNotePopperClickAway: jest.fn(),
  handleNoteAddButton: jest.fn(),
  handleNoteBackButton: jest.fn(),
};
describe('test AddProductNotePopper component', () => {
  let wrapper;
  it('it renders AddProductNotePopper component', () => {
    wrapper = mount((
      <AddProductNotePopper {...props} />
    ));
    const popper = wrapper.find('Popper').length;
    expect(popper).toBe(1);
  });
});
