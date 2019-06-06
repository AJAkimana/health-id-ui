import gql from 'graphql-tag';

export const ADD_NEW_USER = gql` 
  mutation addUser(
    $firstName: String,
    $lastName: String,
    $userUsername: String,
    $userEmail: String!,
    $roleId: String!,
    $outlet: [String]!,
    $phone: String!,
    $jobTitle: String,
    $startingDate: String,
  ){
    addUser(
      firstName: $firstName,
      lastName: $lastName,
      username: $userUsername,
      email: $userEmail,
      mobileNumber: $phone,
      jobTitle: $jobTitle,
      roleId: $roleId,
      outletId: $outlet,
      startingDate: $startingDate,
    ){
      success
      errors     
    }
  }
`;

export const ADMIN_UPDATE_USER = gql`
  mutation adminUpdateUser(
    $userId: String!,
    $firstName: String,
    $lastName: String,
    $userUsername: String,
    $userEmail: String!,
    $phone: String!,
    $jobTitle: String,
    $startingDate: String,
  ) {
    adminUpdateUser (
      id: $userId,
      firstName: $firstName,
      lastName: $lastName,
      username: $userUsername,
      email: $userEmail,
      mobileNumber: $phone,
      jobTitle: $jobTitle,
      startingDate: $startingDate,
    ){
      message
      errors
    }
  }
`;
