import gql from 'graphql-tag';

const DELETE_RECEIPT_TEMPLATE = gql`
  mutation deleteReceiptTemplate(
    $receiptId:String
  ) {
    deleteReceiptTemplate(
      id: $receiptId
    ) {
      id
    }
  }
`;

export default DELETE_RECEIPT_TEMPLATE;
