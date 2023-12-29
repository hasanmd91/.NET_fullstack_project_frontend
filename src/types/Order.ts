import { product } from './product';
import { user } from './user';

export type orderDetail = {
  id: string;
  quantity: number;
  productId: string;
  product: product;
  createdDate: string;
  updatedDate: string;
};

export type order = {
  id: string;
  user: user;
  totalPrice: number;
  orderStatus: OrderStatus;
  orderDetails: orderDetail[];
  createdDate: string;
  updatedDate: string;
};

export type onewOrderDetail = {
  productId: string;
  quantity: number;
};

export type newOrder = {
  userId: string;
  totalPrice: number;
  orderDetails: onewOrderDetail[];
};

export enum OrderStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
  CANCELED = 'CANCELED',
  PAID = 'PAID',
}

export type updateOrder = {
  id: string;
  orderStatus: OrderStatus;
};
