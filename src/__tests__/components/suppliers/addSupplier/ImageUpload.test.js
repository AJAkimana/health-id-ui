import React from 'react';
import { shallow } from 'enzyme';
import Dropzone from 'react-dropzone';
import ImageUpload from '../../../../components/suppliers/AddSupplier/Inputs/ImageUpload';
import ResizeDialog from '../../../../components/profile/resizeDialogBox';


describe('Render Add supplier component', () => {
  const props = {
    onDrop: jest.fn(),
    handleFile: jest.fn,
    state: {
      src: 'imagesrc',
      logo: '',
    }
  };


  it('renders without crashing', () => {
    const wrapper = shallow(<ImageUpload {...props} />);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('displays the crop/resize dialog', () => {
    const props = {
      state: {
        src: 'imagesrc',
        logo: 'mysupplier.jpeg',
      }
    };
    const wrapper = shallow(<ImageUpload {...props} />);
    expect(wrapper.find(ResizeDialog).length).toBe(1);
  });

  it('displays the logo', () => {
    const props = {
      state: {
        src: null,
        logo: 'logo.jpeg',
      }
    };
    const wrapper = shallow(<ImageUpload {...props} />);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('img').length).toBe(0);
    expect(wrapper.find('.logo').length).toBe(0);
    expect(wrapper.find('.imgPlaceholder').length).toBe(0);
  });

  it('displays the imageplaceholder', () => {
    const props = {
      state: {
        src: null,
        logo: '',
      }
    };
    const wrapper = shallow(<ImageUpload {...props} />);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('img').length).toBe(0);
    expect(wrapper.find('.logo').length).toBe(0);
    expect(wrapper.find('.imgPlaceholder').length).toBe(0);
  });

  it('handles the Dropzone', () => {
    const props = {
      state: {
        src: null,
        logo: '',
      }
    };
    const wrapper = shallow(<ImageUpload {...props} />);
    expect(wrapper.find('p').length).toBe(0);
    expect(wrapper.find(Dropzone).length).toBe(1);
  });
});
