import gql from 'graphql-tag';

export const GET_OPEN_ORDERS = gql`
  query {
    openOrders {
      id
      deliveryDate
      name
      orderNumber
      sentStatus
      orderdetailsSet {
        id
        supplier {
          id
          name
        }
        product {
          id
          batchInfo {
            id
            batchNo
          }
        }
        order {
          id
          orderNumber
          deliveryDate
          name
          sentStatus
        }
      }
    }
  }
`;

export const GET_CLOSED_ORDERS = gql`
  query {
    closedOrders {
      id
      deliveryDate
      name
      orderNumber
      sentStatus
      orderdetailsSet {
        id
        supplier {
          id
          name
        }
        product {
          id
          batchInfo {
            id
            batchNo
          }
        }
        order {
          id
          orderNumber
          deliveryDate
          name
          sentStatus
        }
      }
    }
  }
`;
