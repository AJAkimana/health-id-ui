import gql from 'graphql-tag';

export const DELETE_SUPPLIER_NOTE = gql`
mutation deleteSuppliernote(
  $id: Int!
){
    deleteSuppliernote (
    id: $id
  ) {
    success
  }
}
`;

export default DELETE_SUPPLIER_NOTE;
