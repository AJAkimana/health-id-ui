import gql from 'graphql-tag';

const UPDATE_RECEIPT_TEMP = gql`
  mutation updateReceiptTemplate (
    $amountToPay: Boolean
    $barcode: Boolean
    $cashier: Boolean
    $changeDue: Boolean
    $discountTotal: Boolean
    $receiptId: String
    $loyalty: Boolean
    $loyaltyBalance: Boolean
    $loyaltyEarned: Boolean
    $outletId: Int
    $purchaseTotal: Boolean
    $receipt: Boolean
    $receiptNo: Boolean
    $subtotal: Boolean
    $totalTax: Boolean
  ) {
      updateReceiptTemplate (
        amountToPay: $amountToPay,
        barcode: $barcode,
        cashier: $cashier,
        changeDue: $changeDue,
        discountTotal: $discountTotal,
        id: $receiptId,
        loyalty: $loyalty,
        loyaltyBalance: $loyaltyBalance,
        loyaltyEarned: $loyaltyEarned,
        purchaseTotal: $purchaseTotal,
        receipt: $receipt,
        receiptNo: $receiptNo,
        subtotal: $subtotal,
        totalTax: $totalTax,
        outletId: $outletId,
      ) {
        receiptTemplate {
          id
        }
      }
    }
`;

export default UPDATE_RECEIPT_TEMP;
