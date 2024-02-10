import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommunityDocument = HydratedDocument<Community>;
@Schema()
export class Community {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  members: string[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Post' })
  posts: string[];
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
