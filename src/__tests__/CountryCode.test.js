import React from 'react';
import { mount } from 'enzyme';
import CountryCode from '../components/suppliers/AddSupplier/Inputs/CountryCode';

describe('CountryCode', () => {
  it('CountryCode', () => {
    const outlet = {
      city: {
        country: {
          name: 'name'
        }
      }
    };
    const countryCode = CountryCode(outlet);
    console.log('countryCode', countryCode);
  });
  it('CountryCode', () => {
    const outlet = {
      city: {
        country: {
          name: 'name_'
        }
      }
    };
    const countryCode = CountryCode(outlet);
    console.log('countryCode', countryCode);
  });
  it('CountryCode', () => {
    const outlet = {
      city: {
        country: {}
      }
    };
    const countryCode = CountryCode(outlet);
    console.log('countryCode', countryCode);
  });
});
