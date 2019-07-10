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
      productQuantity
      salesPrice
      tags
    }
  }
`;

export default APPROVED_PRODUCTS_QUERY;
