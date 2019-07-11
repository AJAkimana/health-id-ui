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
      outlets {
        id
      }
    }
  }
`;

export default GET_USER_INFO;
