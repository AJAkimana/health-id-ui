import gql from 'graphql-tag';

const GET_ALL_CURRENCIES = gql`
query {
  currencies {
    name
    symbol
  }
}
`;

export default GET_ALL_CURRENCIES;
