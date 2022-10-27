import {User} from "../../integration/entities/User"
import * as bcrypt from 'bcrypt';
import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}


    async create({email, password, age}: CreateUserDto){
        const existingUser = await this.userRepository.findOneBy({email});

        if(existingUser){
            throw new BadRequestException('This user already exist');
        }

        const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));

        const user = this.userRepository.create({
            email,
            password: passwordHash,
            age,
        })

        const {id} = await this.userRepository.save(user);
        return {id};
    }


    async getMany(offset: number, limit: number, search?: string){
        const queryBuilder = this.userRepository.createQueryBuilder().offset(offset).limit(limit);
        if(search){
            queryBuilder.where(`email ILIKE :search`, {search: `%${search}%`})
        }

        const [users, total] = await queryBuilder.getManyAndCount();
        return {users, total};
    }


    async getOne(id: number){
        const user = await this.userRepository.findOneBy({id});
        if(!user){
            throw new NotFoundException('This user doesnt exist');
        }

        return user;
    }

    async findOne(email: string){
        const user = await this.userRepository.findOneBy({email});
        if(!user){
            throw new NotFoundException('This user doesnt exist');
        }

        return user;
    }


    async update(id: number, dto: UpdateUserDto){

        const existedUser = await this.getOne(id);
        const saltRounds = Number(process.env.SALT_ROUNDS);

        if(dto.password)
            dto.password = await bcrypt.hash(dto.password, saltRounds)

        const updatedUser = this.userRepository.merge(existedUser, dto);
        await this.userRepository.save(updatedUser)
    }


    async delete(id: number){
        const user = await this.getOne(id)
        await this.userRepository.remove(user)
    }
}