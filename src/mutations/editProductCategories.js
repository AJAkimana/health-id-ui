import gql from 'graphql-tag';

export const EDIT_PRODUCT_CATEGORIES = gql`
mutation editProductCategories(
  $id: Int!
  $isVatApplicable: Boolean
  $markup: Int
  $name: String
  $loyaltyWeight: Int
){
  editProductCategory (
    id: $id
    isVatApplicable: $isVatApplicable 
    markup: $markup
    name: $name
    loyaltyWeight: $loyaltyWeight
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

export default EDIT_PRODUCT_CATEGORIES;
