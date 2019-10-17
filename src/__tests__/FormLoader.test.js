import React from 'react';
import { shallow } from 'enzyme';
import FormLoader from '../components/shared/Loader/FormLoader';

describe('FormLoader ', () => {
  it('renders correctly ', () => {
    const wrapper = shallow(<FormLoader />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
