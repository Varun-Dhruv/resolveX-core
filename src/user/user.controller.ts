import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { ValidBody } from 'src/utils/valid-body.decorator';
import { UserService } from './user.service';
import { UserRegisterDto, VerifyUser } from './dto/auth.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ParseJsonPipe } from 'src/utils/parse-json.pipe';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('auth')
  async auth(@ValidBody() userRegisterDto: any) {
    return await this.userService.register(userRegisterDto);
  }
  @Post('verify')
  async verify(
    @ValidBody() verifyDto: VerifyUser,
  ): Promise<{ exists: Boolean }> {
    return await this.userService.verify(verifyDto);
  }
}
