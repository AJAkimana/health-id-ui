/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import { Preferences } from '../../components/main_setup/mainPreferences';


describe("Outlet Preferences", () => {
  const dummyAdminSession = {
    me: {
      email: 'test@mail.com',
      firstName: 'test',
      id: '1234567',
      lastName: 'tester',
      phone: '+254717123456',
      role: {
        name: 'Master Admin',
        __typename: 'RoleType'
      },
      secondaryEmail: 'njihiadee@outlook.com',
      secondaryPhone: '+254717123456',
      username: 'darius',
    }
  };

  Preferences.contextTypes = [
    PropTypes.string,
    PropTypes.func
  ];

  const context = ['kitty', jest.fn()]

  const wrapper = shallow(
    <Preferences
      session={dummyAdminSession}
      getAllCurrencies={
        {
          currencies: [
            {
              name: "US Dollar",
              symbol: "$"
            }
          ],
        }
      }
      getAllTimezones={
        {
          timezones: [
            {
              id: "1",
              name: "Nairobi",
              timeZone: "(GMT+0300) Nairobi"
            }
          ]
        }
      }
      updatePreferences={
        jest.fn(
          () => Promise.resolve({})
        )
      }
      getPreferences={
        {
          outletPreference: {
            preferenceId: 1,
            outletCurrency: {
              name: "US Dollar",
              symbol: "$"
            },
            outletTimezone: {
              id: "1",
              name: "Nairobi",
              timeZone: "(GMT+0300) Nairobi"
            },
            vatRate: {
              vat: 0
            },
            minimumWeeksForSalesVelocity: 0,
            salesVelocity: 0,
            reorderPoint: 0,
            reorderMax: 0,
            barcodeScanning: false,
            sendEmail: false,
            salesHold: false,
            selectedPayment: "both",
            alertNearExpiry: false,
            alertLowInventory: false,
            weeksToStartSupplyAlert: 0,
          },
          refetch: jest.fn()
        }
      }
    />, { context }
  )
  it("Should render the component", () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it("Should call handleChangeSwitch", () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleChangeSwitch')

    wrapper.instance().handleChangeSwitch(
      'alertNearExpiry'
    )(
      {
        target: {
          checked: true
        }
      }
    )

    expect(spy).toHaveBeenCalled()
    expect(wrapper.instance().state.changesMade).toBeTruthy()
    expect(wrapper.instance().state.alertNearExpiry).toBeTruthy()
  })

  it("Should call handleChange", () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleChange')

    wrapper.instance().handleChange(
      'vat'
    )(
      {
        target: {
          value: 12
        }
      }
    )

    expect(spy).toHaveBeenCalled()
    expect(wrapper.instance().state.changesMade).toBeTruthy()
    expect(wrapper.instance().state.vat).toBe(12)
  })

  it("Should call handlePayment", () => {
    const spy = jest.spyOn(wrapper.instance(), 'handlePayment')

    wrapper.instance().handlePayment('cash')()

    expect(spy).toHaveBeenCalled()
    expect(wrapper.instance().state.changesMade).toBeTruthy()
    expect(wrapper.instance().state.selectedPayment).toBe('cash')
  })

  it("Should call handleCurrencyChange", () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleCurrencyChange')

    wrapper.instance().handleCurrencyChange(
      'selectedCurrency'
    )(
      {
        label: 'Kenyan Shilling',
      }
    )

    expect(spy).toHaveBeenCalled()
    expect(wrapper.instance().state.changesMade).toBeTruthy()
    expect(wrapper.instance().state.selectedCurrency).toBe('Kenyan Shilling')
  })

  it("Should call handleTimezoneChange", () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleTimezoneChange')

    wrapper.instance().handleTimezoneChange()(
      {
        id: 1,
        label: '(GMT +0300) Nairobi',
      }
    )

    expect(spy).toHaveBeenCalled()
    expect(wrapper.instance().state.changesMade).toBeTruthy()
    expect(wrapper.instance().state.selectedTimezone.label).toBe('(GMT +0300) Nairobi')
  })

  it("Should submit the data inputted", () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit')
    const notify = jest.fn()

    wrapper.instance().handleSubmit()

    expect(spy).toHaveBeenCalled()
  })
});
