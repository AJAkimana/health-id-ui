import React from 'react';
import { shallow } from 'enzyme';
import ProductForm from '../../../components/products/AddProduct/ProductForm';

describe('Render Product Form component', () => {
  const props = {
    state: {
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
    initialData: {
      approvedSuppliers: [
        {
          id: 'bu5ixuq72',
          name: 'Unilever'
        },
        {
          id: '2',
          name: 'sean2'
        },
        {
          id: '1',
          name: 'first'
        }
      ],
      productCategories: [
        {
          id: '45',
          name: 'Anti-Bacterial',
          loyaltyWeight: 2,
          isVatApplicable: true,
          markup: 10
        },
      ],
      measurementUnit: [
        {
          id: '2',
          name: 'syrup'
        },
        {
          id: '3',
          name: 'bottles'
        },
      ],
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
    const wrapper = shallow(<ProductForm {...props} />);
    expect(wrapper.find('ProductDescriptions').length).toBe(1);
    expect(wrapper.find('ImageUpload').length).toBe(1);
    expect(wrapper.find('TagInput').length).toBe(1);
    expect(wrapper.find('ActionButtons').length).toBe(1);
  });
});
