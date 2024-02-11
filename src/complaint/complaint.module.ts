import { Module } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { ComplaintController } from './complaint.controller';
import { Complaint, ComplaintSchema } from './schema/complaint.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from 'src/posts/posts.module';
import { User, UserSchema } from 'src/user/schema/user.schema';
import {
  Organization,
  OrganizationSchema,
} from 'src/organization/organization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Complaint.name, schema: ComplaintSchema },
      { name: User.name, schema: UserSchema },
      { name: Organization.name, schema: OrganizationSchema },
    ]),
    PostsModule,
  ],
  providers: [ComplaintService],
  controllers: [ComplaintController],
})
export class ComplaintModule {}
