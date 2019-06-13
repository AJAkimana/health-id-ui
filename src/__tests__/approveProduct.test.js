import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';
import wait from 'waait';
import { ApproveProductDetail } from '../container/products/approveProduct';
import { ApproveProduct } from '../components/products/approveProduct';
import { GET_PRODUCT_BY_ID } from '../components/products/productQueries';

const mocks = [{
  request: {
    query: GET_PRODUCT_BY_ID,
    variables: { id: 7 }
  },
  result: {
    loading: false,
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

const props = {
  match: {
    params: {
      id: 7
    }
  }
};

describe('Test render approve product', () => {
  it('should render without error', async () => {
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <BrowserRouter>
          <ApproveProductDetail {...props} />
        </BrowserRouter>
      </MockedProvider>
    );
    await wait(0);
    expect(wrapper.find('ProductLoader').length).toBe(1);
  });
});

describe('Test approve Product detail renderer', () => {
  const prop = {
    match: {
      params: {
        id: '1'
      }
    },
    session: {
      me: {
        role: {
          name: 'Master Admin'
        }
      }
    },
    approveProduct: jest.fn(() => Promise.resolve()),
    refetch: jest.fn(),
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
  };
  const wrapper = mount(
    <BrowserRouter>
      <ApproveProduct {...prop} />
    </BrowserRouter>
  );
  it('should render product details as expected', () => {
    wrapper.instance().setState({ approved: false });
    const Button = wrapper.find('Button').at(1);
    Button.simulate('click');
    expect(wrapper.state('approved')).toBeFalsy();
  });
});
