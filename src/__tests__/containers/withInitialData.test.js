import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import wait from 'waait';
import MockComponent from '../../../__mocks__/mockComponent';
import { MockedProvider } from 'react-apollo/test-utils';
import GET_COUNTRIES_PRODUCTS_CUSTOMERS from '../../queries/countryProductsCustomerQuery';
import WithInitialData, { WithInitialData as WithInitialDataWrapper } from '../../containers/withInitialData';
import Typography from 'material-ui/styles/typography';

// jest.mock('../../components/shared/ComingSoon', () => MockComponent);

describe('WithInitialData ', () => {
  const mocks = [
    {
      request: {
        query: GET_COUNTRIES_PRODUCTS_CUSTOMERS
      },
      result: {
        data: {
          approvedProducts: [
            {
              "id": "261",
              "productCategory": {
                "name": "pain killer"
              },
              "productName": "Panadol",
              "measurementUnit": {
                "name": "tablets"
              },
              "outlet": {
                "outletpreference": {
                  "outletCurrency": {
                    "symbol": "₦"
                  }
                }
              },
              "image": "https://res.cloudinary.com/dojaopytm/image/upload/v1563372103/panadol_ixpcjf.jpg",
              "skuNumber": "000261",
              "description": "Nice meds, they mess you real good",
              "brand": "Stans",
              "manufacturer": "Stans",
              "productQuantity": 85,
              "salesPrice": 408.0,
              "tags": []
            },
            {
              "id": "262",
              "productCategory": {
                "name": "pain killer"
              },
              "productName": "Chloroform",
              "measurementUnit": {
                "name": "bottles"
              },
              "outlet": {
                "outletpreference": {
                  "outletCurrency": {
                    "symbol": "₦"
                  }
                }
              },
              "image": "https://res.cloudinary.com/dojaopytm/image/upload/v1563435834/Chloroform_hxntxr.jpg",
              "skuNumber": "000262",
              "description": "a colourless, sweet-smelling organic compound with the IUPAC name Trichloromethane and formula CHCl3. Chloroform can daze or knock out people even when it's consumed in small doses.",
              "brand": "Bad people",
              "manufacturer": "Bad guys",
              "productQuantity": 43,
              "salesPrice": 153.0,
              "tags": []
            }
          ]
        }
      }
    }
  ];

  const props = {
    classes: 'vv',
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

  const Comp = () => (<h1>Test</h1>);

  it('renders without error', async () => {
    const wrapper = shallow(
      <MockedProvider addTypeName={false}>
        <Router>
        {
          WithInitialData(Comp)({})
        }
        </Router>
      </MockedProvider>
    )

    await wait(0);
   
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find('BrowserRouter').length).toEqual(1);
  });

  it('renders without error with a protected route', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <WithInitialData {...props} />
        </Router>
      </MockedProvider>
    );

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('Router').length).toEqual(1);
  });
});
