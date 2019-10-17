import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import * as moxios from 'moxios';
import { AddProduct } from '../../../components/products/AddProduct/AddProduct';
import GET_PRODUCTS_SUPPLIERS_CATEGORIES from '../../../queries/productsSuppliersCategoriesQuery';
import { resolvedRequest, rejectedRequest } from '../../../../__mocks__/axiosResponses';

describe('Render Add Product component', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  const props = {
    session: {
      me: {
        mobileNumber: '254123123123',
        email: 'user@gmail.com',
        username: 'user',
        role: { name: 'Master Admin' },
        activeOutlet: {
          outletpreference: {
            outletTimezone: { name: 'Africa/Lagos' }
          }
        }
      }
    },
    addProduct: jest.fn(
      () => new Promise((resolve) => {
        const data = {
          createProduct: {
            product: {
              productName: 'Para'
            }
          }
        };
        const res = { data };
        return resolve(res);
      })
    )
  };

  const mocks = [
    {
      request: {
        query: GET_PRODUCTS_SUPPLIERS_CATEGORIES,
        variables: { outletId: 7 }
      },
      result: {
        data: {
          approvedSuppliers: [
            {
              id: 'bu5ixuq72',
              name: 'Unilever'
            }
          ],
          productCategories: [
            {
              id: '45',
              name: 'Anti-Bacterial',
              loyaltyWeight: 2,
              isVatApplicable: true,
              markup: 10
            }
          ],
          measurementUnit: [
            {
              id: '2',
              name: 'syrup'
            }
          ],
          products: [
            {
              id: '261',
              productName: 'Panadol',
              isApproved: true
            },
            {
              id: '262',
              productName: 'Chloroform',
              isApproved: true
            }
          ]
        }
      }
    }
  ];

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
      name: 'eucerin',
      size: 10000,
      type: 'image/jpg',
      lastModified: ''
    }
  ];

  const invalidFile = [
    {
      name: 'eucerin',
      size: 10000,
      type: 'text/csv',
      lastModified: ''
    }
  ];

  const data = [
    {
      name: 'eucerin',
      size: 10000,
      type: 'image/jpg',
      lastModified: ''
    }
  ];

  const largeFile = [
    {
      name: 'eucerin',
      size: 1000000000,
      type: 'image/jpg',
      lastModified: ''
    }
  ];

  const fileName = 'eucerin';

  it('renders data upon successful view', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <AddProduct {...props} />
        </BrowserRouter>
      </MockedProvider>
    );
    await wait(0);
    // expect(wrapper.find('DataTableLoader').length).toBe(1);
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
    wrapper.setState({ products: [{ productName: 'nexium' }] });

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
    wrapper.setState({ categories: [{ id: 1, loyaltyWeight: 1, isVatApplicable: true }] });
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

  it('calls handlePropose product', async () => {
    const wrapper = shallow(<AddProduct {...props} />);
    wrapper.instance().handleProposeProduct();
    expect(wrapper.state().loading).toBeTruthy();
  });

  it('calls handleSendForApproval', () => {
    const wrapper = shallow(<AddProduct {...props} />);
    wrapper.instance().handleSendForApproval();
  });

  it('calls handleAddAnotherProduct', async () => {
    const wrapper = shallow(<AddProduct {...props} />);
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

  it('calls onSelectFile function on a image file', () => {
    const validFile = new File([new Blob()], 'image.jpg', {
      name: 'profile',
      size: 10000,
      type: 'image/jpg',
      lastModified: ''
    });
    const e = {
      target: {
        files: [validFile]
      }
    };
    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile(e);
    console.log('wrapper.state().src', wrapper.state().src);
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
    const url = `${process.env.CLOUDINARY_URL}`;
    moxios.stubRequest(`${url}`, resolvedRequest);
    const spy = jest.spyOn(wrapper.instance(), 'handleImageDrop');
    wrapper.instance().handleClose();
    wrapper.setState({ imageFile: validFile });
    expect(wrapper.state().src).toEqual('');
    expect(wrapper.state().open).toBeFalsy();
    wrapper.instance().handleImageDrop(wrapper.state().imageFile);
    expect(spy).toHaveBeenCalled();
  });
  it('calls handleClose function', () => {
    const url = `${process.env.CLOUDINARY_URL}`;
    moxios.stubRequest(`${url}`, rejectedRequest);
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
