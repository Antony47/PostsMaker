import {OmitType, PartialType} from "@nestjs/mapped-types";
import {CreatePostDto} from "../../posts/dto/create-post.dto";
import {CreateUserDto} from "./create-user.dto";

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['email'])){
}