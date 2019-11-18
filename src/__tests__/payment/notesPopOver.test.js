import React from 'react';
import { shallow } from 'enzyme';
import { Popover, List } from '@material-ui/core';
import Notes from '../../components/payment/notesPopOver';

const props = {
  isNotesPopperOpen: true,
  anchorEl: { id: '' },
  placement: 'bottom',
  handleClosePopOver: jest.fn(),
  products: [
    {
      productName: 'Paracetamol',
      salesPrice: '500',
      quantity: 2,
      discount: 0,
      note: '',
      id: 23,
      discountedTotal: 1000,
      dispensingSize: {
        name: 'tablets'
      }
    },
    {
      productName: 'Ventolin',
      salesPrice: '500',
      quantity: 12,
      discount: 0,
      note: '',
      id: 34,
      discountedTotal: 1000,
      dispensingSize: {
        name: 'tablets'
      }
    },
  ],
  mainCartNote: 'main note'
};
describe('test Notes component', () => {
  it('it renders correctly provided it has all the required props', () => {
    const wrapper = shallow((
      <Notes {...props} />
    ));
    expect(wrapper.find(Popover).length).toBe(1);
    expect(wrapper.find(List).length).toBe(1);
  });
});
