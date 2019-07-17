import gql from 'graphql-tag';

const UPDATE_USER_PASSWORD = gql`
    mutation (
      $password: [PasswordInput]
    ){
      updateUser (
        password: $password
      ) 
      {
        success
        user {
          email
        }
      }
    }`;

export default UPDATE_USER_PASSWORD;
