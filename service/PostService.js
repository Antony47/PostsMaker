import Post from "../integration/Post.js";

class PostService{
    async create(post){
        const createdPost = await Post.create(post)
        return createdPost;
    }

    async getAll(){
        const posts = await Post.find();
        return posts;
    }

    async getOne(id){
        if(!id){
            throw new Error('ID not specified')
        }
        const post = await Post.findById(id);
        return post;

    }

    async getByName(name){
        if(!name){
            throw new Error('Author not found');
        }
        const post = await Post.find({author: name})/*.exec()*/;
        return post;
    }

    async update(post){
        if(!post._id){
            throw new Error('ID not specified')
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new:true})
        return updatedPost;
    }

    async delete(id){
        if(!id){
            throw new Error('ID not specified')
        }
        const post = await Post.findByIdAndDelete(id)
        return post;
    }
}

export default new PostService();