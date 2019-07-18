import gql from 'graphql-tag';

const CREATE_OUTLET = gql`
  mutation createOutlet(
    $outletName: String
    $addressLine1: String
    $addressLine2: String
    $localGovernmentArea: String
    $businessId: String
    $cityId: Int
    $dateLaunched: Date
    $kindId: Int
    $phoneNumber: String
  ){
    createOutlet(
      name: $outletName,
      addressLine1: $addressLine1,
      addressLine2: $addressLine2,
      lga: $localGovernmentArea,
      businessId: $businessId,
      cityId: $cityId,
      dateLaunched: $dateLaunched,
      kindId: $kindId,
      phoneNumber: $phoneNumber,
    ){
      outlet {
        id
        name
        city {
          name
          country {
            name
          }
        }
        kind {
          name
        }
        outletRegister {
          id
          name
        }
        addressLine1
        addressLine2
        lga
        phoneNumber
        dateLaunched
      }
      success
    }
  }
`;

export default CREATE_OUTLET;
