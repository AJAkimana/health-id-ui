import gql from 'graphql-tag';

const GET_APPROVED_PRODUCTS = gql`
  query {
    approvedProducts {
      id
      productCategory {
        name
      }
      productName
      measurementUnit {
        name
      }
      packSize
      skuNumber
      description
      brand
      manufacturer
      vatStatus
      productQuantity
      salesPrice
      nearestExpiryDate
      loyaltyWeight
      preferedSupplier {
        name
      }
      backupSupplier {
        name
      }
      tags
    }
  }
`;

export default GET_APPROVED_PRODUCTS;
