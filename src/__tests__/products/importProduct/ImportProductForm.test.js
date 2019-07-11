import React from 'react';
import { shallow } from 'enzyme';
import ImportProductForm from '../../../components/products/ImportProduct/ImportProductForm';

describe('Render Import Product form component', () => {
  const props = {
    state: {}
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<ImportProductForm {...props} />);
  });
});
