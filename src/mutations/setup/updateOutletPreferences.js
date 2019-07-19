import gql from 'graphql-tag';

const UPDATE_OUTLET_PREFERENCES = gql`
  mutation updateOutletPreferences (
    $preferenceId: String!     
    $selectedCurrency: String
    $selectedTimezoneID: String
    $vat: Float
    $minimumWeeksForSalesVelocity: Int
    $salesVelocity: Int
    $reorderPoint: Int
    $reorderMax: Int
    $barcodeScanning: Boolean
    $sendEmail: Boolean
    $salesHold: Int
    $selectedPayment: String
    $alertNearExpiry: Boolean
    $alertLowInventory: Boolean
    $weeksToStartSupplyAlert: Int
  ) {
    updatePreference (
      preferenceId: $preferenceId
      outletCurrency: $selectedCurrency
      outletTimezone: $selectedTimezoneID
      outletVat: $vat
      minimumWeeksForSalesVelocity: $minimumWeeksForSalesVelocity
      salesVelocity: $salesVelocity
      reorderPoint: $reorderPoint
      reorderMax: $reorderMax
      barcodePreference: $barcodeScanning
      emailPreference: $sendEmail
      salesHold: $salesHold
      paymentMethod: $selectedPayment
      alertNearExpiry: $alertNearExpiry
      alertLowInventory: $alertLowInventory
      weeksToStartSupplyAlert: $weeksToStartSupplyAlert
    ) {
      success
      preference {
        outletCurrency {
          name
        }
        outletTimezone {
          timeZone
        }
        vatRate {
          id
          rate
        }
      }
    }
  }
`;

export default UPDATE_OUTLET_PREFERENCES;
