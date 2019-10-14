import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { ToolBar } from '../../../components/ordersAndSuppliers/toolBar';

const props = {
  handleChangeView: jest.fn(),
  handleViewOrders: jest.fn(),
  classes: {},
  isOrderOpen: true,
  openOrders: [],
};

describe('orders and suppliers component', () => {
  const wrapper = mount((
    <MockedProvider addTypename>
      <ToolBar {...props} />
    </MockedProvider>
  ));

  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });

  const OrdersComponent = wrapper.find('ToolBar');

  it('renders ToolBar component correctly', () => {
    expect(OrdersComponent.length).toBe(1);
  });
  it('toggles between open and closed orders when handleToggle is closed', () => {
    OrdersComponent.instance().handleToggle();
    expect(OrdersComponent.instance().state.open).toBeTruthy();
  });

  it('toggles between open and closed orders when handleToggleView is clicked', () => {
    OrdersComponent.instance().handleToggleView();
    expect(OrdersComponent.instance().state.openView).toBeTruthy();
  });


  it('closes popper when handleClose is called', () => {
    OrdersComponent.instance().handleClose();
    expect(OrdersComponent.instance().state.open).toBeFalsy();
  });
  it('toggles between closed and open orders when handleChangeView is called', () => {
    document.querySelector = () => ({
      checked: () => {}
    })
    OrdersComponent.instance().handleChangeView();
    expect(props.handleViewOrders).toBeCalled();
    expect(OrdersComponent.instance().state.open).toBeFalsy();
  });

});
