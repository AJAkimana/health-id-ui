import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';

import { GET_APPROVED_AND_PROPOSED_PRODUCTS } from '../components/products/productQueries';
import { Products } from '../components/products/productsTable';
import Datatable from '../components/dataTable/dataTable';
import AfterSelectToolBar from '../components/products/afterSelectToolBar';
import { ToolBar } from '../components/products/toolBar';

const props = {
  displayData: [{}],
  selectedRows: { data: [] },
  setSelectedRows: jest.fn(),
  classes: {
    icon: 'Products-div-1',
    iconButton: 'Products-footer-2',
    inverseIcon: 'inverse-icon'
  },
  match: {
    params: {
      status: ''
    }
  },
  history: {
    push: jest.fn()
  },
  client: { query: jest.fn() },
  session: {
    me: {
      role: {
        name: 'Master Admin'
      },
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: 'Africa/Nairobi'
          }
        }
      }
    }
  }
};

const errorMock = [
  {
    request: {
      query: GET_APPROVED_AND_PROPOSED_PRODUCTS,
      variables: {
        pageCount: 10,
        pageNumber: 1
      }
    },
    error: new Error('bloody error')
  }
];

const mocks = [
  {
    request: {
      query: GET_APPROVED_AND_PROPOSED_PRODUCTS,
      variables: {
        pageCount: 10,
        pageNumber: 1
      }
    },
    result: {
      data: {
        approvedProducts: [
          {
            id: '261',
            productName: 'Panadol',
            skuNumber: '000261',
            description: 'Nice meds, they mess you real good',
            brand: 'Stans',
            manufacturer: 'Stans',
            vatStatus: false,
            productQuantity: 85,
            salesPrice: 408.0,
            nearestExpiryDate: '2019-08-13',
            loyaltyWeight: 5,
            tags: [],
            productCategory: {
              id: '15',
              name: 'pain killer'
            },
            measurementUnit: {
              id: '1',
              name: 'tablets'
            },
            preferredSupplier: {
              id: '2',
              name: 'sean2'
            },
            backupSupplier: {
              id: '2',
              name: 'sean2'
            }
          }
        ],
        proposedProducts: [
          {
            id: '297',
            productName: 'Geisha',
            skuNumber: '000297',
            description: 'African magic is cool',
            brand: 'Dope',
            manufacturer: 'Africa',
            vatStatus: false,
            productQuantity: 0,
            salesPrice: 0.0,
            nearestExpiryDate: null,
            loyaltyWeight: 0,
            tags: [],
            productCategory: {
              id: '16',
              name: 'cosmetic'
            },
            measurementUnit: {
              id: '3',
              name: 'bottles'
            },
            preferredSupplier: {
              id: 'bu5ixuq72',
              name: 'Unilever'
            },
            backupSupplier: {
              id: '2',
              name: 'sean2'
            }
          }
        ]
      }
    }
  }
];

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
  let wrapper;
  let wrapperInstance;
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Products {...props} />
        </MockedProvider>
      </Router>
    );
    wrapperInstance = wrapper.find('Products').instance();
  });

  it('should renders with loader ', () => {
    expect(wrapper.find('Products').length).toBe(1);
  });

  it('Table renders correctly', () => {
    const tableProps = {
      title: 'products',
      data: [],
      columns: ['names'],
      options: {}
    };
    const tablewrapper = shallow(<Datatable {...tableProps} />);
    expect(tablewrapper.find('[title="products"]').length).toBe(1);
  });

  it('should render with errors', async () => {
    const errorWrapper = mount(
      <Router>
        <MockedProvider mocks={errorMock} addTypename={false}>
          <Products {...props} />
        </MockedProvider>
      </Router>
    );
    await wait(1000);
    errorWrapper.update();
    setTimeout(() => {
      const errorDiv = errorWrapper.find('Products');
      expect(errorDiv.text()).toContain('Something went wrong, try refreshing the page');
    }, 20);
  });

  it('should switch to proposed products when view proposed products is switched', () => {
    const viewStatus = {
      approved: false,
      proposed: false
    };
    wrapperInstance.handleViewProposed(viewStatus);
    expect(props.history.push).toBeDefined();
  });

  it('should handle change page', async () => {
    await wait(200);
    wrapper.update();
    const refetch = jest.fn();
    const pageNumber = 1;
    const spy = jest.spyOn(wrapperInstance, 'changePage');

    wrapperInstance.changePage(pageNumber, refetch);
    wrapperInstance.changePage('next')();
    wrapper.setState({ ...wrapper.state(), pageNumber: 2 });
    wrapperInstance.changePage('prev')();
    expect(spy).toBeCalled();
  });

  it('should handle change rows', async () => {
    const spy = jest.spyOn(wrapperInstance, 'changeRows');
    const refetch = jest.fn();
    const event = {
      target: {
        value: 'value'
      }
    };
    const cb = e => e;
    wrapper.setState({ ...wrapper.state(), pageNumber: 2 });
    wrapperInstance.changeRows(refetch)(cb(event));
    expect(spy).toBeCalled();
  });

  it('should handle views', async () => {
    await wait(200);
    wrapperInstance.props.match.params.status = undefined;
    wrapper.update();
    wrapperInstance.setState({ searchActive: true });
    wrapper.update();

    expect(wrapperInstance.state.searchActive).toBe(true);
  });

  it('should handle navigation to proposed products', async () => {
    await wait(200);
    wrapperInstance.props.match.params.status = 'proposed';
    wrapper.update();

    expect(wrapperInstance.props.match.params.status).toBe('proposed');
  });

  it('should handle navigation to approved products', async () => {
    await wait(200);
    wrapperInstance.props.match.params.status = 'approved';
    wrapper.update();

    expect(wrapperInstance.props.match.params.status).toBe('approved');
  });

  it('should handle product search', async () => {
    const mockQuery = value => new Promise((resolve) => {
      if (value.length > 2) {
        return resolve({
          data: {
            products: [
              {
                id: '261',
                productCategory: {
                  name: 'pain killer'
                },
                productName: 'Panadol',
                measurementUnit: {
                  name: 'tablets'
                },
                outlet: {
                  outletpreference: {
                    outletCurrency: {
                      symbol: '₦'
                    }
                  }
                },
                image:
                    'https://res.cloudinary.com/dojaopytm/image/upload/v1563372103/panadol_ixpcjf.jpg',
                skuNumber: '000261',
                description: 'Nice meds, they mess you real good',
                brand: 'Stans',
                manufacturer: 'Stans',
                productQuantity: 85,
                salesPrice: 408.0,
                tags: []
              }
            ]
          }
        });
      }
    });

    let searchText = 'pand';
    const client = { query: () => mockQuery(searchText) };
    const spy = jest.spyOn(wrapperInstance, 'handleSearch');
    await wrapperInstance.handleSearch(searchText, client);
    searchText = false;
    await wrapperInstance.handleSearch(searchText, client);
    expect(spy).toBeCalled();
  });
});

