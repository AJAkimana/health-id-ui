import gql from 'graphql-tag';

const UPDATE_OUTLET = gql`
  mutation updateOutlet(
    $outletId: Int!,
    $cityId: Int,
    $dateLaunched: Date,
    $kindId: Int,
    $outletName: String
    $addressLine1: String
    $addressLine2: String
    $localGovernmentArea: String
    $phoneNumber: String
  ){
    updateOutlet(
      id: $outletId,
      cityId: $cityId,
      dateLaunched: $dateLaunched,
      kindId: $kindId,
      name: $outletName,
      addressLine1: $addressLine1,
      addressLine2: $addressLine2,
      lga: $localGovernmentArea,
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

export default UPDATE_OUTLET;
