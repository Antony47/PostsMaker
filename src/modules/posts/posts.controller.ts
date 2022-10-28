import { PostService } from './post.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { GetManyPostsQueryDto } from './dto/get-many-posts-query.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/passports/jwt-auth.guard';
import { User, UserPayload } from '../../shared/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@User() user: UserPayload, @Body() dto: CreatePostDto) {
    return this.postService.create(user.id, dto);
  }

  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.postService.getOne(id);
  }

  @Get()
  getMany(@Query() query: GetManyPostsQueryDto) {
    return this.postService.getMany(query.offset, query.limit, query.search);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: UserPayload,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postService.update(id, user.id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string, @User() user: UserPayload) {
    return this.postService.delete(id, user.id);
  }
}
