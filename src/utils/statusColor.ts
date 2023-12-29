import { OrderStatus } from '../types/Order';

export const getOrderStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'orange';
    case OrderStatus.DELIVERED:
      return 'green';
    case OrderStatus.RETURNED:
      return 'red';
    case OrderStatus.PAID:
      return 'green';
    case OrderStatus.CANCELED:
      return 'red';
    default:
      return 'inherit';
  }
};
