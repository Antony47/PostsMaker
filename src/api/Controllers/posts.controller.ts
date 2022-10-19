import postService, {PostService} from "../../service/post.service";
import {Request, Response} from "express";


class PostController{

    private postService: PostService;

    constructor(postService: PostService) {
        this.postService = postService
    }

    async create(req: Request, res: Response){
        try{
            const post = await this.postService.create(req.body)
            res.status(200).json(post)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }

    async getMany(req: Request, res: Response){
        try {
            const posts = await this.postService.getMany();
            return res.json(posts);
        } catch (e: any){
            res.status(500).json(e.message)
        }
    }

    async getOne(req: Request, res: Response){
        try {
            const post = await this.postService.getOne(Number(req.params.id));
            return res.json(post);
        } catch (e: any){
            res.status(500).json(e.message)
        }
    }

    async filter(req: Request, res: Response){
        try {
            const post = await this.postService.filter(req.body);
            return res.json(post);
        } catch (e: any){
            res.status(500).json(e.message)
        }
    }

    async update(req: Request, res: Response){
        try {
            const updatedPost = await this.postService.update(req.body)
            return res.json(updatedPost);
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }


    async delete(req: Request, res: Response){
        try {
            const post = await this.postService.delete(Number(req.params.id))
            return res.json(post)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }
}

export default new PostController(postService);
