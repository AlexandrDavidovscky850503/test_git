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
import { VinylService } from './vinyl.service';
import { CreateVinylDto, CreateCommentDto, UpdateVinylDto } from './dto';
import { VinylesRO, VinylRO } from './vinyl.interface';
import { CommentsRO } from './vinyl.interface';
import { User } from '../user/user.decorator';
// import CreateChargeDto from '../stripe/dto/createCharge.dto';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('vinyl')
// @Controller('vinyles')
@Controller()
export class VinylController {
  constructor(private readonly articleService: VinylService) {}

  @ApiOperation({ summary: 'Get vinyles by some parametrs' }) /////////////++++++++
  @ApiResponse({
    status: 200,
    description: 'Return vinyles by some parametrs.',
  })
  @Get('vinyles')
  async findAll(@Query() query): Promise<VinylesRO> {
    return await this.articleService.findAll(query);
  }

  @ApiOperation({ summary: 'Get vinyl by slug' }) /////////////++++++++
  @ApiResponse({ status: 200, description: 'Return vinyl by slug.' })
  @ApiResponse({ status: 400, description: 'Vinyl no found.' })
  @Get('vinyl')
  async findOne(@Query('slug') params): Promise<VinylRO> {
    return await this.articleService.findOne(params);
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // @ApiOperation({ summary: 'Get vinyl feed' })
  // @ApiResponse({ status: 200, description: 'Return vinyl feed.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Get('feed')
  // async getFeed(@User('id') userId: number, @Query() query): Promise<VinylesRO> {
  //   return await this.articleService.findFeed(userId, query);
  // }
  ///////////////////////////////////////////////////////////////////////////////////////

  // @ApiOperation({ summary: 'Get one vinyl by slug' })
  // @ApiResponse({ status: 200, description: 'Return vinyl.'})
  // @Get('vinyles/:slug')
  // async findOne(@Param('slug') slug): Promise<VinylRO> {
  //   return await this.articleService.findOne({slug});
  // }

  @ApiOperation({ summary: 'Buy one vinyl by slug' })
  @ApiResponse({ status: 200, description: 'Successful purchase' })
  @ApiResponse({ status: 400, description: 'Purchase rejected.' })
  @Get('vinyles/buy')
  async buyVinyl(@Query('slug') slug, @User('id') userId: number) {
    return await this.articleService.buyVinyl(slug, userId); //////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  // @ApiOperation({ summary: 'get sort vinyls' })
  // @ApiResponse({ status: 200, description: 'Successful purchase'})
  // @Get('vinyles/sorting')
  // async sortVinyl(@Query('sort') params: number): Promise<VinylesRO>{
  //   console.log(params)
  //   // console.log(params.toString())
  //   return await this.articleService.sortVinyl(params);//////////////////////////////////////////////////////////////////////////////////////////////////////////
  // }

  @ApiOperation({ summary: 'Get vinyl comments by slug' })
  @ApiResponse({ status: 200, description: 'Return vinyl comments.' })
  @ApiResponse({ status: 400, description: 'Vinyl not foound.' })
  @Get('vinyles/comments') ///////////////+++++++++++++++++++++++
  async findComments(@Query('slug') params): Promise<CommentsRO> {
    return await this.articleService.findComments(params);
  }

  @ApiOperation({ summary: 'Create vinyl' })
  @ApiResponse({
    status: 201,
    description: 'The vinyl has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Access denied.' })
  @Post('vinyl') //////////////++++++++++++++++++++
  async create(@Body() vinylData: CreateVinylDto, @User('id') userId: number) {
    return this.articleService.create(vinylData, userId);
  }

  @ApiOperation({ summary: 'Update vinyl by slug' })
  @ApiResponse({
    status: 201,
    description: 'The vinyl has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Forbidden.' })
  @UsePipes(new ValidationPipe()) ///++++++++++++++++++++++++++++++++++==
  @Put('vinyles')
  async update(@Query('slug') params, @Body() vinylData: UpdateVinylDto) {
    return this.articleService.update(params, vinylData);
  }

  @ApiOperation({ summary: 'Delete vinyl by slug' })
  @ApiResponse({
    status: 201,
    description: 'The vinyl has been successfully deleted.',
  })
  @Delete('vinyles') //+++++++++++++++++++++++++
  async delete(@Query('slug') params) {
    return this.articleService.delete(params);
  }

  // @ApiOperation({ summary: 'Create comment' })
  // @ApiResponse({ status: 201, description: 'The comment has been successfully created.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Post('vinyles/comments')
  // async createComment(@Body() commentData: CreateCommentDto,@Query('slug') params,@User('id') userId: number,): Promise<VinylRO> {
  //   console.log(commentData);
  //   console.log(params);
  //   console.log(userId);
  //   return await this.articleService.addComment(params, commentData, userId);
  // }

  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Vinyl not found.' })
  @Post('vinyles/comments')
  async createComment(
    @Body() commentData: CreateCommentDto,
    @Query('slug') params,
    @User('id') userId: number,
  ): Promise<VinylRO> {
    return await this.articleService.addComment(params, commentData, userId);
  }

  // @ApiOperation({ summary: 'Delete comment' })
  // @ApiResponse({ status: 201, description: 'The article has been successfully deleted.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Delete(':slug/comments/:id')
  // async deleteComment(@Param() params) {
  //   const {slug, id} = params;
  //   return await this.articleService.deleteComment(slug, id);
  // }

  // @ApiOperation({ summary: 'Favorite article' })
  // @ApiResponse({ status: 201, description: 'The article has been successfully favorited.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Post(':slug/favorite')
  // async favorite(@User('id') userId: number, @Param('slug') slug) {
  //   return await this.articleService.favorite(userId, slug);
  // }

  // @ApiOperation({ summary: 'Unfavorite article' })
  // @ApiResponse({ status: 201, description: 'The article has been successfully unfavorited.'})
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @Delete(':slug/favorite')
  // async unFavorite(@User('id') userId: number, @Param('slug') slug) {
  //   return await this.articleService.unFavorite(userId, slug);
  // }
}
