import gql from 'graphql-tag';

const GET_OUTLET_INFO = gql`
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
      businessSet {
        id
      }
    }
  }
`;

export default GET_OUTLET_INFO;
