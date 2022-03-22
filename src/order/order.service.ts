import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './order.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    try {
      return await this.orderRepository.find();
    } catch (err) {
      return err;
    }
  }
}
