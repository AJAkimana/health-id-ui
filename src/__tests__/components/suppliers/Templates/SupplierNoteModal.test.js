import React from 'react';
import { shallow } from 'enzyme';
import SupplierNoteModal from '../../../../components/suppliers/Templates/SupplierNoteModal';

describe("Supplier Note Modal", () => {
  const wrapper = shallow(
    <SupplierNoteModal
      openAddModel={false}
      handleCloseModal ={jest.fn()}
      handleChange={jest.fn()}
      handleSaveNote={jest.fn()}
    />
  );

  it("Should render the component", () => {
    expect(wrapper.exists()).toBeTruthy()
  });
});
