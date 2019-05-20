import gql from 'graphql-tag';

const GET_USER_INFO = gql`
  query {
    me {
      id
      mobileNumber
      email
      role {
        name
      }
    }
  }
`;

export default GET_USER_INFO;
