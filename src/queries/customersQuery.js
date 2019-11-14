import gql from 'graphql-tag';

const GET_ALL_CUSTOMERS = gql`
  query {
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

export default GET_ALL_CUSTOMERS;
