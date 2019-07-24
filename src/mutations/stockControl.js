import gql from 'graphql-tag';

export const EDIT_QUANTITY = gql`
mutation ProposedQuantity(
    $productId: Int!
    $batchIds: [String]!
    $proposedQuantities: [Int]!
    ) {
        proposedQuantity(
        productId: $productId,
        proposedQuantities: $proposedQuantities,
        batchIds: $batchIds
      ) {
        batchInfo{
          id,
          user{
            username
          },
          quantity
        }
        notification
      }
    }
`;

export const APPROVE_QUANTITY = gql`
mutation ApproveQuantity(
  $productId: Int!
  $batchIds: [String]!
  $comment: String!
  $isApproved: Boolean!
){
  approveQuantity(
  batchIds: $batchIds,
  comment: $comment,
  isApproved: $isApproved,
  productId: $productId
    ) {
      message
    }
  }
`;

export default EDIT_QUANTITY;
