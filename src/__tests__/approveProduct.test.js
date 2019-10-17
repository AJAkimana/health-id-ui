import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';
import wait from 'waait';
import { ApproveProductDetail } from '../container/products/approveProduct';
import { ApproveProduct } from '../components/products/approveProduct';
import { GET_PRODUCT_BY_ID } from '../components/products/productQueries';

const mocks = [
  {
    request: {
      query: GET_PRODUCT_BY_ID,
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
          measurementUnit: {
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
          tags: ['painkillers', 'panadol'],
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
          productQuantity: 88527,
          image:
            'https://res.cloudinary.com/dojaopytm/image/upload/v1558444184/productPlaceholder.png'
        }
      }
    }
  }
];

const props = {
  match: {
    params: {
      id: 7
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
            name: 'Africa/Nairobi'
          }
        }
      }
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
    expect(wrapper.find('ProductLoader').length).toBe(1);
  });
  it('should redirect', async () => {
    const newProps = {
      ...props,
      session: {
        ...props.session,
        me: {
          ...props.session.me,
          role: {
            ...props.session.me.role,
            name: 'Admin'
          }
        }
      }
    };
    const wrapper = mount(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <BrowserRouter>
          <ApproveProductDetail {...newProps} />
        </BrowserRouter>
      </MockedProvider>
    );
    expect(wrapper.find('ProductLoader').length).toBe(0);
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
        },
        activeOutlet: {
          outletpreference: {
            outletTimezone: {
              name: 'Africa/Nairobi'
            }
          }
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
        name: ''
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
        name: ''
      },
      tags: ['tag1', 'tag2'],
      batchInfo: [
        {
          id: 1,
          quantityReceived: 1,
          batchNo: 1,
          packSize: 1,
          dateReceived: 1,
          unitCost: 1,
          supplier: {
            name: ''
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
        }
      ],
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
      newTextFields: 'newTextFields'
    }
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

  it('should call the approveProduct method', () => {
    const approveProductComponent = wrapper.find('ApproveProduct');

    approveProductComponent.instance().handleProductApproval();
    expect(prop.approveProduct).toBeCalled();
    expect(approveProductComponent.instance().state.approved).toBeTruthy();
  });
});
