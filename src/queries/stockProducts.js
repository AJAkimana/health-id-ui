import gql from 'graphql-tag';

const GET_ALL_APPROVED_PRODUCTS = gql`
query {
    approvedProducts {
      id
      productName
      measurementUnit {
        name
      }
      description
      image
      tags
      skuNumber
      productQuantity
    }
  }
`;

export default GET_ALL_APPROVED_PRODUCTS;
