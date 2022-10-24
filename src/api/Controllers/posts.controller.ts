import {PostService} from "../../service/post.service";
import {Request, Response} from "express";
import {Controller, Delete, Get, Param, Patch, Post, Req, Res} from "@nestjs/common";


@Controller('posts')
export class PostsController {

    constructor(private readonly postService: PostService) {}

    @Post()
    async create(@Req() req: Request, @Res() res: Response){
        try{

            const post = await this.postService.create(req.body)
            res.status(200).json(post)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }

    @Get(':id')
    async getOne(@Param('id') id:number, @Res() res: Response){
        try {
            const post = await this.postService.getOne(id);
            return res.json(post);
        } catch (e: any){
            res.status(500).json(e.message)
        }
    }

    @Get()
    async getMany(@Req() req: Request, @Res() res: Response){
        try {
            const post = await this.postService.getMany(req.body);
            return res.json(post);
        } catch (e: any){
            res.status(500).json(e.message)
        }
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Req() req: Request, @Res() res: Response){
        try {
            const updatedPost = await this.postService.update(id, req.body)
            return res.json(updatedPost);
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response){
        try {
            const post = await this.postService.delete(id)
            return res.json(post)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }
}

