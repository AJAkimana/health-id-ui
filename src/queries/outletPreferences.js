import gql from 'graphql-tag';

const GET_OUTLET_PREFERENCES = gql`
  query ($outletId: Int) {
    outletPreference (
      outletId: $outletId
    ) {
      id
      outletCurrency {
        name
      }
      outletTimezone {
        id
        name
        timeZone
      }
      vatRate {
        rate
      }
      salesVelocity
      minimumWeeksForSalesVelocity
      reorderPoint
      reorderMax
      barcodePreference
      emailPreference
      salesHold
      paymentMethod
    }
  }
`;

export default GET_OUTLET_PREFERENCES;
