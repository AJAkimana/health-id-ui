import gql from 'graphql-tag';

export const DELETE_PRODUCT_CATEGORY = gql`
mutation deleteProductCategory(
  $id: Int!
){
  deleteProductCategory (
    id: $id
  ) {
    message
    productCategory {
      name
      markup
      isVatApplicable
      loyaltyWeight
    }
  }
}
`;

export default DELETE_PRODUCT_CATEGORY;
