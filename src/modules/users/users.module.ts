import {Module} from "@nestjs/common";
import {UsersController} from "./users.controller";
import {UserService} from "./user.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../integration/entities/User";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [UsersController],
    providers: [UserService],
    exports: [UserService],
})
export class UsersModule{}