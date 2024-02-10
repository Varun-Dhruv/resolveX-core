import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Community, CommunitySchema } from './community.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Community.name, schema: CommunitySchema },
    ]),
  ],
  providers: [CommunityService],
  controllers: [CommunityController],
})
export class CommunityModule {}
