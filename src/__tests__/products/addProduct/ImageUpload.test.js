import React from 'react';
import { shallow } from 'enzyme';
import Dropzone from 'react-dropzone';
import ImageUpload from '../../../components/products/AddProduct/Inputs/ImageUpload';
import ResizeDialog from '../../../components/profile/resizeDialogBox';


describe('Render Add Product component', () => {
  const props = {
    onDrop: jest.fn(),
    handleFile: jest.fn,
    state: {
      src: 'imagesrc',
      productImage: '',
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
        productImage: 'myproduct.jpeg',
      }
    };
    const wrapper = shallow(<ImageUpload {...props} />);
    expect(wrapper.find(ResizeDialog).length).toBe(1);
  });

  it('displays the productImage', () => {
    const props = {
      state: {
        src: null,
        productImage: 'myproduct.jpeg',
      }
    };
    const wrapper = shallow(<ImageUpload {...props} />);
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('.product-image').length).toBe(1);
    expect(wrapper.find('.imgPlaceholder').length).toBe(0);
  });

  it('displays the imageplaceholder', () => {
    const props = {
      state: {
        src: null,
        productImage: '',
      }
    };
    const wrapper = shallow(<ImageUpload {...props} />);
    expect(wrapper.find('div').length).toBe(3);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.find('.product-image').length).toBe(0);
    expect(wrapper.find('.imgPlaceholder').length).toBe(1);
  });

  it('handles the Dropzone', () => {
    const props = {
      state: {
        src: null,
        productImage: '',
      }
    };
    const wrapper = shallow(<ImageUpload {...props} />);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('p').first().text()).toContain('Upload png / jpg');
    expect(wrapper.find(Dropzone).length).toBe(1);
  });
});
