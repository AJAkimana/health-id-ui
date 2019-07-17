import gql from 'graphql-tag';

export const GET_ROLES = gql`
  query {
    roles {
      id
      name
    }
  }`;

export const GET_OUTLETS = gql`
    query business(
      $id: String,
    ){
      business(
        id: $id,
      ){
      user {
        id
        firstName
        lastName
        email
        mobileNumber
        jobTitle
        username
        isActive
        startingDate
        role {
          id
        }
        outlets {
          id
        }
      }
      outletSet {
          id
          name
      }
      }
    }
`;
