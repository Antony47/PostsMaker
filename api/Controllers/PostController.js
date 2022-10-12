import postService from "../../service/PostService.js";

class PostController{

    constructor(postService) {
        this.postService = postService
    }

    async create(req, res){
        try{
            const post = await this.postService.create(req.body)
            res.status(200).json(post)
        }catch (e){
            res.status(500).json(e.message)
        }
    }

    async getAll(req, res){
        try {
            const posts = await this.postService.getAll();
            return res.json(posts);
        } catch (e){
            res.status(500).json(e.message)
        }
    }

    async getOne(req, res){
        try {
            const post = await this.postService.getOne(req.params.id);
            return res.json(post);
        } catch (e){
            res.status(500).json(e.message)
        }
    }

    async getByName(req, res){
        try {
            const post = await this.postService.getByName(req.params.name);
            return res.json(post);
        } catch (e){
            res.status(500).json(e.message)
        }
    }

    async update(req, res){
        try {
            const updatedPost = await this.postService.update(req.body)
            return res.json(updatedPost);
        }catch (e){
            res.status(500).json(e.message)
        }
    }

    async delete(req, res){
        try {
            const post = await this.postService.delete(req.params.id)
            return res.json(post)
        }catch (e){
            res.status(500).json(e.message)
        }
    }
}

export default new PostController(postService);

