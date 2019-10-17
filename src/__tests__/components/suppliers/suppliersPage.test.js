import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import {GET_ALL_SUPPLIERS} from '../../../queries/getSuppliers';
import SuppliersPage, { SuppliersPage as SuppliersPageWrapper } from '../../../components/suppliers/SuppliersPage';
import { getSuppliers, getSlicedData } from '../../../components/utils/filter';
describe('SuppliersPage ', () => {
  const mocks = [
    {
      request: {
        query: GET_ALL_SUPPLIERS
      },
      result: {
        data: {
          allSuppliers: [
            {
              'id': '1',
              'rating': 1,
              'tier': {
                'name': 'one'
              },
              'isApproved': true,
              'name': 'first',
              'commentary': 'sfsd',
              "suppliernoteSet": []
            },
            {
              'id': '2',
              'rating': 5,
              'tier': {
                'name': 'one'
              },
              'isApproved': false,
              'name': 'sean2',
              'commentary': 'no comment',
              "suppliernoteSet": []
            },
            {
              'id': '2px6ibtpi',
              'rating': 5,
              'tier': {
                'name': 'one'
              },
              'isApproved': false,
              'name': 'Ntale.',
              'commentary': 'no comment',
              "suppliernoteSet": [
                {
                  'note': 'Kuddy Comment'
                }
              ]
            },
          ]
        },
        dataU: {
          allSuppliers: [
            undefined,
            undefined,
            undefined,
          ]
        },
        dataN: {},
        dataf: {
          filterSuppliers: {
            edges: [
              {
                node: {
                  'id': '1',
                  'rating': 1,
                  'tier': {
                    'name': 'one'
                  },
                  'isApproved': true,
                  'name': 'first',
                  'commentary': 'sfsd',
                  "suppliernoteSet": []
                }
              },
              {
                node: {
                  'id': '2',
                  'rating': 3,
                  'tier': {
                    'name': 'one'
                  },
                  'isApproved': true,
                  'name': 'first',
                  'commentary': 'sfsd',
                  "suppliernoteSet": []
                }
              }
            ]
          }
        },
        datafU: {
          filterSuppliers: {
            edges: [
              undefined,
              undefined
            ]
          }
        },
        datafN: {}
      }
    }
  ];

  const props = {
    session: {
      me: {
        username: 'tester',
        role: { name: 'Master Admin' },
        activeOutlet: {
          outletpreference: {
            outletTimezone: {
              name: 'Africa/Nairobi'
            }
          }
        }
      }
    },
    history: { push: jest.fn() },
    match: { params: { status: '' } }
  };

  it('renders without error', async () => {
    const wrapper = shallow(<Router><MockedProvider mocks={mocks} addTypename={false}><SuppliersPageWrapper {...props} /></MockedProvider></Router>);
    await wait(0);
    expect(wrapper.find('DataTableLoader').length).toEqual(0);
    wrapper.update();
    expect(wrapper.find('DataTable').length).toEqual(0);
  });
  it('update props ', async () => {
    const wrapper = shallow(<SuppliersPageWrapper {...props} />);
    wrapper.instance().handleViewProposed({ approved: true, proposed: false });
    wrapper.instance().handleViewProposed({ approved: false, proposed: true });
    wrapper.instance().handleViewProposed({ approved: true, proposed: true });
    wrapper.instance().handleViewProposed({ approved: false, proposed: false });
    wrapper.instance().handleChangeRowsPerPage({ target: { value: 0 } });
    wrapper.instance().handleTextChange({ target: { value: '' } });
    wrapper.instance().handleTextChange({ target: { value: 'eric' } });
    wrapper.instance().handleChangePage(null, 0);
    wrapper.instance().handleRequestSort(null, 'name')
    expect(typeof wrapper.instance().createColumns(['sds','sds'])).toBe('object');
 });
  it('renders without error with a protected route', async () => {
    const wrapper = shallow(<Router><MockedProvider mocks={mocks} addTypename={false}><SuppliersPage {...props} /></MockedProvider></Router>);
    expect(wrapper.find('Router').length).toEqual(1);
  });
  it('should return list of approved suppliers', () => {
    expect(typeof getSuppliers(mocks[0].result.dataf, true)).toBe('object');
  });
  it('should return list of approved suppliers', () => {
    expect(typeof getSuppliers(mocks[0].result.datafN, true)).toBe('object');
  });
  it('should return list of approved suppliers', () => {
    expect(typeof getSuppliers(mocks[0].result.datafU, true)).toBe('object');
  });
  it('should return list of proposed suppliers', () => {
    expect(typeof getSuppliers(mocks[0].result.data, false)).toBe('object');
  });
  it('should return list of approved suppliers', () => {
    expect(typeof getSuppliers(mocks[0].result.dataN, false)).toBe('object');
  });
  it('should return list of approved suppliers', () => {
    expect(typeof getSuppliers(mocks[0].result.dataU, false)).toBe('object');
  });
  it('should return empty array', () => {
    expect(typeof getSuppliers(undefined, true)).toBe('object');
  });
  it('should return empty array', () => {
    expect(typeof getSuppliers(mocks[0].result.data, "true")).toBe('object');
  });
  it('should return an array', () => {
    expect(typeof getSlicedData(getSuppliers(mocks[0].result.data, false), false, 0, 25, 'asc', 'name')).toBe('object');
  });
  it('should return an array', () => {
    expect(typeof getSlicedData(getSuppliers(mocks[0].result.dataf, true), true, 0, 25, 'asc', 'name')).toBe('object');
  });
});
