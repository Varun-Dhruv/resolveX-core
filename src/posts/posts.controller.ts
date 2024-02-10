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

@Controller('posts')
export class PostsController {
  @Post('/create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  createDriver(@ValidBody('data', new ParseJsonPipe()) data: any) {
    console.log(data);
  }

  @Get('/list')
  listDrivers() {
    return;
  }
}
