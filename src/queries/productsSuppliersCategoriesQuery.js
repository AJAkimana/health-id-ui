import gql from 'graphql-tag';

const GET_PRODUCTS_SUPPLIERS_CATEGORIES = gql`
query ($outletId: Int!){
  approvedSuppliers{
  id,
  name
  }
  productCategories(
    outletId: $outletId,
    ){
    id
    name
    loyaltyWeight
    isVatApplicable
    markup
  }
  dispensingSize{
    id,
    name
  }
  products{
  id,
  productName,
  isApproved
  }
}
`;

export default GET_PRODUCTS_SUPPLIERS_CATEGORIES;
