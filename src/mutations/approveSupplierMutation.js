import gql from 'graphql-tag';

const APPROVE_SUPPLIER_MUTATION = gql`
  mutation approveSupplier (
      $id: String!
    ) {
        approveSupplier(
          id: $id
        ){
          success, 
          supplier{
            id,
            name
          }
        }
      }
`;

export default APPROVE_SUPPLIER_MUTATION;
