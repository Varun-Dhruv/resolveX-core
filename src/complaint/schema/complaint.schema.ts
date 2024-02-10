import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type ComplaintDocument = HydratedDocument<Complaint>;

export class File {
  name: string;
  path: string;
  type: string;
}
@Schema()
export class Complaint {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Compnany' })
  company: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' })
  organization: string;

  @Prop()
  subject: string;

  @Prop()
  title: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ default: [] })
  files: String[];

  @Prop({ enum: ['private', 'public'] })
  type: string;

  @Prop({ type: Object, default: {} })
  details: Object;

  @Prop({
    enum: [
      'LODGED',
      'LOOKING_INTO',
      'REVIEWING',
      'ACTION',
      'FORWARDED',
      'RESOLVED',
      'INCOMPLETE',
      'REJECTED',
    ],
    default: 'LODGED',
  })
  status: string;
}

export const ComplaintSchema = SchemaFactory.createForClass(Complaint);
