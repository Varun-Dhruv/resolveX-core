import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrganizationDocument = HydratedDocument<Organization>;
@Schema()
export class Organization {
  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  image: string;
}
export const OrganizationSchema = SchemaFactory.createForClass(Organization);
