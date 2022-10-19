import {User} from "../integration/entities/User"
import {IUser} from "../integration/interfaces/IUser";
import bcrypt from 'bcrypt';

export class UserService{//update, getOne, delete

    async create(user: IUser){
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


        return createdUser.save();
    }

    async getMany(){
        const users = User.find();
        return users;
    }


    async getOne(id: number){
        if(!id){
            throw new Error('ID not specified')
        }

        const searchedUser = await User.findOne({
            where:{
                id: id
            }
        });
        if(!searchedUser){
            throw new Error('This user doesnt exist');
        }

        return searchedUser;
    }


    async update(user: IUser){

        const saltRounds = Number(process.env.SALT_ROUNDS as string);

        await User.update(user.id, user);
        return this.getOne(user.id);
    }

    async delete(id: number){

        const searchedUser = await this.getOne(id);

        const removedUser = await User.remove(searchedUser)

        return removedUser;
    }


    async verification(user: IUser){

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