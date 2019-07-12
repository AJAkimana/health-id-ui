import gql from 'graphql-tag';

export const GET_APPROVED_PRODUCTS = gql`
  query {
    approvedProducts {
      id
      productName
      skuNumber
      description
      brand
      manufacturer
      vatStatus
      productQuantity
      salesPrice
      nearestExpiryDate
      loyaltyWeight
      tags

      productCategory {
        id
        name
      }

      measurementUnit {
        id
        name
      }

      preferredSupplier {
        id
        name
      }

      backupSupplier {
        id
        name
      }
    }
  }
`;

export const GET_PROPOSED_PRODUCTS = gql`
  query {
    proposedProducts {
      id
      productName
      skuNumber
      description
      brand
      manufacturer
      vatStatus
      productQuantity
      salesPrice
      nearestExpiryDate
      loyaltyWeight
      tags

      productCategory {
        id
        name
      }

      measurementUnit {
        id
        name
      }

      preferredSupplier {
        id
        name
      }

      backupSupplier {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
query product(
  $id: Int,
) {
  product(id: $id) {
    id
    productName
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
    tags

    productCategory {
      id
      name
    }

    measurementUnit {
      id
      name
    }

    preferredSupplier {
      id
      name
    }

    backupSupplier {
      id
      name
    }
  }
}
`;
