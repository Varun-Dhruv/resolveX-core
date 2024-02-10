import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ParseJsonPipe } from 'src/utils/parse-json.pipe';
import { ValidBody } from 'src/utils/valid-body.decorator';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post('/create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  createOrganization(
    @ValidBody('data', new ParseJsonPipe())
    data: any,
    @UploadedFiles() files: any,
  ) {
    return this.organizationService.createOrganization(data, files.file[0]);
  }

  @Get('/list')
  getOrganizations() {
    return this.organizationService.getOrganizations();
  }
}
