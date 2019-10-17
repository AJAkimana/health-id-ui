import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { DataTable } from '../../components/products/Templates/Table/DataTable';
describe('Supplier Page DataTable ', () => {
  const event = {
    stopPropagation: jest.fn(),
    currentTarget: {
      innerText: 1
    },
    target: {
      value: 'panadol'
    }
  };
  const props = {
    data: [],
    classes: {},
    columns: [],
    title: 'rfrfr',
    onRowClick: () => {},
    isAdmin: false,
    status: 'approved',
    handleViewProposed: () => {},
    totalCount: () => {},
    handleChangePage: () => {},
    pageNumber: 3,
    rowsCount: 10,
    handleSearch: () => {},
    loading: false,
    client: {
      query: () => {}
    },
  }
  const props2 = {
    data: [],
    classes: {},
    columns: [],
    title: 'rfrfr',
    onRowClick: () => {},
    isAdmin: false,
    status: 'approved',
    handleViewProposed: () => {},
    totalCount: () => {},
    handleChangePage: () => {},
    pageNumber: 3,
    rowsCount: 10,
    handleSearch: () => {},
    loading: true,
    client: {
      query: () => {}
    },
  }
  const props3 = {
    data: [
      {
        "id": "261",
        "productName": "Panadol",
        "skuNumber": "000261",
        "description": "Nice meds, they mess you real good",
        "brand": "Stans",
        "manufacturer": "Stans",
        "vatStatus": false,
        "productQuantity": 85,
        "salesPrice": 408.0,
        "nearestExpiryDate": "2019-08-13",
        "loyaltyWeight": 5,
        "tags": [],
        "productCategory": {
          "id": "15",
          "name": "pain killer"
        },
        "measurementUnit": {
          "id": "1",
          "name": "tablets"
        },
        "preferredSupplier": {
          "id": "2",
          "name": "sean2"
        },
        "backupSupplier": {
          "id": "2",
          "name": "sean2"
        }
      }
    ],
    classes: {},
    columns: [],
    title: 'rfrfr',
    onRowClick: () => {},
    isAdmin: false,
    status: 'approved',
    handleViewProposed: () => {},
    totalCount: () => {},
    handleChangePage: () => {},
    pageNumber: 3,
    rowsCount: 10,
    handleSearch: () => {},
    loading: true,
    client: {
      query: () => {}
    },
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<DataTable {...props} />);
    const wrapper2 = shallow(<DataTable {...props2} />);
    const wrapper3= shallow(<DataTable {...props3} />);
    wrapper3.instance().setState({ isSearching: true, selected: ['xnl', 'hop'] });
    wrapper3.instance().isSelected('xnl');
    wrapper3.instance().handleRowSeleted(null, 'xnl');
    wrapper3.instance().setState({ isSearching: true, selected: { indexOf: () => -1 } });
    wrapper3.instance().handleRowSeleted(null, 'xnl');
    wrapper3.instance().setState({ isSearching: true, selected: { indexOf: () => 1, length: 1, slice: () => {} } });
    wrapper3.instance().handleRowSeleted(null, 'xnl');
    wrapper3.instance().setState({ isSearching: true, selected: { indexOf: () => 1, length: 2, slice: () => {} } });
    wrapper3.instance().handleRowSeleted(null, 'xnl');
    wrapper2.instance().handleOnRowHover({ pageX: 345, pageY: 343 }, props3.data);
    wrapper2.instance().handleOnRowHover({ pageX: 900, pageY: 843 }, props3.data);
    wrapper.instance().handleHidePopup();
    wrapper.instance().handleClickSearch();
    wrapper3.instance().handleHideSearch();
    wrapper3.instance().setState({ order: 'asc', orderBy: 'name' });
    wrapper.instance().handleRequestSort(null, 'name');
    wrapper3.instance().setState({ order: 'desc', orderBy: 'name' });
    wrapper.instance().handleRequestSort(null, 'name');
    wrapper3.instance().handleSelectAllClick({ target: { checked: true } });
    wrapper3.instance().handleSelectAllClick({ target: { checked: false } });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
