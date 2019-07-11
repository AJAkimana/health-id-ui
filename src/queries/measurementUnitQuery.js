import gql from 'graphql-tag';

const GET_MEASUREMENT_UNITS = gql`
query{
  measurementUnit{
    id,
    name
  }
}
`;

export default GET_MEASUREMENT_UNITS;
