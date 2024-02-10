import { Module } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { ComplaintController } from './complaint.controller';
import { Complaint, ComplaintSchema } from './schema/complaint.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Complaint.name, schema: ComplaintSchema },
    ]),
  ],
  providers: [ComplaintService],
  controllers: [ComplaintController],
})
export class ComplaintModule {}
