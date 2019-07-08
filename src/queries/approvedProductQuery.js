import gql from 'graphql-tag';

const APPROVED_PRODUCTS_QUERY = gql`
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
      outlet {
        outletpreference {
          outletCurrency {
            symbol
          }
        }
      }
      image
      skuNumber
      description
      brand
      manufacturer
      vatStatus
      productQuantity
      salesPrice
      nearestExpiryDate
      loyaltyWeight
      tags
    }
  }
`;

export default APPROVED_PRODUCTS_QUERY;
