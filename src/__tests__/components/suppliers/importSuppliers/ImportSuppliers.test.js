import React from 'react';
import { shallow } from 'enzyme';
import * as moxios from 'moxios';
import toJson from 'enzyme-to-json';
import PropTypes from 'prop-types';
import { ImportSuppliers } from '../../../../components/suppliers/Templates/ImportSuppliers/ImportSuppliers';


describe('Render ImportSuppliers Component', () => {
  const props = {
    session: {
      me: {
        mobileNumber: '2348903345',
        email: 'user@gmail.com',
        username: 'user',
        role: { name: 'Master Admin' },
      }
    }
  };

  const acceptedFiles = [{
    name: 'supplier', size: 10000, type: 'text/csv', lastModified: ''
  }];

  const expectedFile = {
    name: 'supplier', size: 10000, type: 'text/csv', lastModified: ''
  };

  global.setTimeout = jest.fn();

  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  ImportSuppliers.contextTypes = [
    PropTypes.string,
    PropTypes.func
  ];

  const context = ['kitty', jest.fn()]

  const wrapper = shallow(<ImportSuppliers {...props} />, { context });
  it('renders without crashing', () => {
    expect(wrapper.find('BackAction').length).toBe(1);
    expect(wrapper.find('ImportSuppliersForm').length).toBe(1);
  });

  it('should render the ImportSuppliers component properly', () => {
    const setupImportSuppliers = () => {
      const wrapper = shallow(<ImportSuppliers {...props} />, { context })
      return wrapper
    }

    let wrapper;
    wrapper = setupImportSuppliers();
    expect(toJson(wrapper)).toMatchSnapshot();
  })

  it('calls handleFile', () => {
    const newProps = {
      state: { file: "" },
      ...props
    };

    const e = {
      target: {
        files: acceptedFiles,
      }
    };
    const wrapperWithFileProp = shallow(<ImportSuppliers {...newProps} />, { context });
    wrapperWithFileProp.instance().handleFile(e);
    expect(wrapperWithFileProp.state().file).toEqual(expectedFile);
  });

  it('calls onDrop', () => {
    wrapper.instance().onDrop(acceptedFiles);
    expect(wrapper.state().file).toEqual(expectedFile);
  });

  it('calls handleDownloadTemplate', async () => {
    const url = `${process.env.APP_LINK}/sample_csv_file/supplier`;
    wrapper.instance().handleDownloadTemplate();
    moxios.stubRequest(url, {
      status: 200,
      res: {
        data: [
          'Name, Email,	Mobile #,	Supplier Rating, Address Line 1,	Address Line 2,	LGA,	City,	Tier,	Supplier Logo,	Commentary,	Payment terms,	Credit days'
        ]
      }
    });
  });

  it('calls handleUpload', async () => {
    const url = `${process.env.APP_LINK}/csv/suppliers`;
    wrapper.instance().handleUpload();
    wrapper.instance().handleUploadFailed().then(() => { });
    expect(wrapper.state().loading).toEqual(true);
    moxios.stubRequest(url, {
      status: 200,
      res: {
        data: {
          noOfProductsAdded: 20
        }
      }
    });
  });
});
