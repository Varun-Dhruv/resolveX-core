import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ValidBody } from 'src/utils/valid-body.decorator';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('/create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  createCommunity(@ValidBody() data: any, @UploadedFiles() files: any) {
    return this.communityService.createCommunity(data, files.file[0]);
  }

  @Get('/list')
  list() {
    return this.communityService.listCommunities();
  }

  @Post('/add-member')
  addMember(@ValidBody() data: any) {
    return this.communityService.addMember(data.communityId, data.userId);
  }

  @Post('/add-post')
  addPost(@ValidBody() data: any) {
    return this.communityService.addPost(data.communityId, data.postId);
  }
}
