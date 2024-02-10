import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Community } from './community.schema';
import { Model } from 'mongoose';
import { CommunityDocument } from './community.schema';
import { storeFile } from 'src/utils/store-file';

@Injectable()
export class CommunityService {
  constructor(
    @InjectModel(Community.name)
    private communityModel: Model<CommunityDocument>,
  ) {}
  async createCommunity(data: any, files) {
    const filePath = storeFile(files);

    const newCommunity = new this.communityModel({
      name: data.name,
      image: filePath,
      description: data.description,
    });

    await newCommunity.save();
    return newCommunity;
  }
  async addMember(communityId: string, userId: string) {
    return await this.communityModel
      .findByIdAndUpdate(
        communityId,
        { $push: { members: userId } },
        { new: true },
      )
      .exec();
  }
  async addPost(communityId: string, postId: string) {
    return await this.communityModel
      .findByIdAndUpdate(
        communityId,
        { $push: { posts: postId } },
        { new: true },
      )
      .exec();
  }
  async listCommunities() {
    return await this.communityModel.find();
  }
}
