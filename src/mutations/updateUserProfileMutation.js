import gql from 'graphql-tag';

const UPDATE_PROFILE = gql`
  mutation($username: String, $email: String, $profileImage: String, $mobileNumber: String) {
    updateUser(username: $username, email: $email, profileImage: $profileImage, mobileNumber: $mobileNumber) {
      user {
        id
        email
        mobileNumber
        username
        profileImage
        role {
          id
          name
        }
      }
      error
      success
    }
  }
`;

export default UPDATE_PROFILE;
