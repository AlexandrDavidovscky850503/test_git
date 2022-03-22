import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
const jwt = require('jsonwebtoken');
import { SECRET } from '../config';
import { UserRO } from './user.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import * as argon2 from 'argon2';
import { OrdersRO } from 'src/order/order.interface';
// import { OrderEntity } from 'src/order/order.entity';
import { CommentsRO } from '../vinyl/vinyl.interface';
// import StripeService from '../stripe/stripe.service';
// import { StripeService }  from '../stripe/stripe.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>, // private readonly stripeService: StripeService
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne({ email, password }: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      return null;
    }

    if (await argon2.verify(user.password, password)) {
      return user;
    }

    return null;
  }

  async create(dto: CreateUserDto): Promise<UserRO> {
    // check uniqueness of username/email
    const { firstName, lastName, email, password } = dto;
    console.log(dto);
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      const errors = { username: 'User email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    const newUser = new UserEntity();
    newUser.firstName = firstName;
    newUser.email = email;
    newUser.password = password;
    newUser.lastName = lastName;
    newUser.comments = [];
    newUser.orders = [];
    // const stripeCustomer = await this.stripeService.createCustomer(firstName, email);
    // newUser.stripeCustomerId = stripeCustomer.id;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    const toUpdate = await this.userRepository.findOne(id);
    // console.log(id)

    delete toUpdate.password; //???????????????????????????????????????????????????????????????
    // delete toUpdate.favorites;

    const updated = Object.assign(toUpdate, dto);
    return await this.userRepository.save(updated);
  }

  async delete(email: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ email: email });
  }

  async findById(id: number): Promise<UserRO> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildUserRO(user);
  }

  async findByEmail(email: string): Promise<UserRO> {
    console.log(email);
    const user = await this.userRepository.findOne({ email: email });
    console.log(user.comments);
    return this.buildUserRO(user);
  }

  async findComments(email: string): Promise<CommentsRO> {
    console.log(email);
    const user = await this.userRepository.findOne({ email: email });
    return { comments: user.comments };
  }

  public generateJWT(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }

  private buildUserRO(user: UserEntity) {
    const userRO = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
      token: this.generateJWT(user),
      image: user.image,
      comments: user.comments,
    };

    return { user: userRO };
  }

  async getUserOrderList(user_id: number): Promise<OrdersRO> {
    // const article = await this.vinylRepository.findOne({slug});
    // return {comments: article.comments};
    // console.log("TUT")
    const user = await this.userRepository.findOne({ id: user_id });
    // let user = this.userRepository.findOne(user_id)
    // console.log(user)

    // const qb = await getRepository(OrderEntity)
    //   .createQueryBuilder('order');
    // .leftJoinAndSelect('order.user', 'user');

    // qb.where("1 = 1");
    // if ('tag' in query) {
    //   qb.andWhere("article.tagList LIKE :tag", { tag: `%${query.tag}%` });
    // }
    // if ('author' in query) {
    // const author = await this.userRepository.findOne({author: query.author});
    // qb.andWhere("order.userId = :id", { userId: user_id });
    // }

    // if ('favorited' in query) {
    //   const author = await this.userRepository.findOne({username: query.favorited});
    //   const ids = author.favorites.map(el => el.id);
    //   qb.andWhere("article.authorId IN (:ids)", { ids });
    // }

    // qb.orderBy('article.created', 'DESC');

    // const ordersCount = await qb.getCount();
    // const orders = await qb.getMany();
    return { orders: user.orders, ordersCount: user.orders.length };
  }
}
