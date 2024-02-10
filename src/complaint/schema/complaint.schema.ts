import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { time } from 'console';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

export type ComplaintDocument = HydratedDocument<Complaint>;

export class File {
  name: string;
  path: string;
  type: string;
}
@Schema({ timestamps: true })
export class Complaint {
  @Prop({ enum: ['APP', 'TWITTER'] })
  source: string;
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
