import {User} from "../integration/entities/User"
import {CreateUserDto, UpdateUserDto} from "../integration/interfaces/IUser";
import bcrypt from 'bcrypt';
import {IUserFilter} from "../integration/requests/filter.users.request";

export class UserService{

    async create(user: CreateUserDto){
        const testUser = await User.findOne({
            where:{
                email: user.email
            }
        });

        if(testUser){
            throw new Error('This user already exist');
        }

        const saltRounds = Number(process.env.SALT_ROUNDS as string);

        const createdUser = User.create({
            email: user.email,
            password: await bcrypt.hash(user.password, saltRounds),
            age: user.age,
        })

        const {id} = await createdUser.save();
        return {id};
    }


    async getMany(filter: IUserFilter){
        const queryBuilder = User.createQueryBuilder().offset(filter.offset).limit(filter.limit);
        if(filter.searchEmail){
            queryBuilder.where(`email ILIKE :q`, {q: `%${filter.searchEmail}%`})
        }

        const [users, total] = await queryBuilder.getManyAndCount();
        return { users, total};
    }


    async getOne(id: number){
        const searchedUser = await User.findOneBy({id: id});
        if(!searchedUser){
            throw new Error('This user doesnt exist');
        }

        return searchedUser;
    }


    async update(id: number, dto: UpdateUserDto){

        const existedUser = await this.getOne(id);
        const saltRounds = Number(process.env.SALT_ROUNDS as string);

        if(dto.password)
            dto.password = await bcrypt.hash(dto.password, saltRounds)

        const updatedUser = User.merge(existedUser, dto);
        await User.save(updatedUser)
    }

    async delete(id: number){
        await User.delete({id: id})
    }


    async verification(user: CreateUserDto){
        const testUser = await User.findOne({
            where:{
                email: user.email
            }
        });
        if(testUser){
            const result = await bcrypt.compare(user.password, testUser.password)

            if(result){
                return "Good. Get your token";
            }else{
                throw new Error("Wrong password");
            }
        }else{
            throw new Error('This user doesnt exist');
        }
    }
}

export default new UserService();