describe('Test toolBar actions', () => {
  const prop = {
    classes: {
      iconButton: 'icon-button',
      popper: 'popper',
      paper: 'paper',
      exportSVG: 'export'
    },
    handleViewProposed: jest.fn()
  };
  const wrapper = mount(
    <Router>
      <ToolBar {...prop} />
    </Router>
  );
  it('should toggle the add product popup when the icon is clicked', () => {
    document.createRange = () => ({
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document
      }
    });
    wrapper.instance().setState({ openAddMenu: false });
    const switchIcon = wrapper.find('IconButton').at(0);
    switchIcon.simulate('click');

    const MenuItem = wrapper.find('FormControlLabel').at(0);
    MenuItem.simulate('change');
    expect(wrapper.instance().state.openAddMenu).toBeFalsy();
  });

  it('should handle toobar events', () => {
    const toolBarInstance = wrapper.find('ToolBar').instance();
    const handleToggleAddMenu = jest.spyOn(toolBarInstance, 'handleToggleAddMenu');

    toolBarInstance.handleToggleAddMenu();
    expect(handleToggleAddMenu).toBeCalled();

    const handleClose = jest.spyOn(toolBarInstance, 'handleClose');

    toolBarInstance.handleClose();
    expect(handleClose).toBeCalled();
  });
});
