import {Post} from "../integration/entities/Post";
import {IPost} from "../integration/interfaces/IPost";
import {IFilter} from "../integration/requests/filter.request";

export class PostService{

    async create(post: Post){
        const createdPost = await Post.create(post)
        return createdPost.save();
    }

    async getMany(){
        const posts = await Post.find();
        return posts;
    }

    async filter(filter: IFilter){//offset: number, limit: number, searchTitle?: string
        const posts = (filter.searchTitle) ? await Post.createQueryBuilder().offset(filter.offset).limit(filter.limit).where(`title LIKE :q`, {q: `%${filter.searchTitle}%`}).execute()
        : await Post.createQueryBuilder().offset(filter.offset).limit(filter.limit).execute();

        return posts;
    }

    async getOne(id: number){
        if(!id){
            throw new Error('ID not specified')
        }
        const post = await Post.findBy({id: id});
        return post;
    }

    async update(post: IPost){
        if(!post.id){
            throw new Error('ID not specified')
        }

        const p = {edit: true, ...post};
        const updatedPost = await Post.update(post.id, p);
        return updatedPost;
    }

    async delete(id: number){
        if(!id){
            throw new Error('ID not specified')
        }
        const removedPost = await Post.delete({id: id});

        return removedPost;
    }
}

export default new PostService();