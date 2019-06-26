import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import MockComponent from '../../__mocks__/mockComponent';
import { ProductDetail } from '../containers/productDetail';
import PRODUCT_DETAIL_QUERY from '../queries/productDetailQuery';

jest.mock('../components/products/productDetailRender', () => MockComponent);

const props = {
  match: {
    params: {
      id: 7
    }
  }
};

const mocks = [{
  request: {
    query: PRODUCT_DETAIL_QUERY,
    variables: { id: 7 }
  },
  result: {
    data: {
      product: {
        __typename: '',
        id: 7,
        productName: 'panadol',
        productCategory: {
          id: '1',
          name: 'prescription',
          __typename: '',
        },
        measurementUnit: {
          id: '1',
          name: 'tablets',
          __typename: '',
        },
        packSize: '2kgs',
        skuNumber: '000007',
        description: 'Most effective pain reliver since 1845',
        brand: 'Emzor',
        manufacturer: 'Harmon Northrop',
        vatStatus: 'VAT',
        quality: 'meet the pharmacopoeia specification',
        salesPrice: 10.3,
        createdAt: '2019-05-03',
        nearestExpiryDate: null,
        reorderPoint: 0,
        reorderMax: 0,
        preferedSupplier: {
          id: '2',
          name: 'sean2',
          __typename: '',
        },
        backupSupplier: {
          id: '2',
          name: 'sean2',
          __typename: '',
        },
        tags: ['painkillers'],
        markup: 27,
        unitCost: 30,
        loyaltyWeight: 15,
        batchInfo: [{
          id: 'cdz6gnt98',
          batchNo: 'BN201905031224-crxe4kura',
          supplier: {
            id: '2',
            name: 'sean2',
            __typename: '',
          },
          dateReceived: '2019-12-03',
          packSize: '10',
          quantity: null,
          expiryDate: '2019-02-10',
          unitCost: 30,
          commentary: '5 packs pending',
          outlet: {
            preference: {
              outletCurrency: {
                symbol: '₦',
                __typename: '',
              },
              __typename: '',
            },
            __typename: '',
          },
          __typename: '',
        }],
        productQuantity: null,
        image: ''
      }
    }
  }
}];

describe('renders ProductDetail component', () => {
  it('should render without error', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <BrowserRouter>
          <ProductDetail {...props} />
        </BrowserRouter>
      </MockedProvider>
    );
    await wait(0);
    expect(wrapper.update().find(MockComponent).prop(
      'product'
    )).toMatchObject({ id: 7, productName: 'panadol' });
  });

  it('should show error UI', async () => {
    const newProps = {
      match: {
        params: {
          id: NaN
        }
      }
    };

    const newMocks = [{
      request: {
        query: PRODUCT_DETAIL_QUERY,
        variables: { id: NaN }
      },
      error: new Error('Something went wrong'),
    }];

    const wrapper = mount(
      <MockedProvider mocks={newMocks} addTypeName={false}>
        <BrowserRouter>
          <ProductDetail {...newProps} />
        </BrowserRouter>
      </MockedProvider>
    );
    await wait(0);
    expect(wrapper.update().find('div').text()).toContain('Error');
  });
});
