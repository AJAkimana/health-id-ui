import gql from 'graphql-tag';

export const GET_APPROVED_PRODUCTS = gql`
  query {
    approvedProducts {
      id
      productCategory {
        name
      }
      productName
      measurementUnit {
        name
      }
      # packSize
      skuNumber
      description
      brand
      manufacturer
      vatStatus
      productQuantity
      salesPrice
      nearestExpiryDate
      loyaltyWeight
      preferredSupplier {
        name
      }
      backupSupplier {
        name
      }
      tags
    }
  }
`;

export const GET_PROPOSED_PRODUCTS = gql`
  query {
    proposedProducts {
      id
      productCategory {
        name
      }
      productName
      measurementUnit {
        name
      }
      packSize
      skuNumber
      description
      brand
      manufacturer
      vatStatus
      productQuantity
      salesPrice
      nearestExpiryDate
      loyaltyWeight
      preferedSupplier {
        name
      }
      backupSupplier {
        name
      }
      tags
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
query product(
  $id: Int,
) {
  product(id: $id) {
    id
    productCategory {
      name
    }
    productName
    measurementUnit {
      name
    }
    packSize
    skuNumber
    description
    brand
    manufacturer
    vatStatus
    productQuantity
    salesPrice
    image
    isApproved
    nearestExpiryDate
    loyaltyWeight
    preferedSupplier {
      name
    }
    backupSupplier {
      name
    }
    tags
  }
}
`;
