import gql from 'graphql-tag';

const UPDATE_ADMIN_USER = gql`
    mutation updateAdminUser(
        $firstName: String,
        $lastName: String,
        $username: String,
        $secondaryEmail: String,
        $secondaryPhoneNumber: String
        ) {
            updateAdminUser(
            firstName: $firstName,
            lastName: $lastName,
            username: $username,
            secondaryEmail: $secondaryEmail,
            secondaryPhoneNumber: $secondaryPhoneNumber) {
      user {
        id
        email
        firstName
        lastName
        username
        secondaryEmail
        mobileNumber
        secondaryPhoneNumber,
        role {
          id
          name
        }
      },
           success
    }
  }
`;

export { UPDATE_ADMIN_USER as default };
