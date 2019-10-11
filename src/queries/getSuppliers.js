import gql from 'graphql-tag';

const GET_ALL_SUPPLIERS = gql`
query{
  allSuppliers{
    id
    name
    rating
    commentary
    user{
      id
    }
    tier {
      name
    }
    suppliernoteSet{
      note
    }
  }
}
`;

export default GET_ALL_SUPPLIERS;
