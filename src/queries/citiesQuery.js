import gql from 'graphql-tag';

const GET_ALL_CITIES = gql`
  query {
    cities {
      id
      name
      country {
        id
        name
      }
    }
  }
`;

export default GET_ALL_CITIES;
