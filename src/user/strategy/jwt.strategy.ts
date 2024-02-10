import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserSchema, User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';
import { Company } from '../schema/company.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private config: ConfigService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET_KEY'),
    });
  }
  async validate(payload: any): Promise<any> {
    const user = await this.userModel.findOne({ _id: payload.sub });
    const company = await this.companyModel.findOne({ _id: payload.sub });
    if (user) return user;

    if (company) return company;
    if (!user && !company)
      throw new UnauthorizedException('User with given token not found');
  }
}
