import gql from 'graphql-tag';

const CREATE_BUSSINESS = gql`
mutation createBusiness(
    $legalName: String!,
    $tradingName: String!,
    $businessEmail: String!,
    $addressLine1: String!,
    $addressLine2: String,
    $phoneNumber: String!,
    $city: String!,
    $country: String!,
    $localGovernmentArea: String,
    $website: String,
    $twitter: String,
    $instagram: String,
    $logo: String,
    $facebook: String,
){
  createBusiness(
    legalName: $legalName,
    tradingName: $tradingName,
    businessEmail: $businessEmail,
    addressLine1: $addressLine1,
    addressLine2: $addressLine2,
    phoneNumber: $phoneNumber,
    city: $city,
    country: $country,
    localGovernmentArea: $localGovernmentArea,
    website: $website,
    twitter: $twitter,
    instagram: $instagram,
    logo: $logo,
    facebook: $facebook,
  ){
    business{
      id
      businessEmail
      legalName
      addressLine1
    }
    success
  }
}
`;

export default CREATE_BUSSINESS;
