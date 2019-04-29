import React from 'react';
import { shallow } from 'enzyme';
import FileUpload from '../components/setup/fileUpload';

const props = {
  logo: 'logo',
  handleImageDrop: jest.fn(),
};

const acceptedFiles = {};
const onDrop = jest.fn(acceptedFiles);

describe('Render file upload component', () => {
  it('conditionaly renders an uploaded image', () => {
    const wrapper = shallow(<FileUpload {...props} />);
    const imageElement = wrapper.find('img').length;
    const paragraphElement = wrapper.find('p').length;

    expect(imageElement).toBe(1);
    expect(paragraphElement).toBe(0);
  });

  it('coditionally renders text', () => {
    const alternativeProps = {
      logo: '',
      handleImageDrop: jest.fn(),
    };
    const wrapper = shallow(<FileUpload {...alternativeProps} />);
    const paragraphElement = wrapper.find('p').length;

    expect(paragraphElement).toBe(3);
  });
});
