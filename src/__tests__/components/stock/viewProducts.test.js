import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import { GET_ALL_APPROVED_PRODUCTS } from '../../../queries/stockProducts';
import ViewProducts, { ViewProducts as ViewProductsWrapper } from '../../../components/stock_control/viewProducts';

describe('ViewProducts ', () => {
  const mocks = [
    {
      request: {
        query: GET_ALL_APPROVED_PRODUCTS
      },
      result: {
        data: {
          approvedProducts: [
            {
              'id': '35',
              'productName': 'podophyllin',
              'measurementUnit': {
                'name': 'syrup'
              },
              "batchInfo": [
                {
                  "batchNo": "BN201905171031-amk7okmvp",
                  "dateReceived": null,
                  "expiryDate": "2019-05-20",
                  "quantity": null,
                  "id": "345678912"
                }
              ],
              'description': 'first treatment people try for mild to moderate pain',
              'image': 'healthid-web-api.herokuapp.com/healthid',
              'tags': [
                'painkillers',
                'panadol'
              ],
              'skuNumber': '000035',
              'productQuantity': null
            },
            {
              'id': '78',
              'productName': 'Ventolin',
              'measurementUnit': {
                'name': 'tablets'
              },
              "batchInfo": [
                {
                  "batchNo": "BN201905171031-amk7okmvp",
                  "dateReceived": null,
                  "expiryDate": "2019-05-20",
                  "quantity": null,
                  "id": "345678912"
                }
              ],
              'description': 'first treatment people try for mild to moderate pain',
              'image': 'https://res.cloudinary.com/dojaopytm/image/upload/v1558444184/productPlaceholder.png',
              'tags': ['name', 'time'],
              'skuNumber': '000078',
              'productQuantity': null
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
        role: { name: "Master Admin" },
        activeOutlet: {
          outletpreference: {
            outletTimezone: {
              name: "Africa/Nairobi"
            }
          }
        }
      }
    },
    history: { push: jest.fn() },
  };


  it('renders without error', async() => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <ViewProductsWrapper {...props} />
        </Router>
      </MockedProvider>
    );
    await wait(0);
    expect(wrapper.find('DataTableLoader').length).toEqual(1);
    expect(wrapper.find('DataTable').length).toEqual(0)
  });

  it('renders without error with a protected route', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ViewProducts {...props} />
      </MockedProvider>
    );
    expect(wrapper.props('session')['children']['props'].session.me.username).toEqual('tester');
  });
});
