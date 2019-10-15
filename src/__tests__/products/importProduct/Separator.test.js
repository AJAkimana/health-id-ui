import React from 'react';
import { shallow } from 'enzyme';
import Separator from '../../../components/shared/Separator';


describe('Render Separator component', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(<Separator />);
    expect(wrapper.find('#separator').length).toBe(1);
    expect(wrapper.find('div').length).toBe(4);
  });
});
