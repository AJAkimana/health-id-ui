import React from 'react';
import { shallow } from 'enzyme';
import TagInput from '../../../components/products/AddProduct/Inputs/Tags';


describe('Render Add Product component', () => {
  const props = {
    tags: [],
    handleAddition: jest.fn(),
    handleDelete: jest.fn()
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<TagInput {...props} />);
    expect(wrapper.find('.tags-container').length).toBe(1);
  });
});
