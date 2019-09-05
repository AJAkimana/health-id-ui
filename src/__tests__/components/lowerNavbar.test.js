import React from 'react';
import { shallow } from 'enzyme'
import LowerNavbar from '../../components/shared/LowerNavbar';

describe('LowerNavbar', () => {
  it('renders without crashing', () => {

    const wrapper = shallow(<LowerNavbar />);
    expect(wrapper).toHaveLength(1);
  });
});
