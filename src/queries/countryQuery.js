import gql from 'graphql-tag';

const GET_ALL_COUNTRIES = gql`
  query {
    countries {
      id
      name
      citySet {
        id
        name
      }
    }
  }
`;

export default GET_ALL_COUNTRIES;
