/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import PreferencesLoader from '../../components/main_setup/preferencesLoader';

describe('PreferencesLoader ', () => {
  it('renders correctly ', () => {
    const wrapper = shallow(<PreferencesLoader />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
