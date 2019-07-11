import React from 'react';
import { shallow, mount } from 'enzyme';
import * as moxios from 'moxios';
import { ImportProduct } from '../../../components/products/ImportProduct/ImportProduct';


describe('Render ImportProduct Component', () => {
  const props = {
    session: {
      me: {
        mobileNumber: '254123123123',
        email: 'user@gmail.com',
        username: 'user',
        role: { name: 'Master Admin' },
      }
    }
  };

  const acceptedFiles = [{
    name: 'producta', size: 10000, type: 'text/csv', lastModified: ''
  }];

  const expectedFile = {
    name: 'producta', size: 10000, type: 'text/csv', lastModified: ''
  };

  global.setTimeout = jest.fn();

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const wrapper = shallow(<ImportProduct {...props} />);
  it('renders without crashing', () => {
    expect(wrapper.find('Dashboard').length).toBe(1);
    expect(wrapper.find('BackAction').length).toBe(1);
    expect(wrapper.find('ImportProductForm').length).toBe(1);
  });

  it('calls handleFile', () => {
    const e = {
      target: {
        files: acceptedFiles,
      }
    };

    wrapper.instance().handleFile(e);
    expect(wrapper.state().file).toEqual(expectedFile);
  });

  it('calls onDrop', () => {
    wrapper.instance().onDrop(acceptedFiles);
    expect(wrapper.state().file).toEqual(expectedFile);
  });

  it('calls handleDownloadTemplate', () => {
    const url = 'https://healthid-web-api.herokuapp.com/healthid/sample_product_csv';
    wrapper.instance().handleDownloadTemplate();
    moxios.stubRequest(url, {
      status: 200,
      res: {
        data: [
          'Product Category,Product Name,Measurement Unit,Description,Brand,Manufacturer,Vat Status,Preferred Supplier,Backup Supplier,Tags'
        ]
      }
    });
  });

  it('calls handleUpload', () => {
    const url = 'https://healthid-web-api.herokuapp.com/healthid/csv/products';
    wrapper.instance().handleUpload();
    expect(wrapper.state().loading).toEqual(true);
    moxios.stubRequest(url, {
      status: 200,
      res: {
        data: {
          noOfProductsAdded: 12
        }
      }
    });
  });
});
