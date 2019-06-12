import React from 'react';
import { mount } from 'enzyme';
import SelectCountry from '../components/authentication/Inputs/SelectCountryCode';

const props = {
  handleChange: jest.fn(),
  phone: ''
};

describe('SelectCountry', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<SelectCountry {...props} />);
    expect(wrapper.find('TextField').length).toBe(1);
  });
});
