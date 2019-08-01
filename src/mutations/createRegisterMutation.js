import gql from 'graphql-tag';

const CREATE_REGISTER = gql`
  mutation createRegister (
    $registerName: String!
    $outletId: Int!
    $receiptId: String!
  ) {
    createRegister (
      name: $registerName
      outletId: $outletId
      receiptId: $receiptId
    ) {
      register {
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
            receipt {
              id
              amountToPay
              barcode
              cashier
              changeDue
              discountTotal
              loyalty
              loyaltyBalance
              loyaltyEarned
              purchaseTotal
              receipt
              receiptNo
              subtotal
              totalTax
            }
          }
          addressLine1
          addressLine2
          lga
          phoneNumber
          dateLaunched
        }
      }
    }
  }
`;

export default CREATE_REGISTER;
