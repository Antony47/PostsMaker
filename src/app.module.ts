import { Module } from '@nestjs/common';
import {UserService} from "./service/user.service";
import {PostService} from "./service/post.service";
import {UsersController} from "./api/Controllers/users.controller";
import {PostsController} from "./api/Controllers/posts.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./integration/entities/User";
import {Post} from "./integration/entities/Post";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Post],
      synchronize: true,
      logging: true
    })],
  controllers: [UsersController, PostsController],
  providers: [UserService, PostService],
})
export class AppModule {}
