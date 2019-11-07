import gql from 'graphql-tag';

const UPDATE_SINGLE_SUPPLIER_NOTE = gql`
  mutation(
    $id: Int!
    $note: String!
    $outletIds: [Int]!
    $supplierId: String!
  ) {
    updateSuppliernote(
      id: $id
      note: $note
      outletIds: $outletIds
      supplierId: $supplierId
    ) {
      success
    }
  }
`;

export default UPDATE_SINGLE_SUPPLIER_NOTE;
