import userService, {UserService} from "../../service/user.service";
import {Request, Response} from "express";

class UserController{

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService
    }

     async create(req: Request, res: Response) {
        try{
            const createdUser = await this.userService.create(req.body)
            res.status(200).json(createdUser)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }

    async getMany(req: Request, res: Response){
        try{
            const user = await this.userService.getMany(req.body)
            res.status(200).json(user)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }

    async getOne(req: Request, res: Response) {
        try{
            const user = await this.userService.getOne(Number(req.params.id))
            res.status(200).json(user)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }

    async update(req: Request, res: Response) {
        try{
            const user = await this.userService.update(Number(req.params.id), req.body)
            res.status(200).json(user)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }

    async delete(req: Request, res: Response) {
        try{
            const user = await this.userService.delete(Number(req.params.id))
            res.status(200).json(user)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }


    async verify(req: Request, res: Response) {
        try{
            const verifyUser = await this.userService.verification(req.body)
            res.status(200).json(verifyUser)
        }catch (e: any){
            res.status(500).json(e.message)
        }
    }
}

export default new UserController(userService)