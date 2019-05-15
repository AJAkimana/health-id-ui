import React from 'react';
import { mount } from 'enzyme';
import FileUpload from '../components/setup/fileUpload';

const props = {
  state: {
    src: '',
    open: false,
  },
  logo: 'logo',
  handleImageDrop: jest.fn(),
  onSelectFile: jest.fn(),
  onCropChange: jest.fn(),
  handleClose: jest.fn(),
  handleSave: jest.fn(),
};

const acceptedFiles = {};
const onDrop = jest.fn(acceptedFiles);

describe('Render file upload component when logo state property has a value', () => {
  it('conditionaly renders an uploaded image', () => {
    const wrapper = mount(<FileUpload {...props} />);
    const imageElement = wrapper.find('img').length;
    const paragraphElement = wrapper.find('p').length;

    expect(imageElement).toBe(1);
    expect(paragraphElement).toBe(0);
  });

  it('coditionally renders paragraph elements when logo and src state properties has no value', () => {
    const alternativeProps = {
      logo: '',
      handleImageDrop: jest.fn(),
      onSelectFile: jest.fn(),
      onCropChange: jest.fn(),
      handleClose: jest.fn(),
      handleSave: jest.fn(),
      state: {
        src: '',
        open: false,
      },
    };
    const wrapper = mount(<FileUpload {...alternativeProps} />);
    const paragraphElement = wrapper.find('p').length;

    expect(paragraphElement).toBe(2);
  });

  it('renders a react crop component when src state property has a value', () => {
    const reactCropProps = {
      state: {
        src: 'image_url',
        open: false,
      },
      logo: '',
      handleImageDrop: jest.fn(),
      onSelectFile: jest.fn(),
      onCropChange: jest.fn(),
      handleClose: jest.fn(),
      handleSave: jest.fn(),
    };

    const wrapper = mount(<FileUpload {...reactCropProps} />);
    const reactCropper = wrapper.find('ResizeDialog').length;

    expect(reactCropper).toBe(1);
  });
});
