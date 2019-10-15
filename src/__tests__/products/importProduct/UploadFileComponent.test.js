import React from 'react';
import { shallow } from 'enzyme';
import UploadFileComponent from '../../../components/shared/UploadFileComponent';


describe('Render UploadFile component', () => {
  const props = {
    onDrop: jest.fn(),
    handleFile: jest.fn()
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<UploadFileComponent {...props} />);
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('.wrapper').length).toBe(1);
  });
});
