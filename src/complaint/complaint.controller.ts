import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { JwtGuard } from 'src/user/auth.guard';
import { GetUser } from 'src/user/get-user.decorator';
import { User } from 'src/user/schema/user.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ValidBody } from 'src/utils/valid-body.decorator';
import { ParseJsonPipe } from 'src/utils/parse-json.pipe';
import { ComplaintDto } from './complaint.dto';

@Controller('complaint')
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  @Post('/create')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 2 }]))
  createComplaint(
    @ValidBody('data', new ParseJsonPipe())
    data: any,
    // ComplaintDto,
    @GetUser()
    user: any,
    @UploadedFiles() files: any,
  ) {
    return this.complaintService.createComplaint(data, user, files);
  }

  @Get('/list')
  listComplaints() {
    return this.complaintService.listComplaints();
  }

  @Get('/user')
  @UseGuards(JwtGuard)
  listComplaintsByUser(@GetUser() user: User) {
    return this.complaintService.listComplaintsByUser(user);
  }
}
