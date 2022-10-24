import {Controller, Delete, Get, Param, Patch, Post, Req, Res} from '@nestjs/common';
import {Request, Response} from "express";
import {UserService} from "../../service/user.service";

@Controller('users')
export class UsersController{

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Req() req: Request, @Res() res: Response) {
        try{
            const createdUser = await this.userService.create(req.body)
            res.status(201).json(createdUser)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }

    @Get()
    async getMany(@Req() req: Request, @Res() res: Response){
        try{
            const user = await this.userService.getMany(req.body)
            res.status(200).json(user)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }

    @Get(':id')
    async getOne(@Param('id') id: number, @Res() res: Response) {
        try{
            const user = await this.userService.getOne(id)
            res.status(200).json(user)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Req() req: Request, @Res() res: Response) {
        try{
            const user = await this.userService.update(id, req.body)
            res.status(200).json(user)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response) {
        try{
            const user = await this.userService.delete(id)
            res.status(200).json(user)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }


    /*async verify(req: Request, res: Response) {
        try{
            const verifyUser = await this.userService.verification(req.body)
            res.status(200).json(verifyUser)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }*/
}