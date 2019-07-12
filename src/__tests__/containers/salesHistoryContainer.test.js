import React from 'react';
import { shallow, mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';
import MockComponent from '../../../__mocks__/mockComponent';
import GET_USER_INFO from '../../queries/userDataQuery';
import GET_SALES_HISTORY from '../../queries/salesHistoryQuery';
import SalesHistoryData, { SalesHistory } from '../../containers/salesHistoryContainer';

jest.mock('../../components/sell/salesHistory/salesHistoryDetails', () => MockComponent);

const props = {
  session: {
    me: {
      outlets: [{ id: 1 }]
    }
  },
};

describe('SellScreenContainer with InitialData', () => {
  const authMocks = [
    {
      request: { query: GET_USER_INFO },
      result: {
        data: {
          me: {
            id: 'aul5xrp73',
            email: 'you.for@example.com',
            mobileNumber: '07834562781',
            username: 'Ronnie',
            role: {
              name: 'Master Admin',
              __typename: '',
            },
            users: [{
              id: 1,
              __typename: '',
            }],
            __typename: ''
          },
        }
      },
    },
  ];

  const mocks = [{
    request: {
      query: GET_SALES_HISTORY,
      variables: { outletId: 1 },
    },
    result: {
      data: {
        outletSalesHistory: [{
          id: '3',
          createdAt: '2019-06-28T04:58:43.043794+00:00',
          salesPerson: {
            firstName: 'myco',
            lastName: 'kibuuka',
            __typename: ''
          },
          receipt: {
            receiptNo: 1,
            __typename: ''
          },
          amountToPay: 38.1,
          customer: {
            firstName: '',
            lastName: '',
            __typename: ''
          },
          outlet: {
            name: 'Transcend Pharmacy',
            city: {
              name: 'Kampala',
              __typename: ''
            },
            __typename: ''
          },
          __typename: ''
        }]
      },
    },
  }];
  it('renders without crashing', async () => {
    const wrapper = mount((
      <MockedProvider mocks={mocks}>
        <MockedProvider mocks={authMocks}>
          <BrowserRouter>
            <SalesHistoryData {...props} />
          </BrowserRouter>
        </MockedProvider>
      </MockedProvider>
    ));
    await wait(0);
  });

});

describe('SellScreenContainer', () => {
  const wrapper = shallow(
    <SalesHistory {...props} />
  );
  let date;
  beforeEach(() => {
    wrapper.instance().setState({
      initialData: null,
      salesData: '',
      openSearchPopper: false,
      searchPopperAnchorEl: null,
    });
    date = new Date();
  });
  it('renders without crashing', () => {
    const fragment = wrapper.find('Fragment').length;
    expect(fragment).toBe(1);
  });
  it('handles DateTime Filter', () => {
    const initialData = [{
      dateSold: date,
      timeSold: '12:00'
    }];
    wrapper.setState({ initialData });
    const selection = {
      startDate: date,
      endDate: date
    };
    const timeValue = { start: '00:00', end: '23:59'};
    wrapper.instance().handleDateTimeFilter(selection, timeValue);
    expect(wrapper.state('salesData')).toEqual(initialData);
  });
  it('handles Sales Search with value', () => {
    const value = 'jojo';
    const initialData = [{
      soldBy: 'jojo',
      soldTo: 'momo'
    }];
    wrapper.setState({ initialData });
    wrapper.instance().handleSalesSearch(value);
    expect(wrapper.state('salesData')).toEqual(initialData);
  });
  it('handles Sales Search without value', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleResetSales');
    const value = '';
    const initialData = [{
      soldBy: 'jojo',
      soldTo: 'momo'
    }];
    wrapper.setState({ initialData });
    wrapper.instance().handleSalesSearch(value);
    expect(spy).toHaveBeenCalled();
  });
  it('handle Search Filter', () => {
    const searchValue = { from: date, to: date, outlet: 'Transcend | Register 1' };
    const salesData = [{
      dateSold: date,
      location: 'Transcend | Register 1'
    }];
    wrapper.setState({ salesData });
    wrapper.instance().handleSearchFilter(searchValue);
    expect(wrapper.state('openSearchPopper')).toBe(false);
  });
  it('creates Columns', () => {
    const headers = ['soldTo, soldBy'];
    wrapper.instance().createColumns(headers);
    expect(wrapper.state('openSearchPopper')).toBe(false);
  });
  it('sets Initial Data', () => {
    const data = [{
      id: 1,
      createdAt: date,
      salesPerson: { firstName: 'jojo', lastName: 'momo' },
      receipt: { receiptNo: 123 },
      customer: { firstName: 'coco', lastName: 'popo' },
      outlet: { name: '', city: { name: '' } },
      amountToPay: 30,
      register: { id: 12345 }
    }];
    wrapper.instance().setInitialData(data);
    expect(wrapper.state('salesData')).toBeTruthy();
  });
});
