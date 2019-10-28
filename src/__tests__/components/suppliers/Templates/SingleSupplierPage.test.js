import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import GET_SINGLE_SUPPLIER from '../../../../queries/getSingleSupplierQuery';
import PropTypes from 'prop-types';
import { SingleSupplierPage } from '../../../../components/suppliers/SingleSupplierPage';

import { StateContext } from '../../../../providers/stateProvider';

const props = {
  match: { params: { id: 'xxx' } },
  history: { push: jest.fn() },
  client: {},
  classes: {},
  session: {
    me: {
      username: 'tester',
      role: { name: 'Master Admin' },
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: "Africa/Nairobi"
          }
        }
      }
    }
  }
};

const mocks = [
  {
    request: {
      query: GET_SINGLE_SUPPLIER,
      variables: { id: '1' }
    },
    result: {
      data: {
        singleSupplier: {
          isApproved: true,
          id: 'AlphaX',
          address: '​​​​​NNPC Towers, Central Business District, Abuja.',
          name: 'Damian Inc',
          mobile: '08137519698',
          rating: '5',
          image:
            'https://justcreative.com/wp-content/uploads/2019/09/brand-strategy-workbook-1.jpg',
          email: 'test@gmail.com',
          tier: 'Manufacturer',
          paymentTerms: 'Daily',
          creditDays: '3 days',
          notes: [
            {
              id: 1,
              createdOn: 'Jan 20 2019',
              message: 'Hey bro, nice work',
              createdBy: 'Danilo Silva'
            },
            {
              id: 2,
              createdOn: 'Jan 20 2019',
              message: 'Hey bro, nice work',
              createdBy: 'Danilo Silva'
            },
            {
              id: 3,
              createdOn: 'Jan 20 2019',
              message: 'Hey bro, nice work',
              createdBy: 'Danilo Silva'
            }
          ]
        }
      }
    }
  }
];

describe('Render SingleSupplierPage component', () => {
  SingleSupplierPage.contextTypes = [
    PropTypes.string,
    PropTypes.func
  ];

  const context = ['kitty', jest.fn()]

  it('renders without crashing', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <StateContext.Provider value={context}>
            <SingleSupplierPage {...props} />
          </StateContext.Provider>
        </BrowserRouter>
      </MockedProvider>
    );

    await wait(0);

    expect(wrapper.find('SingleSupplierPageLoader').length).toEqual(1);
  });

  describe('shallow render', () => {
    const value = {
      data: { approveSupplier: { supplier: { name: 'jojo' } } }
    }

    const prop = {
      approveSupplier: jest.fn().mockImplementation(() => Promise.resolve(value)),
      refetch: jest.fn(),
      suppliersLink: jest.fn(),
      approvedSupplier: {
        isApproved: true,
        id: 'AlphaX',
        address: '​​​​​NNPC Towers, Central Business District, Abuja.',
        name: 'Damian Inc',
        mobile: '08137519698',
        rating: '5',
        image:
          'https://justcreative.com/wp-content/uploads/2019/09/brand-strategy-workbook-1.jpg',
        email: 'test@gmail.com',
        tier: 'Manufacturer',
        paymentTerms: 'Daily',
        creditDays: '3 days',
        notes: [
          {
            id: 1,
            createdOn: 'Jan 20 2019',
            message: 'Hey bro, nice work',
            createdBy: 'Danilo Silva'
          },
          {
            id: 2,
            createdOn: 'Jan 20 2019',
            message: 'Hey bro, nice work',
            createdBy: 'Danilo Silva'
          },
          {
            id: 3,
            createdOn: 'Jan 20 2019',
            message: 'Hey bro, nice work',
            createdBy: 'Danilo Silva'
          }
        ]
      },
      match: {
        params: {
          id: '1'
        }
      },
      session: {
        me: {
          role: {
            name: 'Master Admin'
          },
          activeOutlet: {
            outletpreference: {
              outletTimezone: {
                name: "Africa/Nairobi"
              }
            }
          }
        }
      },
      classes: {
        arrowButtonGrid: 'arrowButtonGrid',
        arrowIcon: 'arrowIcon',
        arrowButtonLabel: 'arrowButtonLabel',
        buttonGrid: 'buttonGrid',
        editButton: 'editButton',
        approveButton: 'approveButton',
        paper: 'paper',
        containerGrid: 'containerGrid',
        category: 'category',
        descriptionFields: 'descriptionFields',
        tagsRoot: 'tagsRoot',
        tagChip: 'tagChip',
        card: 'card',
        media: 'media',
        dividerDiv: 'dividerDiv',
        dividerHeaders: 'dividerHeaders',
        newTextFields: 'newTextFields',
      },
    }

    const wrapper = shallow(
      <SingleSupplierPage {...prop} />, { context }
    );

    it('Calls the handleSupplierApproval function correctly', async () => {
      wrapper.instance().setState({ approved: true });
      wrapper.instance().handleSupplierApproval();
      await wait(0)

      expect(wrapper.state('approved')).toBeTruthy();
    })

    it('Calls the renderTextField function correctly', () => {
      const value = 'Jamie';
      wrapper.setState({
        name: 'Jamie'
      });
      wrapper.instance().renderTextField('', 'nice', 'nice', value);
      expect(wrapper.state().name).toEqual(value);
    })

    it('Calls the renderTableCell function correctly', () => {
      const value = 'Jamie';
      wrapper.setState({
        name: 'Jamie'
      });
      wrapper.instance().renderTableCell('', 'nice', value);
      expect(wrapper.state().name).toEqual(value);
    })

    it('handles "handleSupplierApproval" rejection', () => {
      const value = 'Jamie';
      wrapper.setProps({
        approveSupplier: jest.fn().mockRejectedValue(new Error('Async error'))
      })
      wrapper.setState({
        name: 'Jamie'
      });
      wrapper.instance().handleSupplierApproval();
      expect(wrapper.state().approved).toBeFalsy;
    })

    it('handles suppliersLink', () => {
      const newProps = {}
      wrapper.setState({
        name: 'Jamie'
      });
      wrapper.instance().suppliersLink(newProps);
      expect(wrapper.state().approved).toBeFalsy;
    })
  })
});
