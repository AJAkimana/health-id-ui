import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import GET_USER_INFO from '../queries/userDataQuery';
import withAuth from '../components/withAuth';


describe('Mocked withAuth', () => {
  let mocks;
  beforeEach(() => {
    mocks = [
      {
        request: { query: GET_USER_INFO },
        result: {
          data: {
            me: {
              id: 'aul5xrp73',
              email: 'you.for@example.com',
              username: 'Ronnie',
              role: {
                name: 'Master Admin'
              }
            },
          },
        },
      },
    ];
  });

  it('should render the component only when the condition passes', async () => {
    const conditionalFunction = withAuth;
    const conditionFunc = jest.fn().mockReturnValue(true);

    const wrapper = mount((
      <MockedProvider mocks={mocks} addTypename={false}>
        <conditionalFunction conditionFunc={conditionFunc} />
      </MockedProvider>
    ));
    await wait(0);
    expect(wrapper.html()).not.toBe(null);
  });
});
