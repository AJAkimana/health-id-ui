import gql from 'graphql-tag';

const GET_ALL_TIMEZONES = gql`
query {
  timezones {
    id
    name
    timeZone
  }
}
`;

export default GET_ALL_TIMEZONES;
