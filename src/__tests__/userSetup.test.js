import React from 'react';
import { shallow } from 'enzyme';
import UserSetup from '../components/setup/userSetup';

const props = {
  state: {
    showUsers: true,
    fName: 'fName',
    lName: 'lName',
    userUsername: 'username',
    userEmail: 'email@test.mail',
    phone: '+234723254765',
    jobTitle: 'Cashier',
    roleId: '23',
    outlet: 'dafavzfdavc',
    startingDate: '2019-12-12',
    users: [],
    target: '30000',
    roles: [{ id: '23', name: 'Master Admin' }],
    outlets: [{ id: 'weds', name: 'Nairobi' }],
  },
  handleInPutChange: jest.fn(),
  handleClickAddButton: jest.fn(),
  sendEditInfo: jest.fn(),
  errorHandler: jest.fn(),
};

describe('Render UserSetup component without business users', () => {
  let wrapper = shallow(<UserSetup {...props} />);
  let textFields = wrapper.find('TextField').length;
  it('renders 10 text fields', () => {
    expect(textFields).toBe(10);
  });
  it('displays roles correctly in the dropdown', () => {
    const rolesSelect = wrapper.find('.role');
    expect(rolesSelect.length).toBe(1);
  });
  it('captures errors when the form is not filled', () => {
    const prop = {
      state: {
        userUsername: '',
        userEmail: '',
        phone: '',
        roleId: '',
        outlet: '',
        users: [],
      },
      errorHandler: jest.fn(),
    };

    wrapper = shallow(<UserSetup {...prop} />);
    textFields = wrapper.find('TextField').length;
    expect(textFields).toBe(10);
  });
});

describe('Renders Invited Users when there are users', () => {
  props.state.users =  [{
    firstName: 'fName',
    lastName: 'lName',
    email: 'fname@gmail.com',
    users: [{ id: 'outletId' }],
    role: { id: 'roleId' },
    username: 'username',
    isActive: false,
    target: 'target',
    startingDate: '2019-01-01',
    id: 'userId',
    mobileNumber: '+238724536246',
    jobTitle: 'Cashier',
  },
  {
    firstName: 'fName',
    lastName: 'lName',
    email: 'loggedin@user.com',
    users: [{ id: 'outletId' }],
    role: { id: 'roleId' },
    username: 'user_name',
    isActive: false,
    target: 'target',
    startingDate: '2019-01-01',
    id: 'user_Id',
    mobileNumber: '+238724536259',
    jobTitle: 'Cashier',
  },
  ];
  const wrapper = shallow(<UserSetup {...props} />);
  it('should render invited users when there are users', () => {
    const InvitedUsersComponent = wrapper.find('InvitedUsers');
    expect(InvitedUsersComponent.length).toBe(1);
  });
});
