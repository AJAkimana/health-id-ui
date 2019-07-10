import gql from 'graphql-tag';

const GET_USER_INFO = gql`
  query {
    me {
      id
      mobileNumber
      email
      username
      firstName
      lastName
      role {
        name
      }
      users {
        id
      }
    }
  }
`;

export default GET_USER_INFO;
