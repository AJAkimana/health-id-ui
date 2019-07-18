import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import UserProfiles from '../components/profile/Profile';
import UPDATE_USER_INFO from '../queries/updateUserQuery';

const userData = {
  me: {
    birthday: null,
    email: 'example@gmail.com',
    firstName: 'myco',
    id: 'r95lgda23',
    jobTitle: null,
    lastName: 'kibuuka',
    mobileNumber: '256704505050',
    profileImage: 'https://res.cloudinary.com/dojaopytm/image/upload/v1557672913/blob_ac4mh2.jpg',
    role: { name: 'Master Admin', __typename: 'RoleType' },
    startingDate: null,
    username: 'myth',
    outlets: [],
  }
};

const graphqlProps = {
  userData: {
    me: {
      birthday: '23-6-2019',
      email: 'example@gmail.com',
      firstName: 'myco',
      id: 'r95lgda23',
      jobTitle: null,
      lastName: 'kibuuka',
      mobileNumber: '256704505050',
      profileImage: 'https://res.cloudinary.com/dojaopytm/image/upload/v1557672913/blob_ac4mh2.jpg',
      role: { name: 'Master Admin', __typename: 'RoleType' },
      startingDate: null,
      username: 'myth',
      outlets: [],
    }
  },
  classes: {},
  updateUser: jest.fn(() => Promise.resolve()),
};

describe('Test profile container component with graphQL', () => {
  const mocks = [
    {
      request: {
        query: UPDATE_USER_INFO,
      },
      userData: {
        me: {
          birthday: null,
          email: 'example@gmail.com',
          firstName: 'myco',
          id: 'r95lgda23',
          jobTitle: null,
          lastName: 'kibuuka',
          mobileNumber: '256704505050',
          profileImage: 'https://res.cloudinary.com/dojaopytm/image/upload/v1557672913/blob_ac4mh2.jpg',
          role: { name: 'Master Admin', __typename: 'RoleType' },
          startingDate: null,
          username: 'myth',
          outlets: [],
        },
        error: undefined,
        loading: true,
      },
    },
  ];

  let mockedInstance;
  beforeEach(() => {
    mockedInstance = mount((
      <MockedProvider mocks={mocks} addTypename>
        <UserProfiles {...graphqlProps} />
      </MockedProvider>
    ));
  });

  it('updates state with results from the query', () => {
    expect(mockedInstance.find('UserProfile').props().userData.loading).toBe(true);
    mockedInstance.find('UserProfile').instance().fetchUserData({ ...userData });
    expect(mockedInstance.find('UserProfile').instance().state.email).toEqual('example@gmail.com');
  });

  it('calls handle password change', () => {
    mockedInstance.find('UserProfile').instance().setState({
      username: 'username',
      email: 'email',
      newEmail: 'newEmail',
      profileImage: 'profileImage',
      mobileNumber: 'mobileNumber',
      oldPassword: 'oldPassword',
      newPassword: 'newPassword',
      isLoading: false,

    });
    mockedInstance.find('UserProfile').instance().handlePasswordChange();
    mockedInstance.find('UserProfile').instance().handlePasswordMatch();
    mockedInstance.find('UserProfile').instance().setState({
      username: '',
      email: '',
      newEmail: '',
      profileImage: '',
      mobileNumber: '',
      oldPassword: '',
      newPassword: '',
      isLoading: true,

    });
    mockedInstance.find('UserProfile').instance().handlePasswordChange();
  });

  it('calls handleSelectiveUpdate method', async () => {
    const variables = {
      username: 'trial',
      email: 'now.test@now.com',
      profileImage: 'profileimageunder',
      mobileNumber: 256703333333,
      password: 'password12345'
    };
    await wait(0);
    mockedInstance.find('UserProfile').instance().handleSelectiveUpdate(variables);
  });
});
