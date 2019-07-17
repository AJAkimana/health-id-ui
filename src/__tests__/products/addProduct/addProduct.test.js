import React from 'react';
import { shallow } from 'enzyme';
import { AddProduct } from '../../../components/products/AddProduct/AddProduct';

describe('Render Add Product component', () => {
  const props = {
    session: {
      me: {
        mobileNumber: '254123123123',
        email: 'user@gmail.com',
        username: 'user',
        role: { name: 'Master Admin' },
      }
    },
    addProduct: jest.fn(() => Promise.resolve()),
  };

  const graphqlProps = {
    session: {
      me: {
        mobileNumber: '256704505050',
        email: 'example@gmail.com',
        username: 'myth',
        role: { name: 'Master Admin' },
      }
    },
    getSuppliers: {
      approvedSuppliers: [
        { name: 'supplier1', id: 1 },
        { name: 'supplier2', id: 2 }
      ]
    },
    getCategories: {
      productCategories: [
        { id: 1, name: 'category1' },
        { id: 2, name: 'category2' }
      ]
    },
    getMeasurementUnits: {
      measurementUnit: [
        { id: 1, name: 'kg' },
        { id: 2, name: 'ltrs' }
      ]
    },
    getAllProducts: {
      products: [
        { id: 1, productName: 'nexium' },
        { id: 2, productName: 'panadol' }
      ]
    }
  };

  const crop = {
    x: 0,
    y: 10,
    width: 200,
    height: 200,
    aspect: 1 / 1
  };

  const wrapper = shallow(<AddProduct {...props} />);

  const validFile = [
    {
      name: 'eucerin', size: 10000, type: 'image/jpg', lastModified: ''
    },
  ];

  const invalidFile = [
    {
      name: 'eucerin', size: 10000, type: 'text/csv', lastModified: ''
    },
  ];

  const data = [{
    name: 'eucerin', size: 10000, type: 'image/jpg', lastModified: ''
  },
  ];

  const largeFile = [
    {
      name: 'eucerin', size: 1000000000, type: 'image/jpg', lastModified: ''
    },
  ];

  const fileName = 'eucerin';

  it('renders data upon successful view', () => {
    const wrapper = shallow(<AddProduct {...props} />);
    wrapper.instance().componentWillReceiveProps(graphqlProps);
    expect(wrapper.state().suppliers).toEqual([
      { name: 'supplier1', id: 1 },
      { name: 'supplier2', id: 2 }
    ]);
    expect(wrapper.state().categories).toEqual([
      { id: 1, name: 'category1' },
      { id: 2, name: 'category2' }
    ]);
    expect(wrapper.state().measurementUnits).toEqual([
      { id: 1, name: 'kg' },
      { id: 2, name: 'ltrs' }
    ]);
  });

  it('calls handle change function', () => {
    const event = {
      target: {
        name: 'brand',
        value: 'Biersdorf'
      }
    };

    const value = 'Biersdorf';

    const wrapper = shallow(<AddProduct {...props} />);
    wrapper.instance().handleChange(event);
    expect(wrapper.state().brand).toEqual(value);
  });

  it('calls handle product name change function', () => {
    const event = {
      target: {
        name: 'productName',
        value: 'nexium'
      }
    };

    const wrapper = shallow(<AddProduct {...props} />);
    wrapper.instance().componentWillReceiveProps(graphqlProps);
    wrapper.instance().handleProductName(event);
    expect(wrapper.state().productName).toEqual('nexium');
  });

  it('calls handle category change function', () => {
    const event = {
      target: {
        value: 1
      }
    };

    const wrapper = shallow(<AddProduct {...props} />);
    wrapper.instance().componentWillReceiveProps(graphqlProps);
    wrapper.instance().handleCategoryChange(event);

    expect(wrapper.instance().state.categoryId).toBe(1);
  });

  it('calls handleAddition', () => {
    const tag1 = 'pain';
    const result1 = ['pain'];

    const tag2 = 'headache';
    const result2 = ['pain', 'headache'];

    const wrapper = shallow(<AddProduct {...props} />);
    wrapper.instance().handleAddition(tag1);
    expect(wrapper.state().tags).toEqual(result1);
    wrapper.instance().handleAddition(tag2);
    expect(wrapper.state().tags).toEqual(result2);
  });

  it('calls handleDelete', () => {
    const initialArray = ['pain', 'headache'];
    const finalArray = ['pain'];

    const wrapper = shallow(<AddProduct {...props} />);
    wrapper.setState({ tags: initialArray });
    wrapper.instance().handleDelete(1);
    expect(wrapper.state().tags).toEqual(finalArray);
  });

  it('calls handlePropose product', () => {
    const wrapper = shallow(
      <AddProduct {...props} />
    );
    wrapper.instance().handleProposeProduct();
    expect(wrapper.state().loading).toBeTruthy();
  });

  it('calls handleSendForApproval', () => {
    const wrapper = shallow(
      <AddProduct {...props} />
    );
    wrapper.instance().handleSendForApproval();
  });

  it('calls handleAddAnotherProduct', () => {
    const wrapper = shallow(
      <AddProduct {...props} />
    );
    wrapper.instance().handleAddAnotherProduct();
  });


  it('calls onSelectFile function on a large image file', () => {
    const e = {
      target: {
        files: largeFile
      }
    };

    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile(e);
    expect(spy).toHaveBeenCalled();
  });

  it('calls onSelectFile function on a non-image file', () => {
    const e = {
      target: {
        files: invalidFile
      }
    };

    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile(e);
    expect(spy).toHaveBeenCalled();
  });

  it('calls getCroppedImage function', () => {
    const spy = jest.spyOn(wrapper.instance(), 'getCroppedImg');
    wrapper.instance().getCroppedImg(validFile, crop, fileName);
    expect(spy).toHaveBeenCalled();
  });

  it('calls onCropChange function', () => {
    wrapper.instance().handleOnCropChange(crop);
    expect(wrapper.state().crop).toEqual(crop);
  });

  it('calls handleClose function', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleImageDrop');
    wrapper.instance().handleClose();
    wrapper.setState({ imageFile: validFile });
    expect(wrapper.state().src).toEqual('');
    expect(wrapper.state().open).toBeFalsy();
    wrapper.instance().handleImageDrop(wrapper.state().imageFile);
    expect(spy).toHaveBeenCalled();
  });


  it('calls handleSave function', () => {
    wrapper.instance().getCroppedImg = jest.fn(() => Promise.resolve(data));

    wrapper.instance().handleSave();
    wrapper.setState({
      src: 'image-src',
      fileName: 'eucerin',
      crop
    });
    expect(wrapper.instance().getCroppedImg).toHaveBeenCalled();
  });
});
