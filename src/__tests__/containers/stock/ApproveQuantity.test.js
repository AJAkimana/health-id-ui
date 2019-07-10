import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';

import { ApproveQuantity } from '../../../container/stock/ApproveQuantity';
import { APPROVE_QUANTITY } from '../../../mutations/stockControl';

describe('ApproveQuantity ', () => {
  const props = {
    ApproveEdit: jest.fn(),
    batchId: 'cdz6gnt98',
    productId: "4",
    classes: {}
  };
  const variables = { quantities: 14, product: [34], batchId: 'cdz6gnt98' };
  const mocks = [
    {
      request: {
        query: APPROVE_QUANTITY,
        variables
      },
      result: { data: { message: 'successfully approved change' } }
    }
  ];

  it('renders without crashing', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApproveQuantity {...props} />
      </MockedProvider>
    );

    expect(wrapper.find('[data-batchid="cdz6gnt98"]').length).toBe(10);
  });

  it('responds to onClick events', () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ApproveQuantity {...props} />
      </MockedProvider>
    );
    const event = {
      target: { value: '563' }
    };

      wrapper.find('[data-batchid="cdz6gnt98"]').forEach((button) => {
          button.simulate('click', event);
      });
    expect(wrapper.find('[data-batchid="cdz6gnt98"]').length).toBe(10);
  });
});
