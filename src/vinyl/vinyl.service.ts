import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { VinylEntity } from './vinyl.entity';
import { Comment } from './comment.entity';
import { OrderEntity } from '../order/order.entity';
import { UserEntity } from '../user/user.entity';
// import { FollowsEntity } from '../profile/follows.entity';
import { CreateVinylDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
// import CreateChargeDto from '../stripe/dto/createCharge.dto';
// import ProxyAgent from 'https-proxy-agent';
const nodemailer = require('nodemailer');

// const stripe = require('stripe')('sk_test_51KeyaYCNuoAgbZF5P4iFLrqE1xraizGfrdtsGXA3Inm9EEE5JWE1zEPplxOTslBVIVJOAOmAFnxINh2WdKpUaAAV00LjvFMduI');
// stripe.customers.create({
//   email: 'customer@example.com',
// })
//   .then(customer => console.log(customer.id))
//   .catch(error => console.error(error));

import { VinylRO, VinylesRO, CommentsRO } from './vinyl.interface';
const slug = require('slug');

// import { InjectStripe } from 'nestjs-stripe';
// import Stripe from 'stripe';
// const stripe = new Stripe('sk_test_51KeyaYCNuoAgbZF5P4iFLrqE1xraizGfrdtsGXA3Inm9EEE5JWE1zEPplxOTslBVIVJOAOmAFnxINh2WdKpUaAAV00LjvFMduI', {
//   apiVersion: '2020-08-27',
//   // maxNetworkRetries: 1,
//   // httpAgent: new ProxyAgent(process.env.http_proxy),
//   // timeout: 1000,
//   // host: 'api.example.com',
//   // port: 123,
//   // telemetry: true,
//   appInfo: { // For sample support and debugging, not required for production:
//     name: "stripe-samples/accept-a-payment",
//     url: "https://github.com/stripe-samples",
//     version: "0.0.2",
//   },
//   typescript: true,
// });

// const { currency, paymentMethodType, paymentMethodOptions }: { currency: string, paymentMethodType: string, paymentMethodOptions?: object  } = req.body;

// const createCustomer = async () => {
//   const params: Stripe.CustomerCreateParams = {
//     description: 'test customer',
//   };

//   const customer: Stripe.Customer = await stripe.customers.create(params);

//   console.log(customer.id);
// };
// createCustomer();
// import StripeService from '../stripe/stripe.service';

@Injectable()
export class VinylService {
  constructor(
    @InjectRepository(VinylEntity)
    private readonly vinylRepository: Repository<VinylEntity>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>, // @InjectStripe() private readonly stripeClient: Stripe, // private stripeService: StripeService // @InjectRepository(FollowsEntity) // private readonly followsRepository: Repository<FollowsEntity>
  ) {}

  // async sortVinyl(params: number): Promise<VinylesRO>{
  //   const qb = await getRepository(VinylEntity)
  //   .createQueryBuilder('vinyl')
  //   qb.where("1 = 1");
  //   console.log(params)
  //   // if(params === "DESC"){
  //   //   console.log("1_1")
  //   //   qb.orderBy('vinyl.price', 'DESC');
  //   // }
  //   // else{
  //   //   console.log("2_2")
  //   //   qb.orderBy('vinyl.price', 'ASC');
  //   // }

  //   if(params == 0){
  //     console.log("1_1")
  //     qb.orderBy('vinyl.price', 'ASC');
  //   }

  //   if(params == 1){
  //     console.log("3_3")
  //     qb.orderBy('vinyl.price', 'DESC');
  //   }

  //   // if(params == "MAX"){
  //   //   console.log("4_4")
  //   //   qb.orderBy('vinyl.price', 'ASC');
  //   // }

  //     const vinylesCount = await qb.getCount();
  //     const vinyles = await qb.getMany();
  //     return {vinyles, vinylesCount};
  // }

  async findAll(query): Promise<VinylesRO> {
    const qb = await getRepository(VinylEntity).createQueryBuilder('vinyl');
    // .leftJoinAndSelect('vinyl.author', 'author');

    qb.where('1 = 1');
    console.log(query);
    // if ('tag' in query) {
    //   qb.andWhere("article.tagList LIKE :tag", { tag: `%${query.tag}%` });
    // }

    if ('author' in query) {
      console.log('author YES');
      // const author = await this.userRepository.findOne({author: query.author});
      qb.andWhere('vinyl.author = :author', { author: query.author });
    }

    if ('name' in query) {
      console.log('name YES');
      // const author = await this.userRepository.findOne({author: query.author});
      qb.andWhere('vinyl.name = :name', { name: query.name });
    }

    if ('slug' in query) {
      console.log('slug YES');
      // console.log(query.name)
      // const author = await this.userRepository.findOne({author: query.author});
      qb.andWhere('vinyl.slug = :slug', { slug: query.slug });
    }

    // if ('favorited' in query) {
    //   const author = await this.userRepository.findOne({username: query.favorited});
    //   const ids = author.favorites.map(el => el.id);
    //   qb.andWhere("article.authorId IN (:ids)", { ids });
    // }

    // qb.orderBy('article.created', 'DESC');

    if ('sort' in query) {
      console.log('sort YES');
      if (query.sort == 'MIN') {
        qb.orderBy('vinyl.price', 'ASC');
      } else {
        qb.orderBy('vinyl.price', 'DESC');
      }

      // if(params == 1){
      //   console.log("3_3")
      //   qb.orderBy('vinyl.price', 'DESC');
      // }
      // const author = await this.userRepository.findOne({author: query.author});
      // qb.andWhere("vinyl.name = :name", { name: query.name });
    }
    // if(params == 0){
    //   console.log("1_1")
    //   qb.orderBy('vinyl.price', 'ASC');
    // }

    // if(params == 1){
    //   console.log("3_3")
    //   qb.orderBy('vinyl.price', 'DESC');
    // }

    const vinylesCount = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }

    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const vinyles = await qb.getMany();

    return { vinyles, vinylesCount };
  }

  // async findComments(slug: string): Promise<CommentsRO> {
  //   const article = await this.vinylRepository.findOne({slug});
  //   return {comments: article.comments};
  // }

  // async findFeed(userId: number, query): Promise<VinylesRO> {
  //   const _follows = await this.followsRepository.find( {followerId: userId});

  //   if (!(Array.isArray(_follows) && _follows.length > 0)) {
  //     return {articles: [], articlesCount: 0};
  //   }

  //   const ids = _follows.map(el => el.followingId);

  //   const qb = await getRepository(VinylEntity)
  //     .createQueryBuilder('article')
  //     .where('article.authorId IN (:ids)', { ids });

  //   qb.orderBy('article.created', 'DESC');

  //   const articlesCount = await qb.getCount();

  //   if ('limit' in query) {
  //     qb.limit(query.limit);
  //   }

  //   if ('offset' in query) {
  //     qb.offset(query.offset);
  //   }

  //   const articles = await qb.getMany();

  //   return {articles, articlesCount};
  // }
  async buyVinyl(slug: string, idUser: number): Promise<OrderEntity> {
    const vinyl = await this.vinylRepository.findOne({ slug: slug });
    const user = await this.userRepository.findOne({ id: idUser });
    // console.log(vinyl.comments)

    console.log();
    if (!vinyl) {
      throw new HttpException(
        { message: 'vinyl not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log('==========================');
    const count = vinyl.comments.length;
    if (count > 0)
      for (
        let index = vinyl.comments[0].id;
        index <= vinyl.comments[count - 1].id;
        index++
      ) {
        console.log(index);
        const comment = await this.commentRepository.findOne({ id: index });
        console.log(comment);
        // console.log(vinyl.comments[index].id)
        user.comments.splice(index, 1);
        vinyl.comments.splice(index, 1);
        await this.commentRepository.delete(index);
      }
    console.log('==========================');
    // let article = await this.articleRepository.findOne({slug});

    // const comment = await this.commentRepository.findOne(4);
    // console.log(comment)
    // const deleteIndex = vinyl.comments.findIndex(_comment => _comment.id === comment.id);
    // console.log(deleteIndex)
    // if (deleteIndex >= 0) {
    //   const deleteComments = vinyl.comments.splice(deleteIndex, 1);
    //   await this.commentRepository.delete(deleteComments[0].id);
    // }

    // await this.commentRepository.delete(vinyl.id);
    // await this.vinylRepository.delete({ slug: slug});
    // let user = await this.userRepository.findOne({id : idUser})
    // console.log(user);
    const newOrder = new OrderEntity();
    newOrder.author = vinyl.author;
    newOrder.description = vinyl.description;
    newOrder.image = vinyl.image;
    newOrder.name = vinyl.name;
    // newOrder.user = user;

    user.orders.push(newOrder);

    await this.orderRepository.save(newOrder);
    await this.userRepository.save(user);
    await this.vinylRepository.save(vinyl);
    await this.vinylRepository.delete({ slug: slug });

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    const info = await transporter.sendMail({
      from: '"Vinyl Shop" <foo@example.com>',
      to: user.email,
      text: 'Нou have made a successful purchase',
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // await this.stripeService.charge(vinyl.price, user.stripeCustomerId);
    return newOrder;
  }

  async addComment(
    slug: string,
    commentData: any,
    authorId: number,
  ): Promise<VinylRO> {
    let vinyl = await this.vinylRepository.findOne({ slug: slug });
    console.log(vinyl);
    if (!vinyl) {
      throw new HttpException(
        { message: 'vinyl not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne({ id: authorId });
    console.log(user);

    const comment = new Comment();
    comment.body = commentData.body;
    comment.creator = user.firstName;

    if (commentData.score > 5) comment.score = 5;
    else if (commentData.score < 0 || commentData.score == null)
      comment.score = 0;
    else comment.score = commentData.score;

    console.log(comment);
    vinyl.comments.push(comment);

    user.comments.push(comment);

    await this.commentRepository.save(comment);

    await this.userRepository.save(user);

    vinyl = await this.vinylRepository.save(vinyl);
    return { vinyl };
  }

  // async deleteComment(slug: string, id: string): Promise<VinylRO> {
  //   let article = await this.vinylRepository.findOne({slug});

  //   const comment = await this.commentRepository.findOne(id);
  //   const deleteIndex = article.comments.findIndex(_comment => _comment.id === comment.id);

  //   if (deleteIndex >= 0) {
  //     const deleteComments = article.comments.splice(deleteIndex, 1);
  //     await this.commentRepository.delete(deleteComments[0].id);
  //     article =  await this.vinylRepository.save(article);
  //     return {article};
  //   } else {
  //     return {article};
  //   }

  // }

  async findComments(slug: string): Promise<CommentsRO> {
    const vinyl = await this.vinylRepository.findOne({ slug });
    if (!vinyl) {
      throw new HttpException(
        { message: 'vinyl not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return { comments: vinyl.comments };
  }

  async findOne(slug: string): Promise<VinylRO> {
    const vinyl = await this.vinylRepository.findOne({ slug: slug });
    if (!vinyl) {
      throw new HttpException(
        { message: 'vinyl not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return { vinyl };
  }

  async create(vinylData: CreateVinylDto, id: number): Promise<VinylEntity> {
    // const {name,description, author, image,price} = vinylData;
    // let vinyl = new VinylEntity();
    // vinyl.name = name;
    // vinyl.description = description;
    // vinyl.slug = this.slugify(name);
    // // vinyl.tagList = articleData.tagList || [];
    // vinyl.author = author;
    // vinyl.image = image || '';
    // vinyl.price = price;
    // vinyl.comments = [];
    const user = await this.userRepository.findOne({ id: id });
    if (!user.isAdministrator) {
      throw new HttpException(
        { message: 'user is not Admin' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const vinyl = new VinylEntity();
    vinyl.name = vinylData.name;
    vinyl.description = vinylData.description;
    vinyl.slug = this.slugify(vinylData.name);
    vinyl.author = vinylData.author;
    vinyl.image = vinylData.image || '';
    vinyl.price = vinylData.price;
    vinyl.comments = [];

    const newVinyl = await this.vinylRepository.save(vinyl);

    // const author = await this.userRepository.findOne({ where: { id: userId }, relations: ['articles'] });
    // author.articles.push(article);

    // await this.userRepository.save(author);

    return newVinyl;
  }

  async update(slug: string, vinylData: any): Promise<VinylRO> {
    const toUpdate = await this.vinylRepository.findOne({ slug: slug });
    if (!toUpdate) {
      throw new HttpException(
        { message: 'vinyl not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const updated = Object.assign(toUpdate, vinylData);
    const vinyl = await this.vinylRepository.save(updated);
    return { vinyl };
  }

  async delete(slug: string): Promise<DeleteResult> {
    return await this.vinylRepository.delete({ slug: slug });
  }

  slugify(title: string) {
    return (
      slug(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
