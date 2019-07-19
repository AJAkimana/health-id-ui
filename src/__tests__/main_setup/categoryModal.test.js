import React from 'react';
import { shallow } from 'enzyme';
import CategoryModal from '../../components/main_setup/categoryModal';

describe("Category Modal", () => {
  const wrapper = shallow(
    <CategoryModal
      openModal={false}
      handleCloseModal={jest.fn()}
      handleChange={jest.fn()}
      handleDelete={jest.fn()}
      handleConfirmChange={jest.fn()}
      stateData={
        {
          name: "Test",
          salesMarkup: 10,
          isVat: true,
          loyalty: 10,
        }
      }
    />
  );

  it("Should render the component", () => {
    expect(wrapper.exists()).toBeTruthy()
  });
});
