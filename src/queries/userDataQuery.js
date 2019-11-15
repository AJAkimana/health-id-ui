import gql from 'graphql-tag';

const GET_USER_INFO = gql`
  query {
    me {
      id
      firstName
      lastName
      username
      mobileNumber
      secondaryPhoneNumber
      email
      secondaryEmail
      profileImage
      role {
        name
      }
      outlets {
        id
        name
        kind {
          name
        }
        users {
          id
          username
          email
          role {
            id
            name
          }
          jobTitle
        }
      }
      businesses {
        id
        legalName
        tradingName
        addressLine1
        phoneNumber
        twitter
        businessEmail
        facebook
        website
        instagram
        user {
          id
        }
      }
      birthday
      startingDate
      jobTitle
      activeOutlet {
        id
        name
        addressLine1
        city {
          name
        }
        outletpreference {
          outletTimezone {
            name
          }
          paymentMethod
        }
      }
    }
  }
`;

export default GET_USER_INFO;
