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
        id: '7',
        productName: 'panadol2',
        productCategory: {
          id: '1',
          name: 'prescription'
        },
        dispensingSize: {
          id: '1',
          name: 'tablets'
        },
        skuNumber: '000007',
        description: 'forever younger tablets',
        brand: 'ventolinllke',
        manufacturer: 'Harmon',
        vatStatus: false,
        salesPrice: 1400.0,
        createdAt: '2019-05-30T11:53:08.007323+00:00',
        reorderPoint: 6,
        reorderMax: 12,
        nearestExpiryDate: null,
        preferredSupplier: {
          id: '2',
          name: 'sean2'
        },
        backupSupplier: {
          id: '2',
          name: 'sean2'
        },
        tags: [
          'painkillers',
          'panadol'
        ],
        markup: 27,
        unitCost: 30.0,
        loyaltyWeight: 15,
        batchInfo: [
          {
            packSize: '10',
            id: 'cdz6gnt98',
            batchNo: 'BN201905031224-crxe4kura',
            supplier: {
              id: '2',
              name: 'sean2'
            },
            dateReceived: '2019-12-03',
            quantity: null,
            expiryDate: '2019-02-10',
            unitCost: 30.0,
            commentary: '5 packs pending',
            outlet: {
              outletpreference: null
            }
          },
          {
            packSize: '10',
            id: '9527zyzqu',
            batchNo: 'BN201906140755-ctdzr3igb',
            supplier: {
              id: '1',
              name: 'first'
            },
            dateReceived: '2019-12-03',
            quantity: 93328,
            expiryDate: '2020-02-10',
            unitCost: 100.0,
            commentary: '5 packs pending',
            outlet: {
              outletpreference: null
            }
          },
          {
            packSize: '10',
            id: '67zha89d7',
            batchNo: 'BN201906140756-b64ye1cii',
            supplier: {
              id: '1',
              name: 'first'
            },
            dateReceived: '2019-12-03',
            quantity: 1061,
            expiryDate: '2020-02-10',
            unitCost: 100.0,
            commentary: '5 packs pending',
            outlet: {
              outletpreference: null
            }
          },
          {
            packSize: '10',
            id: '2rpj8yl1u',
            batchNo: 'BN201906141013-88s1ka686',
            supplier: {
              id: '1',
              name: 'first'
            },
            dateReceived: '2019-12-03',
            quantity: 71,
            expiryDate: '2020-02-10',
            unitCost: 100.0,
            commentary: '5 packs pending',
            outlet: {
              outletpreference: null
            }
          },
          {
            packSize: '10',
            id: 'jadc9seyy',
            batchNo: 'BN201905301231-e0cui151m',
            supplier: {
              id: '1',
              name: 'first'
            },
            dateReceived: '2019-12-03',
            quantity: 1119,
            expiryDate: '2020-02-10',
            unitCost: 100.0,
            commentary: '5 packs pending',
            outlet: {
              outletpreference: null
            }
          },
          {
            packSize: '10',
            id: '8rjw4dh2j',
            batchNo: 'BN201905301311-4vfdidwwg',
            supplier: {
              id: '1',
              name: 'first'
            },
            dateReceived: '2019-12-03',
            quantity: 517,
            expiryDate: '2020-02-10',
            unitCost: 100.0,
            commentary: '5 packs pending',
            outlet: {
              outletpreference: null
            }
          },
          {
            packSize: '10',
            id: 'e3it8pibu',
            batchNo: 'BN201905311246-cop7xvczf',
            supplier: {
              id: '1',
              name: 'first'
            },
            dateReceived: '2019-12-03',
            quantity: 15688,
            expiryDate: '2020-02-10',
            unitCost: 100.0,
            commentary: '5 packs pending',
            outlet: {
              outletpreference: null
            }
          }
        ],
        quantityInStock: 88527,
        image: 'https://res.cloudinary.com/dojaopytm/image/upload/v1558444184/productPlaceholder.png'
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
    expect(wrapper.find('ProductLoader').length).toBe(1);
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
