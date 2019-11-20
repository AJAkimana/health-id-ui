import gql from 'graphql-tag';
export const GET_APPROVED_PRODUCTS = gql`
  query($pageNumber: Int, $pageCount: Int) {
    approvedProducts(pageNumber: $pageNumber, pageCount: $pageCount) {
      id
      productName
      image
      skuNumber
      description
      brand
      manufacturer
      vatStatus
      salesPrice
      markup
      autoPrice
      nearestExpiryDate
      loyaltyWeight
      tags
      reorderPoint
      reorderMax
      batchInfo {
        id
        unitCost
        dateReceived
      }
      productCategory {
        id
        name
      }
      quantityInStock
      dispensingSize {
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
    totalProductsPagesCount
  }
`;
export const GET_PROPOSED_PRODUCTS = gql`
  query($pageNumber: Int, $pageCount: Int) {
    proposedProducts(pageNumber: $pageNumber, pageCount: $pageCount) {
      id
      productName
      image
      skuNumber
      description
      brand
      manufacturer
      vatStatus
      salesPrice
      markup
      autoPrice
      nearestExpiryDate
      loyaltyWeight
      tags
      reorderPoint
      reorderMax
      batchInfo {
        id
        unitCost
        dateReceived
      }
      productCategory {
        id
        name
      }

      dispensingSize {
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
    totalProductsPagesCount
  }
`;
export const GET_ALL_PRODUCTS = gql`
  query($pageNumber: Int, $pageCount: Int) {
    products(pageNumber: $pageNumber, pageCount: $pageCount) {
      id
      productName
      image
      skuNumber
      description
      brand
      manufacturer
      vatStatus
      salesPrice
      markup
      autoPrice
      nearestExpiryDate
      loyaltyWeight
      tags
      reorderPoint
      reorderMax
      batchInfo {
        id
        unitCost
        dateReceived
      }
      productCategory {
        id
        name
      }

      dispensingSize {
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
    totalProductsPagesCount
  }
`;
export const GET_PRODUCTS = (status) => {
  switch (status) {
  case 'approved':
    return GET_APPROVED_PRODUCTS;
  case 'proposed':
    return GET_PROPOSED_PRODUCTS;
  case 'all':
    return GET_ALL_PRODUCTS;
  default:
    return GET_ALL_PRODUCTS;
  }
};

export const GET_PRODUCTS_COUNT = gql`
  query($pageNumber: Int, $pageCount: Int) {
    products(pageNumber: $pageNumber, pageCount: $pageCount) {
      id
    }
    totalProductsPagesCount
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query product($id: Int) {
    product(id: $id) {
      id
      productName
      skuNumber
      description
      brand
      manufacturer
      vatStatus
      quantityInStock
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

      dispensingSize {
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
  query($searchValue: String) {
    products(search: $searchValue) {
      id
      productName
      skuNumber
      description
      brand
      manufacturer
      vatStatus
      quantityInStock
      markup
      autoPrice
      salesPrice
      nearestExpiryDate
      loyaltyWeight
      tags
      quantityInStock
      batchInfo {
        id
        unitCost
        dateReceived
      }

      productCategory {
        id
        name
      }

      dispensingSize {
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
