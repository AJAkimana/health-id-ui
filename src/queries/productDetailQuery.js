import gql from 'graphql-tag';

const PRODUCT_DETAIL_QUERY = gql`
  query($id: Int) {
    product(id: $id) {
      id
      productName
      productCategory {
        id
        name
      }
      measurementUnit {
        id
        name
      }
      packSize
      skuNumber
      description
      brand
      manufacturer
      vatStatus
      quality
      salesPrice
      createdAt
      reorderPoint
      reorderMax
      nearestExpiryDate
      preferedSupplier {
        id
        name
      }
      backupSupplier {
        id
        name
      }
      tags
      markup
      unitCost
      loyaltyWeight
      batchInfo {
        id
        batchNo
        supplier {
          id
          name
        }
        dateReceived
        packSize
        quantity
        expiryDate
        unitCost
        commentary
        outlet {
          preference {
            outletCurrency {
              symbol
            }
          }
        }
      }
      quality
      productQuantity
      image
    }
  }
`;

export default PRODUCT_DETAIL_QUERY;
