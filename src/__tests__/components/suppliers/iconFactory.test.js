import React from 'react';
import { shallow } from 'enzyme'
import IconFactory from '../../../assets/images/iconFactory/IconFactory';

describe('IconFactory', () => {
  const props = {
    iconStyle: {},
    type: 'vv',
    iconClass: {},
    iconAlt: 'vv'
  }

  it('renders without crashing', () => {

    const wrapper = shallow(<IconFactory {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});
