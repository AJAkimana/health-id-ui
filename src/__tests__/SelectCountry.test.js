import React from 'react';
import { mount } from 'enzyme';
import SelectCountry from '../components/authentication/Inputs/SelectCountryCode';

const props = {
  handleChange: jest.fn(),
  Code: '+234'
};

describe('SelectCountry', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<SelectCountry {...props} />);
    expect(wrapper.find('FormControl').length).toBe(1);
    expect(wrapper.find('InputLabel').length).toBe(1);
    expect(wrapper.find('Select').length).toBe(1);
  });
});
