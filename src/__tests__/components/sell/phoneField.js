import React from 'react';
import { shallow } from 'enzyme';
import PhoneField from '../../../components/sell/phoneField';

describe('Phone field', () => {
  it('renders without crashing', () => {
    const props = {
      value: '',
      onChange: jest.fn(),
      isSelected: true,
    };

    const wrapper = shallow(<PhoneField {...props} />);
    expect(wrapper.find('Fragment').length).toBe(1);
  });
});
