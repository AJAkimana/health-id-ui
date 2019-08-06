import gql from 'graphql-tag';

const GET_COUNTRIES_PRODUCTS_CUSTOMERS = gql`
query {
  approvedProducts(pageCount:8, pageNumber: 1 ) {
    id
    productCategory {
      name
    }
    productName
    measurementUnit {
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
    productQuantity
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
  }
}
`;

export default GET_COUNTRIES_PRODUCTS_CUSTOMERS;
