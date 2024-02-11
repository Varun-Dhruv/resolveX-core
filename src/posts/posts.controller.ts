import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ParseJsonPipe } from 'src/utils/parse-json.pipe';
import { ValidBody } from 'src/utils/valid-body.decorator';
import { PostsService } from './posts.service';
import { JwtGuard } from 'src/user/auth.guard';
import { GetUser } from 'src/user/get-user.decorator';
import * as mongoose from 'mongoose';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Post('/create')
  @UseGuards(JwtGuard)
  createPost(@GetUser() user: any, @ValidBody() data: any) {
    if (user.registrationNumber) data.company = user._id;
    else data.user = user._id;
    return this.postsService.createPost(data);
  }

  @Get('/list')
  listDrivers() {
    return this.postsService.listPosts();
  }

  @Patch('/like/:id')
  likePost(@Param('id') id: string) {
    return this.postsService.likePost(id);
  }

  @Get('/trending-post')
  getTrendingPost() {
    return this.postsService.getTrendingPost();
  }
}
