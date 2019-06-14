import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import GET_ALL_APPROVED_PRODUCTS from '../../queries/stockProducts';
import ViewProducts, { ViewProducts as ViewProductsWrapper } from '../../components/stock_control/viewProducts';

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

  const errorMocks = [
    {
      request: {
        query: GET_ALL_APPROVED_PRODUCTS
      },
      result: {
        errors: [{ message: 'Error!' }],
      },
    }
  ];
  const props = {
    session: { me: { username: 'tester' } },
    history: { push: jest.fn() }
  };

  it('renders without error', async() => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ViewProductsWrapper {...props} />
      </MockedProvider>
    );
    await wait(2000);
    expect(wrapper.find('ProductLoader').length).toEqual(1);
    expect(wrapper.find('DataTable').length).toEqual(0)
  });

  it('renders with an error', async() => {
    const wrapper = mount(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <ViewProductsWrapper {...props} />
      </MockedProvider>
    );
    await wait(0);
    expect(wrapper.find('ProductLoader').length).toEqual(1);
    expect(wrapper.find('DataTable').length).toEqual(0)
  });

  it('calls renderSortIcon method', () => {
    const wrapper = shallow(<ViewProductsWrapper {...props} />);
    const ascendIcon = wrapper.instance().renderSortIcon('asc');
    const descendIcon = wrapper.instance().renderSortIcon('desc');

    expect(ascendIcon.props.className).toEqual('sort_icons');
    expect(descendIcon.props.className).toEqual('sort_icons');
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
