import gql from 'graphql-tag';

const GET_ALL_CITIES = gql`
  query {
    countries{
    id
    name
    citySet{
      id 
      name
    }
  }
    
  }
`;

export default GET_ALL_CITIES;
