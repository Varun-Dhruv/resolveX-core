import { IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}
export class VerifyUser {
  @IsString()
  @IsNotEmpty()
  email: string;
}
