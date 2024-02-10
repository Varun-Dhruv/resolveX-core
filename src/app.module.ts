import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostsModule } from './posts/posts.module';
import { ComplaintModule } from './complaint/complaint.module';
import { CommunityModule } from './community/community.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrganizationModule } from './organization/organization.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/static',
      rootPath: join(__dirname, '..', 'static'),
    }),
    MongooseModule.forRoot('mongodb://db:27017/test'),
    UserModule,
    PostsModule,
    ComplaintModule,
    CommunityModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
