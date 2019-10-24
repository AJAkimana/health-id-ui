import gql from 'graphql-tag';

const CREATE_SUPPLIER_NOTE = gql`
  mutation createSuppliernote(
    $note: String!
    $outletIds: [Int]!
    $supplierId: String!
  ) {
    createSuppliernote(
      note: $note
      outletIds: $outletIds
      supplierId: $supplierId
    ) {
      message
    }
  }
`;

export default CREATE_SUPPLIER_NOTE;
