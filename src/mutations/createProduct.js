import gql from 'graphql-tag';

const CREATE_PRODUCT = gql`
 mutation createProduct(
  $productCategoryId: Int!,
  $productName: String!,
  $dispensingSizeId: Int!,
  $description: String!,
  $brand: String!,
  $manufacturer: String!,
  $vatStatus: Boolean!,
  $preferredSupplierId: String,
  $backupSupplierId: String!,
  $loyaltyWeight: Int!,
  $tags: [String],
  $image: String,
  ) {
    createProduct(
      productCategoryId: $productCategoryId,
      productName: $productName,
      dispensingSizeId: $dispensingSizeId,
      description: $description,
      brand: $brand,
      manufacturer: $manufacturer,
      vatStatus: $vatStatus,
      preferredSupplierId: $preferredSupplierId,
      backupSupplierId: $backupSupplierId,
      loyaltyWeight: $loyaltyWeight,
      tags: $tags,
      image: $image 
  ){
    product{
    id,
    productName
    }
  }
}`;

export default CREATE_PRODUCT;
