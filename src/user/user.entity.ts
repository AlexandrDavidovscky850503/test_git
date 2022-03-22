import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  JoinTable,
  ManyToMany,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';
import { VinylEntity } from '../vinyl/vinyl.entity';
import { OrderEntity } from '../order/order.entity';
import { Comment } from '../vinyl/comment.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ default: '' })
  birthDate: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: '' })
  stripeCustomerId: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  // @ManyToMany((type) => VinylEntity)
  // @JoinTable()
  // favorites: VinylEntity[];

  // тут его покупки
  @OneToMany((type) => OrderEntity, (order) => order.user, { eager: true })
  @JoinColumn()
  orders: OrderEntity[];

  // @OneToMany(type => Comment, comment => comment.author,{eager: true} )
  // // @JoinColumn()
  // comments: Comment[];

  @OneToMany((type) => Comment, (comment) => comment.author, { eager: true })
  @JoinColumn()
  comments: Comment[];

  @Column({
    default: false,
  })
  isAdministrator: boolean;
}
