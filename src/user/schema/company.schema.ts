import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true })
  registrationNumber: string;

  @Prop({ type: Boolean, required: true })
  authorized: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
