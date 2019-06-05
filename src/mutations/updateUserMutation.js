import gql from 'graphql-tag';

const UPDATE_USER = gql`
    mutation updateUser(
        $username: String,
        $email: String,
        $profileImage: String,
        $mobileNumber: String,
        $password: [PasswordInput],
        ) {
            updateUser(
            username: $username,
            email: $email,
            profileImage: $profileImage,
            mobileNumber: $mobileNumber,
            password: $password
            ) 
        {
      user {
        id
        username
        mobileNumber
        email,
        role {
          name
        }
        users{
            name
        }
      },
        success
    }
  }
`;

export { UPDATE_USER as default };
