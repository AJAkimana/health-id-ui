import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import GET_ALL_SUPPLIERS from '../../../queries/getSuppliers';
import SuppliersPage, { SuppliersPage as SuppliersPageWrapper } from '../../../components/suppliers/SuppliersPage';

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
              'name': 'Ntale.',
              'commentary': 'no comment',
              "suppliernoteSet": [
                {
                  'note': 'Kuddy Comment'
                }
              ]
            },
          ]
        }
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
  };

  it('renders without error', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <SuppliersPageWrapper {...props} />
        </Router>
      </MockedProvider>
    );
    await wait(0);
    expect(wrapper.find('DataTableLoader').length).toEqual(1);
    wrapper.update();
    expect(wrapper.find('DataTable').length).toEqual(0)
  });

  it('renders without error with a protected route', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <SuppliersPage {...props} />
        </Router>
      </MockedProvider>
    );
    expect(wrapper.find('Router').length).toEqual(1);
  });
});
