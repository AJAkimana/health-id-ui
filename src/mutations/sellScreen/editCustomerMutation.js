import gql from 'graphql-tag';

const EDIT_CUSTOMER = gql`
  mutation editCustomerBasicProfile(
  $id: Int!
  $cityId: Int
  $countryId: Int
  $email: String
  $address: String
  $region: String
  $emergencyContactEmail: String
  $emergencyContactName: String
  $emergencyContactNumber: String
  $firstName: String
  $lastName: String
  $loyaltyMember: Boolean
  $primaryMobileNumber: String
  $secondaryMobileNumber: String
) {
  editCustomerBasicProfile(
    id: $id
    cityId: $cityId
    countryId:$countryId
    email:$email
    addressLine1: $address
    localGovernmentArea: $region
    emergencyContactEmail:$emergencyContactEmail
    emergencyContactName:$emergencyContactName
    emergencyContactNumber:$emergencyContactNumber
    firstName:$firstName
    lastName:$lastName
    loyaltyMember:$loyaltyMember
    primaryMobileNumber:$primaryMobileNumber
    secondaryMobileNumber: $secondaryMobileNumber
  ) {
    message
    customer{
      id
      email
      firstName
      lastName
      primaryMobileNumber
      secondaryMobileNumber
      addressLine1
      localGovernmentArea
      loyaltyMember
      city{
        id
        name
      }
      country{
        id
        name
      }
      emergencyContactName
      emergencyContactEmail
      emergencyContactNumber
    }
  }
}
`;

export default EDIT_CUSTOMER;
