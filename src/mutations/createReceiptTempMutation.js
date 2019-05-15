import gql from 'graphql-tag';

const CREATE_RECEIPT_TEMP = gql`
    mutation createReceiptTemplate (
  $amountToPay: Boolean
  $barcode: Boolean
  $cashier: Boolean
  $changeDue: Boolean
  $discountTotal: Boolean
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
  createReceiptTemplate (
    amountToPay: $amountToPay,
    barcode: $barcode,
    cashier: $cashier,
    changeDue: $changeDue,
    discountTotal: $discountTotal,
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

export default CREATE_RECEIPT_TEMP;
