import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Query,
  Controller,
  UsePipes,
} from '@nestjs/common';
// import { Request } from 'express';
import { UserService } from './user.service';
import { UserRO } from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User } from './user.decorator';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { CommentsRO } from '../vinyl/vinyl.interface';
import { OrdersRO } from 'src/order/order.interface';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user orders' })
  @ApiResponse({ status: 200, description: 'Return user orders.' })
  @Get('user/orderlist')
  getUserOrderList(@User('id') userId: number): Promise<OrdersRO> {
    console.log(userId);
    return this.userService.getUserOrderList(userId);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Return user profile.' })
  @Get('users') ////+++++++++++++++++++++++++++++++++
  async findMe(@User('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email);
    // return await this.userService.findById(userId);
  }

  @ApiOperation({ summary: 'Get user comments' })
  @ApiResponse({ status: 200, description: 'Return user comments.' })
  @Get('users/comments') ////+++++++++++++++++++++++++++++++++
  async findMeComments(@User('email') email: string): Promise<CommentsRO> {
    return await this.userService.findComments(email);
    // return await this.userService.findById(userId);
  }

  // async findMe(): Promise<UserRO> {
  //   // console.log(email);
  //   console.log("1");
  //   // return await this.userService.findByEmail(email);
  //   return await this.userService.findById(1);
  // }

  // @ApiOperation({ summary: 'Update user profile' })
  // @ApiResponse({ status: 200, description: 'Return update user profile.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Put('user')
  // async update(@User('id') userId: number, @Body() userData: UpdateUserDto) {
  //   return await this.userService.update(userId, userData);
  // }

  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Return updated user profile.' })
  // @ApiResponse({ status: 400, description: 'Forbidden.' })//++++++++++++++++++++++
  @UsePipes(new ValidationPipe()) //??????????????????????????
  @Put('user')
  async update(@User('id') userId: number, @Body() userData: UpdateUserDto) {
    return await this.userService.update(userId, userData);
  }

  @ApiOperation({ summary: 'Create new user' }) ///++++++++
  @ApiResponse({ status: 200, description: 'Return user profile.' })
  @ApiResponse({ status: 400, description: 'Forbidden.' })
  @Post('users')
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    // console.log("TUT")
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Delete user by slug' })
  @ApiResponse({ status: 200, description: 'The user has been deleted.' })
  @Delete('users')
  async delete(@Query('slug') params) {
    return await this.userService.delete(params.slug);
  }

  @ApiOperation({ summary: 'login user' }) //++++++++++++++++++++++++++++++++++===
  @ApiResponse({ status: 200, description: 'The user has been autorized.' })
  @UsePipes(new ValidationPipe())
  @Post('users/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    const _user = await this.userService.findOne(loginUserDto);
    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 401);

    const token = await this.userService.generateJWT(_user);
    const { email, firstName, lastName, birthDate, image, comments } = _user;
    const user = {
      email,
      token,
      firstName,
      lastName,
      birthDate,
      image,
      comments,
    };
    return { user };
  }
}
