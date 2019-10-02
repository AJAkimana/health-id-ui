import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SVGIcon from '../../../components/shared/Dashboard/Icons';

const props = {
  name: '',
  style: {},
  fill: ''
}

describe('SVGIcon', () => {
  it('should render the SVGIcon component properly', () => {
    const setupSVGIcon = () => {
      const wrapper = shallow(<SVGIcon {...props} />)
      return wrapper
    }

    let wrapper;
    wrapper = setupSVGIcon();
    expect(toJson(wrapper)).toMatchSnapshot();
  })
});
