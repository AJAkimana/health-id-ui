import React from 'react';
import { shallow } from 'enzyme';
import BackAction from '../components/products/BackAction';


describe('Render Add Product component', () => {
  const props = {
    header: '',
    link: ''
  };


  it('renders without crashing', () => {
    const wrapper = shallow(<BackAction {...props} />);
    expect(wrapper.find('div').length).toBe(3);
  });
});
