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
    }
  }
`;

export default GET_USER_INFO;
