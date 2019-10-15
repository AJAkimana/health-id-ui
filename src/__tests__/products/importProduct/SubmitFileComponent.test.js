import React from 'react';
import { shallow } from 'enzyme';
import SubmitFile from '../../../components/shared/SubmitFileComponent';


describe('Render SubmitFile component', () => {
  it('renders without crashing', () => {
    const props = {
      file: {},
      handleUpload: jest.fn(),
      loading: false,
      serverResponse: ''
    };
    const wrapper = shallow(<SubmitFile {...props} />);
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('.container').length).toBe(1);
    expect(wrapper.find('.file-item').length).toBe(1);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('.file-text').length).toBe(1);
    expect(wrapper.find('span').length).toBe(1);
    expect(wrapper.find('.file-name').length).toBe(1);
    expect(wrapper.find('.file-submit').length).toBe(1);
    expect(wrapper.find('.file-submit-btn').length).toBe(1);
  });

  it('renders the server response if there is any', () => {
    const props = {
      file: {},
      handleUpload: jest.fn(),
      loading: true,
      serverResponse: '20 products have been uploaded for approval'
    };
    const wrapper = shallow(<SubmitFile {...props} />);
    expect(wrapper.find('span').length).toBe(2);
    expect(wrapper.find('.file-span').length).toBe(1);
  });
});
