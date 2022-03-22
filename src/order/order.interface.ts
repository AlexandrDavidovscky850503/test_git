import { UserEntity } from '../user/user.entity';
// import { OrderDetails } from '../entity/interface'
import { OrderEntity } from './order.entity';

export interface Order {
  // order_id: string
  user: UserEntity;
  // order_details: OrderDetails[]
  // created_time: number
  name: string;
  description: string;
  image: string;
  author: string;
}

export interface OrdersRO {
  orders: OrderEntity[];
  ordersCount: number;
}

export interface OrderRO {
  order: OrderEntity;
}
