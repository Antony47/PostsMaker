import {Post} from "../integration/entities/Post";
import {CreatePostDto, UpdatePostDto} from "../integration/dto/IPost";
import {IFilter} from "../integration/requests/filter.request";
import {Injectable} from "@nestjs/common";

@Injectable()
export class PostService{

    async create(post: CreatePostDto){
        const createdPost = Post.create(post as any)
        const {id} = await createdPost.save();
        return {id};
    }

    async getMany(filter: IFilter){

        const queryBuilder = Post.createQueryBuilder().offset(filter.offset).limit(filter.limit);
         if(filter.searchTitle){
            queryBuilder.where(`title ILIKE :q`, {q: `%${filter.searchTitle}%`})
         }

         const [posts, total] = await queryBuilder.getManyAndCount();
         return { posts, total};
    }

    async getOne(id: number){
        const post = await Post.findOneBy({id: id});
        if(!post) throw new Error("Post not found");
        return post;
    }

    async update(id: number, dto: UpdatePostDto){
        const existedPost = await this.getOne(id);
        const updDto = {...dto, edit: true};
        const post = Post.merge(existedPost, updDto as any)

        await Post.save(post)
    }

    async delete(id: number){
        await Post.delete({id: id});
    }
}