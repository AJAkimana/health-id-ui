import React from 'react';
import { shallow } from 'enzyme';
import ProductDescriptions from '../../../components/products/AddProduct/Inputs/ProductDescriptions';
ProductDescriptions


describe('Render Add Product component', () => {
  const props = {
    productName: '',
    handleChange: jest.fn(),
    productDescription: ''
  };


  it('renders without crashing', () => {
    const wrapper = shallow(<ProductDescriptions {...props} />);
    expect(wrapper.find('.name').length).toBe(1);
    expect(wrapper.find('.description').length).toBe(1);
  });

});
