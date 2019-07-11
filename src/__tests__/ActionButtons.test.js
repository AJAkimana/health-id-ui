import React from 'react';
import { shallow } from 'enzyme';
import ActionButtons from '../components/products/AddProduct/ActionButtons';


describe('Render Action Buttons component', () => {

  it('renders disabled action buttons', () => {
    const props = {
      handleSendForApproval: jest.fn(),
      handleAddAnotherProduct: jest.fn(), 
      disabled: true
    };
    const wrapper = shallow(<ActionButtons {...props} />);
    expect(wrapper.find('.new-btn').length).toBe(1);
    expect(wrapper.find('.create-btn').length).toBe(1);
  });

  it('renders active action buttons ', () => {
    const props = {
      handleSendForApproval: jest.fn(),
      handleAddAnotherProduct: jest.fn(), 
      disabled: false
    };
    const wrapper = shallow(<ActionButtons {...props} />);
    expect(wrapper.find('.new-btn').length).toBe(1);
    expect(wrapper.find('.create-btn').length).toBe(1);
  });

});
