import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  email: string;

  @Prop()
  image: string;

  @Prop({ default: null })
  city: string;

  @Prop({ default: null })
  DOB: string;

  @Prop({ default: 'USER', enum: ['USER', 'COMPANY'] })
  role: string;

  @Prop()
  publicKey: string;

  @Prop()
  privateKey: string;
}

export interface Location {
  lat: String;
  long: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
