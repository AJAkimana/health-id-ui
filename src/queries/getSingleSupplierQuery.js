import gql from 'graphql-tag';

const GET_SINGLE_SUPPLIER = gql`
query($id: String){
  singleSupplier(id: $id)
  {
    id
    addressLine1
    addressLine2
    isApproved
    mobileNumber
    email
    name
    rating
    commentary
    paymentTerms{
      name
    }
    creditDays
    suppliernoteSet{
      id
      note
      createdAt
      supplier{
        user{
          firstName
          lastName
        }
      }
    }
    tier{
      name
    }
    logo
  }
}
`;

export default GET_SINGLE_SUPPLIER;
