import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { ValidBody } from 'src/utils/valid-body.decorator';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/auth.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ParseJsonPipe } from 'src/utils/parse-json.pipe';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('auth')
  async auth(@ValidBody() userRegisterDto: UserRegisterDto) {
    return await this.userService.register(userRegisterDto);
  }
}