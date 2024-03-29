import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserSchema, User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { MongoServerError, ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import { UserRegisterDto, VerifyUser } from './dto/auth.dto';
import { Company, CompanyDocument } from './schema/company.schema';
@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    private jwtService: JwtService,
  ) {}

  private checkUserType(email: string): { role: string; type: string } {
    if (
      email === 'dpatel4212@gmail.com' ||
      email === 'rupin.malik@spit.ac.in' ||
      email === 'pratikpujari2019@gmail.com'
    )
      return { role: 'COMPANY', type: 'NGO' };
    if (email.split('@')[1] === 'spit.ac.in') {
      return { role: 'COMPANY', type: 'PRIVATE' };
    } else return { role: 'USER', type: '' };
  }
  async register(body: any) {
    try {
      if (this.checkUserType(body.email).role === 'USER') {
        const user: UserDocument = await this.userModel.findOne({
          email: body.email,
        });
        if (user) {
          return {
            user,
            created: false,
            role: user.role,
            token: await this.signToken(user._id, user.email),
          };
        }
        var prime_length = 1000;
        var diffHell = crypto.createDiffieHellman(prime_length);
        diffHell.generateKeys('base64');
        const newUser = new this.userModel({
          name: body.name,
          email: body.email,
          image: body.image,
          role: body.role.toUpperCase() || 'USER',
          publicKey: diffHell.getPublicKey('base64'),
          privateKey: diffHell.getPrivateKey('base64'),
        });
        await newUser.save();
        delete newUser.privateKey;
        return {
          created: true,
          user: newUser,
          token: await this.signToken(newUser._id, newUser.email),
        };
      } else {
        const company = await this.companyModel.findOne({ email: body.email });
        if (company) {
          return {
            created: false,
            company,
            role: company.type === 'NGO' ? 'NGO' : 'COMPANY',
            token: await this.signToken(company._id, company.email),
          };
        }
        const newCompany = new this.companyModel({
          email: body.email,
          name: body.name,
          image: body.image,
          registrationNumber: body.registrationNumber,
          type: this.checkUserType(body.email).type,
          authorized: false,
        });
        await newCompany.save();
        return {
          created: true,
          company: newCompany,
          role: newCompany.type === 'NGO' ? 'NGO' : 'COMPANY',
          token: await this.signToken(newCompany._id, newCompany.email),
        };
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async verify(body: VerifyUser): Promise<{ exists: boolean }> {
    const user = await this.userModel.findOne({ email: body.email });
    if (!user) {
      return { exists: false };
    }
    return { exists: true };
  }

  private async signToken(userId: ObjectId, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email: email,
    };
    const secret = this.configService.get('JWT_SECRET_KEY');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: secret,
    });
    return token;
  }
}
