import gql from 'graphql-tag';

const GET_COUNTRIES_PRODUCTS_CUSTOMERS = gql`
query {
  approvedProducts(pageCount:8, pageNumber: 1 ) {
    id
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
  
  countries {
    id
    name
    citySet {
      id
      name
    }
  }

  customers {
    id
    createdAt
    firstName
    lastName
    email
    primaryMobileNumber
    secondaryMobileNumber
    addressLine1
    localGovernmentArea
    city{
      id
      name
    }
    country{
      id
      name
    }
    emergencyContactName
    emergencyContactNumber
    emergencyContactEmail
    loyaltyMember
    loyaltyPoints
    wallet{
      storeCredit
    }
    saleSet{
      createdAt
    }
  }
}
`;

export default GET_COUNTRIES_PRODUCTS_CUSTOMERS;
