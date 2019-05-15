import gql from 'graphql-tag';

const DELETE_OUTLET = gql`
  mutation deleteOutlet(
    $id: Int
  ){
    deleteOutlet(
      id: $id
    ){
      id
      success
    }
  }
`;

export default DELETE_OUTLET;
