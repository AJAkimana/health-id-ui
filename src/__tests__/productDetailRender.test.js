import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import ProductDetailRender from '../components/products/productDetailRender';

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
    preferedSupplier: {
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
      outlet: {
        preference: {
          outletCurrency: {
            symbol: ''
          }
        }
      }
    }],
    productQuantity: 1
  },
  classes: {},
  session: {
    me: {}
  }
};

describe('render ProductDetailRender component', () => {
  const wrapper = mount(
    <BrowserRouter>
      <ProductDetailRender {...props} />
    </BrowserRouter>
  );
  it('renders 26 textfields', () => {
    expect(wrapper.find('TextField').length).toBe(17);
  });
});
