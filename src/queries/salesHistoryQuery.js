import gql from 'graphql-tag';

const GET_SALES_HISTORY = gql`
  query($id: Int!) {
    outletSalesHistory (
      outletId: $id
    ) {
      id
      createdAt
      salesPerson{
        firstName
        lastName
      }
      receipt{
        receiptNo
      }
      amountToPay
      customer{
        firstName
        lastName
      }
      outlet{
        name
        city{
          name
        }
      }
    }
  }
`;

export default GET_SALES_HISTORY;
