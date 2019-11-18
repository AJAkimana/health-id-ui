import gql from 'graphql-tag';

const GET_MEASUREMENT_UNITS = gql`
query{
  dispensingSize{
    id,
    name
  }
}
`;

export default GET_MEASUREMENT_UNITS;
