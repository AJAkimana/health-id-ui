import React from 'react';
import { shallow } from 'enzyme';
import ActionButtons from '../../../../components/suppliers/AddSupplier/ActionButtons';

describe('Supplier Action Button', () => {
  const props = {
    handleAddAnotherSupplier: jest.fn(),
    handleSendForApproval: jest.fn(),
    disabled: true
  };

  it('should be defined', () => {
    expect(ActionButtons).toBeDefined();
  });
  it('should render correctly', () => {
    const tree = shallow(<ActionButtons {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders disabled action buttons', () => {
    const props = {
      handleSendForApproval: jest.fn(),
      handleAddAnotherSupplier: jest.fn(),
      disabled: true
    };
    const wrapper = shallow(<ActionButtons {...props} />);
    expect(wrapper.find('.new-btn').length).toBe(1);
    expect(wrapper.find('.create-btn').length).toBe(1);
  });

  it('renders active action buttons ', () => {
    const props = {
      handleSendForApproval: jest.fn(),
      handleAddAnotherSupplier: jest.fn(),
      disabled: false
    };
    const wrapper = shallow(<ActionButtons {...props} />);
    expect(wrapper.find('.new-btn').length).toBe(1);
    expect(wrapper.find('.create-btn').length).toBe(1);
  });
});
