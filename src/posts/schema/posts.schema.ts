import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;
@Schema({ timestamps: true })
export class Post {
  @Prop({ type: String, default: null })
  user: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Company', default: null })
  company: string;

  @Prop({ type: String, enum: ['REPOST', 'COMPLAINTS', 'DIRECT_POST'] })
  type: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Complaint' })
  complaint: string;

  @Prop({ type: Number, default: 0 })
  likes: Number;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Post', default: null })
  repost: string;

  @Prop({ type: String, default: null })
  remarks: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
