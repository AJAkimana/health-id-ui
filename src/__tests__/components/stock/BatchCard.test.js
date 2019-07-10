import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import { BatchCard } from '../../../container/stock/BatchCard';
import { EDIT_QUANTITY } from '../../../mutations/stockControl';

describe('BatchCard ', () => {
  const props = {
    data: [
      {
        batchNo: 'BN201905031224-crxe4kura',
        dateReceived: '2019-12-03',
        expiryDate: '2019-02-10',
        quantity: null,
        id: 'cdz6gnt98'
      },
      {
        batchNo: 'BN201906140755-ctdzr3igb',
        dateReceived: '2019-12-03',
        expiryDate: '2020-02-10',
        quantity: 37,
        id: '9527zyzqu'
      },
      {
        batchNo: 'BN201906140756-b64ye1cii',
        dateReceived: '2019-12-03',
        expiryDate: '2020-02-10',
        quantity: 37,
        id: '67zha89d7'
      }
    ],
    name: 'Panadol',
    productId: ["4"],
    classes: {
      title: 'title',
      heading: 'heading',
      scrollWrapper: 'wrapper',
      root: 'root',
      divider: 'divider',
      card: 'card',
      icon: 'icon'
    }
  };
  const variables = { quantities: 14, product: [34], batchId: 'cdz6gnt98' };
  const mocks = [
    {
      request: {
        query: EDIT_QUANTITY,
        variables
      },
      result: { data: { message: 'successfully done it' } }
    }
  ];
  const editQuantity = jest.fn();

  it('renders without crashing', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BatchCard {...props} />
      </MockedProvider>
    );

    expect(wrapper.find('[name="Panadol"]').length).toBe(1);
  });

  it('responds to onClick events', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BatchCard {...props} />
      </MockedProvider>
    );
    const event = {
      target: { value: '563' }
    };

    expect(wrapper.find('[data-panel="cdz6gnt98"]').length).toBe(5);
    expect(wrapper.find('[name="quantity"]').length).toBe(0);
    wrapper
      .find('[data-panel="cdz6gnt98"]')
      .at(1)
      .simulate('click', (event, 'cdz6gnt98', editQuantity));
    expect(wrapper.find('[name="quantity"]').length).toBe(1);
    wrapper
      .find('[data-panel="cdz6gnt98"]')
      .at(1)
      .simulate('click', (event, 'cdz6gnt98', editQuantity));
  });

  it('responds to onchange events', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BatchCard {...props} />
      </MockedProvider>
    );
    const event = {
      target: { value: '3454' }
    };

    expect(wrapper.find('[name="quantity"]').length).toBe(0);
    wrapper
      .find('[data-panel="cdz6gnt98"]')
      .at(1)
      .simulate('click', (event, 'cdz6gnt98', editQuantity));
    expect(wrapper.find('[name="quantity"]').length).toBe(1);
    wrapper.find('[name="quantity"]').simulate('click', event);
    wrapper.find('[name="quantity"]').simulate('change', event);
  });
});
