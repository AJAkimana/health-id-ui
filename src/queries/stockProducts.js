import gql from 'graphql-tag';

export const GET_ALL_APPROVED_PRODUCTS = gql`
query {
    approvedProducts {
      id
      productName
      dispensingSize {
        name
      }
      batchInfo{
        dateReceived
        expiryDate
        quantity
        proposedQuantity
        id
      }
      description
      image
      tags
      skuNumber
      quantityInStock
    }
  }
`;

export const GET_ALL_PROPOSED_EDITS = gql`
  query {
    proposedQuantityEdits {
      proposedBy {
        username
      }
      isApproved
      quantityReceived
      batch {
        quantity
        proposedQuantity
        id
        dateReceived
        product {
          productName
          id
        }
      }
    }
  }
`;

export default GET_ALL_APPROVED_PRODUCTS;
