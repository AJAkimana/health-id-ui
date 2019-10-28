import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import _ from '../../__mocks__/mockUseContext';
import ProductDetailRender from '../components/products/productDetailRender';

beforeEach(() => {
  const useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());
})

const props = {
  product: {
    id: 1,
    productName: '',
    skuNumber: 1,
    salesPrice: 5,
    measurementUnit: {
      name: '',
    },
    manufacturer: '',
    productCategory: {
      name: ''
    },
    description: '',
    brand: '',
    vatStatus: '',
    nearestExpiryDate: 12,
    preferredSupplier: {
      name: ''
    },
    loyaltyWeight: 10,
    backupSupplier: {
      name: '',
    },
    tags: ['tag1', 'tag2'],
    batchInfo: [{
      id: 1,
      quantityReceived: 1,
      batchNo: 1,
      packSize: 1,
      dateReceived: 1,
      unitCost: 1,
      supplier: {
        name: '',
      },
      expiryDate: 1,
      commentary: '',
    }],
    outlet: {
      outletpreference: {
        outletCurrency: {
          symbol: '#'
        }
      }
    },
    productQuantity: 1
  },
  classes: {},
  session: {
    me: {
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

describe('render ProductDetailRender component', () => {
  const wrapper = mount(
    <BrowserRouter>
      <ProductDetailRender {...props} />
    </BrowserRouter>
  );
  it('renders 16 textfields', () => {
    expect(wrapper.find('TextField').length).toBe(16);
  });
});
