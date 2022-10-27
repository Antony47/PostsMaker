import {IsInt, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class GetManyUsersQueryDto{

    @IsInt()
    offset: number

    @IsInt()
    limit: number

    @IsOptional()
    @IsString()
    search?: string
}