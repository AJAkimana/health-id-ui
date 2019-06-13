import React from 'react';
import { mount } from 'enzyme';
import { Products } from '../components/products/productsTable';
import AfterSelectToolBar from '../components/products/afterSelectToolBar';
import { ToolBar } from '../components/products/toolBar';

const props = {
  getAllProducts: {
    products: [{
      id: 'id',
      productName: 'productName',
      productCategory: { name: 'Category' },
      measurementUnit: { name: 'Joules' },
      packSize: '2',
      skuNumber: 'serd',
      description: 'desc',
      brand: 'brand',
      manufacturer: 'manufacturer',
      vatStatus: 'vatstat',
      salesPrice: '23',
      nearestExpiryDate: '2019-12-12',
      preferedSupplier: { name: 'pref' },
      backupSupplier: { name: 'backup' },
    }],
    loading: false
  },
  getApprovedProducts: {
    getApprovedProducts: {
      approvedProducts: null,
      loading: false,
    },
    getProposedProducts: {
      proposedProducts: [],
      loading: false,
    },
    approvedProducts: [],
    loading: true,
  },
  getProposedProducts: {
    getProposedProducts: {
      proposedProducts: null,
      loading: false,
    },
    getApprovedProducts: {
      approvedProducts: [],
      loading: false,
    },
    proposedProducts: [],
    loading: true,
  },
  data: {
    getApprovedProducts: {
      approvedProducts: [{
        id: 'id',
        productName: 'productName',
        productCategory: { name: 'Category' },
        measurementUnit: { name: 'Joules' },
        packSize: '2',
        skuNumber: 'serd',
        description: 'desc',
        brand: 'brand',
        manufacturer: 'manufacturer',
        vatStatus: 'vatstat',
        salesPrice: '23',
        nearestExpiryDate: '2019-12-12',
        preferedSupplier: { name: 'pref' },
        backupSupplier: { name: 'backup' },
      }],
      loading: false,
    },
    getProposedProducts: {
      getProposedProducts: {
        proposedProducts: [],
      },
      proposedProducts: [],
      loading: false,
    },
  },
  classes: {
    icon: 'Products-div-1',
    iconButton: 'Products-footer-2',
    inverseIcon: 'inverse-icon',
  },
  session: {
    me: {
      role: {
        name: 'Master Admin'
      }
    }
  },
  selectedRows: {
    data: [{ index: 1, dataIndex: 1 }]
  },
  displayData: [{}],
  setSelectedRows: jest.fn(),
  client: { query: jest.fn() },
};

describe('After Row selection toolbar tests', () => {
  const wrapper = mount(<AfterSelectToolBar {...props} />);
  it('renders table correctly', () => {
    const div = wrapper.find('div');
    expect(div.length).toBe(1);
  });
  it('calls handleClickInverseSelection when inverse icon is clicked', () => {
    const inverseIcon = wrapper.find('IconButton').at(3);
    inverseIcon.simulate('click');
    expect(inverseIcon.length).toBe(1);
  });
  it('deselects selection when deselect icon is clicked', () => {
    const deselectIcon = wrapper.find('IconButton').at(2);
    deselectIcon.simulate('click');
    expect(deselectIcon.length).toBe(1);
  });
});

describe('Test table rendering and data functions', () => {
  const wrapper = mount(<Products {...props} />);
  it('should render the datatable correctly', () => {
    wrapper.instance().componentWillReceiveProps(props);
    expect(wrapper.instance().state.approvedProducts).toEqual([]);
    wrapper.instance().componentWillReceiveProps(props.data);
    expect(wrapper.instance().state.approvedProducts).toEqual([{
      id: 'id',
      productName: 'productName',
      productCategory: { name: 'Category' },
      measurementUnit: { name: 'Joules' },
      packSize: '2',
      skuNumber: 'serd',
      description: 'desc',
      brand: 'brand',
      manufacturer: 'manufacturer',
      vatStatus: 'vatstat',
      salesPrice: '23',
      nearestExpiryDate: '2019-12-12',
      preferedSupplier: { name: 'pref' },
      backupSupplier: { name: 'backup' },
    }]);
    wrapper.instance().componentWillReceiveProps(props.getApprovedProducts);
    expect(wrapper.instance().state.approvedProducts).toEqual([]);
    wrapper.instance().componentWillReceiveProps(props.getProposedProducts);
    expect(wrapper.instance().state.proposedProducts).toEqual([]);
  });
  it('should switch to proposed products when view proposed products is clicked', () => {
    wrapper.instance().handleViewProposed();
    expect(wrapper.instance().state.isApproved).toBeFalsy();
  });
});

describe('Test toolBar actions', () => {
  const prop = {
    classes: {
      iconButton: 'icon-button',
      popper: 'popper',
      paper: 'paper',
      exportSVG: 'export',
    },
    handleViewProposed: jest.fn(),
  };
  const wrapper = mount(<ToolBar {...prop} />);
  it('should toggle the add product popup when the icon is clicked', () => {
    document.createRange = () => ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document,
      },
    });
    wrapper.instance().setState({ open: false });
    const AddProductIcon = wrapper.find('IconButton').at(0);
    AddProductIcon.simulate('click');

    const MenuItem = wrapper.find('MenuItem').at(2);
    MenuItem.simulate('click');
    expect(wrapper.instance().state.open).toBeFalsy();
  });
});
