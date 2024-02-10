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
@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(body: any) {
    try {
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
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
    // implementation
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
