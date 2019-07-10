import gql from 'graphql-tag';

export const EDIT_QUANTITY = gql`
mutation ProposedQuantity(
    $product: [Int]!
    $batchId: String!
    $quantities: [Int]!
    ) {
        proposedQuantity(
        product: $product,
        proposedQuantities: $quantities,
        batchId: $batchId
      ) {
        batchInfo{id,packSize,user{username}, quantity}
        notification
      }
    }
`;

export const APPROVE_QUANTITY = gql`
mutation ApproveQuantity(
  $product: [Int]!
  $batchId: String!
  $comment: String!
  $isApproved: Boolean!
){
  approveQuantity(
  batchId: $batchId,
  comment: $comment,
  isApproved: $isApproved,
  product: $product
    ) {
      message
    }
  }
`;

export default EDIT_QUANTITY;
