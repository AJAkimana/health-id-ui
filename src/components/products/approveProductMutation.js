import gql from 'graphql-tag';

const APPROVE_PRODUCT_MUTATION = gql`
  mutation approveProduct (
    $id: Int!
  ) {
    approveProduct(productId: $id) {
      success
    }
  }
`;

export default APPROVE_PRODUCT_MUTATION;
