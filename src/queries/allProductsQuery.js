import gql from 'graphql-tag';

const GET_ALL_PRODUCTS = gql`
query{
  products{
      id,
  productName,
    isApproved
    }
  }
`;

export default GET_ALL_PRODUCTS;
