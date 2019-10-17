import gql from 'graphql-tag';

const CREATE_SUPPLIER = gql`
  mutation addSupplier(
    $name: String!
    $email: String!
    $mobileNumber: String!
    $addressLine1: String!
    $addressLine2: String
    $lga: String
    $citId: Int!
    $tierId: Int!
    $creditDays: Int
    $logo: String
    $paymentsTermsId: Int!
    $commentary: String
  ) {
    addSupplier(
      input: {
        name: $name
        email: $email
        mobileNumber: $mobileNumber
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        lga: $lga
        cityId: $citId
        tierId: $tierId
        creditDays: $creditDays
        logo: $logo
        paymentTermsId: $paymentsTermsId
        commentary: $commentary
      }
    ) {
      supplier {
        id
        supplierId
        name
      }
    }
  }
`;

export default CREATE_SUPPLIER;
