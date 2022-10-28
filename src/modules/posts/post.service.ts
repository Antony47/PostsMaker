import { Post } from '../../integration/entities/Post';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { GetManyPostsQueryDto } from './dto/get-many-posts-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(userId: string, dto: CreatePostDto) {
    const post = this.postRepository.create({ ...dto, userId });
    const { id } = await this.postRepository.save(post);
    return { id };
  }

  async getMany(offset: number, limit: number, search?: string) {
    const queryBuilder = this.postRepository
      .createQueryBuilder()
      .offset(offset)
      .limit(limit);
    if (search) {
      queryBuilder.where(`title ILIKE :search`, { search: `%${search}%` });
    }

    const [posts, total] = await queryBuilder.getManyAndCount();
    return { posts, total };
  }

  async getOne(id: string) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: string, userId: string, dto: UpdatePostDto) {
    const existedPost = await this.getOne(id);
    if (existedPost.userId !== userId) throw new ForbiddenException();

    const post = this.postRepository.merge(existedPost, { ...dto, edit: true });
    await this.postRepository.save(post);
  }

  async delete(id: string, userId: string) {
    const existedPost = await this.getOne(id);
    if (existedPost.userId !== userId) throw new ForbiddenException();

    await this.postRepository.delete({ id });
  }
}
