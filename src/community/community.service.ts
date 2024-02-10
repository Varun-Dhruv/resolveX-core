import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Community } from './community.schema';
import { Model } from 'mongoose';
import { CommunityDocument } from './community.schema';

@Injectable()
export class CommunityService {
  constructor(
    @InjectModel(Community.name)
    private communityModel: Model<CommunityDocument>,
  ) {}
  async listCommunities() {
    return await this.communityModel.find();
  }
}
