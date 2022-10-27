import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, Res} from '@nestjs/common';
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {GetManyUsersQueryDto} from "./dto/get-many-users-query.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Roles} from "../../shared/decorators/roles.decorator";
import {Role} from "../../enum/role.enum";

@Controller('users')
export class UsersController{

    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto)
    }

    @Get()
    getMany(@Query() query: GetManyUsersQueryDto){
       return this.userService.getMany(query.offset, query.limit, query.search)
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return  this.userService.getOne(id)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
        return this.userService.update(id, dto)
    }

    @Roles(Role.Admin)
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
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