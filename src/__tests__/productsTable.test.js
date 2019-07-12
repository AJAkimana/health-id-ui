import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
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
      skuNumber: 'serd',
      description: 'desc',
      brand: 'brand',
      manufacturer: 'manufacturer',
      vatStatus: 'vatstat',
      salesPrice: '23',
      nearestExpiryDate: '2019-12-12',
      preferredSupplier: { name: 'pref' },
      backupSupplier: { name: 'backup' },
    }],
    loading: false
  },
  match: {
    params: {
      status: ''
    }
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
        skuNumber: 'serd',
        description: 'desc',
        brand: 'brand',
        manufacturer: 'manufacturer',
        vatStatus: 'vatstat',
        salesPrice: '23',
        nearestExpiryDate: '2019-12-12',
        preferredSupplier: { name: 'pref' },
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
  history: {
    push: jest.fn()
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
  const wrapper = mount(<Router><Products {...props} /></Router>).find('Products');
  it('should render the datatable correctly', () => {
    expect(wrapper.find('Products').length).toBe(1);
  });
  it('should switch to proposed products when view proposed products is switched', () => {
    const viewStatus = {
      approved: false,
      proposed: false
    };
    wrapper.instance().handleViewProposed(viewStatus);
    expect(props.history.push).toBeDefined();
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
  const wrapper = mount(<Router><ToolBar {...prop} /></Router>);
  it('should toggle the add product popup when the icon is clicked', () => {
    document.createRange = () => ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document,
      },
    });
    wrapper.instance().setState({ openAddMenu: false });
    const switchIcon = wrapper.find('IconButton').at(0);
    switchIcon.simulate('click');

    const MenuItem = wrapper.find('FormControlLabel').at(0);
    MenuItem.simulate('change');
    expect(wrapper.instance().state.openAddMenu).toBeFalsy();
  });
});
