import gql from 'graphql-tag';

const GET_APPROVED_SUPPLIERS = gql`
query{
  approvedSuppliers{
   id,
name
  }
}
`;

export default GET_APPROVED_SUPPLIERS;
