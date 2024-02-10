import { Injectable, InternalServerErrorException, Post } from '@nestjs/common';
import { Model } from 'mongoose';
import { PostDocument } from './schema/posts.schema';

import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async createPost(data: any) {
    try {
      const newPost = new this.postModel(data);
      await newPost.save();
      return newPost;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  async listPosts() {
    try {
      return await this.postModel.find().sort().exec();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  async getPostById(id: string) {
    try {
      return await this.postModel.findById(id).exec();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  async likePost(id: string) {
    try {
      return await this.postModel
        .findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
        .exec();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getTrendingPost() {
    try {
      return await this.postModel.find().sort({ likes: -1 }).limit(1).exec();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
