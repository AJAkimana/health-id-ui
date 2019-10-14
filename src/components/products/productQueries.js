import gql from 'graphql-tag';

export const GET_APPROVED_AND_PROPOSED_PRODUCTS = gql`
  query($pageNumber: Int, $pageCount: Int) {
    approvedProducts(pageNumber: $pageNumber, pageCount: $pageCount) {
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

    proposedProducts(pageNumber: $pageNumber, pageCount: $pageCount) {
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

export const GET_PRODUCTS_COUNT = gql`
  query($pageNumber: Int, $pageCount: Int) {
    products(pageNumber: $pageNumber, pageCount: $pageCount) {
      id
    }
    totalProductsPagesCount
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


export const SEARCH_PRODUCTS = gql`
query ($searchValue: String) {
  products(search: $searchValue) {
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
