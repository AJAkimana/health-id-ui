import gql from 'graphql-tag';

const GET_PRODUCT_CATEGORIES = gql`
query productCategories(
    $outletId: Int!,
    ){
  productCategories(
    outletId: $outletId,
    ){
    id,
    name,
    loyaltyWeight,
    isVatApplicable
  }
}
`;

export default GET_PRODUCT_CATEGORIES;
