import React from 'react';
import { mount } from 'enzyme';
import HoldSaleDialog from '../../../components/sell/holdSaleDialog';

const props = {
  state: {
    openHoldSaleDialog: false,
    mainCartNote: '',
    isLoading: '',
  },
  handleCartNoteDialogClose: jest.fn(),
  handleHoldNoteInPutChange: jest.fn(),
  handleAddHeldSaleButton: jest.fn(),
};
describe('test HoldSaleDialog component', () => {
  let wrapper;
  it('it renders HoldSaleDialog component', () => {
    wrapper = mount((
      <HoldSaleDialog {...props} />
    ));
    const dialog = wrapper.find('Dialog').length;
    expect(dialog).toBe(1);
  });
});
