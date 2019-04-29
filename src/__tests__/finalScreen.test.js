import React from 'react';
import { shallow } from 'enzyme';
import FinalScreen from '../components/setup/finalScreen';

describe('Render Final Screen component', () => {
  it('renders four image elements ', () => {
    const wrapper = shallow(<FinalScreen />);
    const imageElements = wrapper.find('img').length;
    expect(imageElements).toBe(4);
  });
});
