import { Prop, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommunityDocument = HydratedDocument<Community>;
@Schema()
export class Community {
  @Prop()
  name: string;
  @Prop()
  description: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  members: string[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Post' })
  posts: string[];
}

export const CommunitySchema = new mongoose.Schema(Community);
