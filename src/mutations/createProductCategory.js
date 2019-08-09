import gql from 'graphql-tag';

export const CREATE_PRODUCT_CATEGORY = gql`
mutation createProductCategory(
  $outletId: Int!
  $isVat: Boolean!
  $markup: Int!
  $name: String!
  $loyaltyWeight: Int!
){
  createProductCategory (
    outletId: $outletId
    isVatApplicable: $isVat
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

export default CREATE_PRODUCT_CATEGORY;
