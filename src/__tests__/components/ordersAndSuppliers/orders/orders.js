import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import Orders from '../../../../components/ordersAndSuppliers/orders/orders';

const props = {
  openOrders: [],
  closedOrders: [{
    orderNumber: '134',
    deliveryDate: '2019-01-12',
    name: 'qwerty',
    orderdetailsSet: [{
      product: {
        batchInfo: []
      },
      supplier: {
        name: 'Test Supplier'
      }
    }],
  }],
  isLoading: false,
  history: {
    push: jest.fn(),
  },
  status: 'all'
};


describe('orders and suppliers component', () => {
  let wrapper = mount((
    <MockedProvider addTypename>
      <Orders {...props} />
    </MockedProvider>
  ));

  const OrdersComponent = wrapper.find('Orders');

  it('renders orders component correctly', () => {
    expect(OrdersComponent.length).toBe(1);
  });

  it('should render correctly with supplier undefined', () => {
    props.closedOrders[0].orderdetailsSet[0].supplier = undefined;
    wrapper = mount((
      <MockedProvider addTypename>
        <Orders {...props} />
      </MockedProvider>
    ));
  });
  it('should render loader when loading is true', () => {
    props.isLoading = true;
    wrapper = mount((
      <MockedProvider addTypename>
        <Orders {...props} />
      </MockedProvider>
    ));
    expect(wrapper.find('DataTableLoader').length).toBe(1);
  });
  it('view open orders for open status', () => {
    const viewStatus = {
      open: true,
      closed: false
    };
    props.status = 'open';
    wrapper = mount((
      <MockedProvider addTypename>
        <Orders {...props} />
      </MockedProvider>
    ));
    OrdersComponent.instance().handleViewOrders(viewStatus);
    expect(props.history.push).toHaveBeenCalledTimes(1);
  });

  it('view closed orders for closed status', () => {
    const viewStatus = {
    };
    props.status = 'closed';
    wrapper = mount((
      <MockedProvider addTypename>
        <Orders {...props} />
      </MockedProvider>
    ));
    OrdersComponent.instance().handleViewOrders(viewStatus);
    expect(props.history.push).toHaveBeenCalledTimes(2);
  });

  it('view 0 orders for undefined status', () => {
    const viewStatus = {
    };
    props.status = undefined;
    wrapper = mount((
      <MockedProvider addTypename>
        <Orders {...props} />
      </MockedProvider>
    ));
    OrdersComponent.instance().handleViewOrders(viewStatus);
    expect(props.history.push).toHaveBeenCalledTimes(3);
  });
});
