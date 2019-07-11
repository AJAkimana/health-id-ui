import React from 'react';
import { shallow } from 'enzyme';
import ProductForm from '../../../components/products/AddProduct/ProductForm';

describe('Render Product Form component', () => {
  const props = {
    state: {
      suppliers: [],
      categories: [],
      measurementUnits: [],
      productName: '',
      productDescription: '',
      productImage: '',
      imageFile: '',
      brand: '',
      manufacturer: '',
      preferredSupplierId: '',
      backupSupplierId: '',
      categoryId: '',
      measurementUnitId: '',
      loyaltyWeight: '',
      vatStatus: '',
      tags: [],
      loading: false,
    },
    handleChange: jest.fn(),
    handleAddition: jest.fn(),
    handleDelete: jest.fn(),
    onDrop: jest.fn(),
    handleFile: jest.fn()
  };


  it('renders without crashing', () => {
    const wrapper = shallow(<ProductForm {...props} />);
    expect(wrapper.find('ProductDescriptions').length).toBe(1);
    expect(wrapper.find('ImageUpload').length).toBe(1);
    expect(wrapper.find('TagInput').length).toBe(1);
    expect(wrapper.find('ActionButtons').length).toBe(1);
  });

  it('renders with filled select fields without crashing ', () => {
    const props = {
      state: {
        suppliers: [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }],
        categories: [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }],
        measurementUnits: [{ id: 1, name: 'One' }, { id: 2, name: 'Two' }],
      }
    };
    const wrapper = shallow(<ProductForm {...props} />);
    expect(wrapper.find('ProductDescriptions').length).toBe(1);
    expect(wrapper.find('ImageUpload').length).toBe(1);
    expect(wrapper.find('TagInput').length).toBe(1);
    expect(wrapper.find('ActionButtons').length).toBe(1);
  });
});
