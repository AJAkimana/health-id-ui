import gql from 'graphql-tag';

const GET_FILTERED_PRODUCTS = gql`
query ($isApproved: Boolean, $productName: String ) {
  filterProducts(
    isApproved: $isApproved
    productName_Icontains: $productName
  ){
    edges{
      node{
        id,
        productCategory {
        name
      }
      productName
      dispensingSize {
        name
      }
      outlet {
        outletpreference {
          outletCurrency {
            symbol
          }
        }
      }
      image
      skuNumber
      description
      brand
      manufacturer
      quantityInStock
      salesPrice
      tags
        }
      }
     }
  }
  `;

export default GET_FILTERED_PRODUCTS;
