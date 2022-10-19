import express from "express"
import "reflect-metadata"
import {DataSource} from "typeorm"
import dotenv from "dotenv"
import { User } from "./integration/entities/User";
import {postRouter} from "./api/routes/posts.router";
import {userRouter} from "./api/routes/user.router";
import {Post} from "./integration/entities/Post";

dotenv.config();

const app = express();


export const appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST_DB,
    port: 5432,
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    entities: [User, Post],
    synchronize: true,
    logging: true
});


app.use(express.json());
app.use('/api', postRouter);
app.use('/api', userRouter);


const main = async () => {
    try{
        await Promise.all([
            appDataSource.initialize()
        ])
        console.log('Connected to Postgres');

        app.listen(3000, () => {
            console.log('FUCK13');
        });

    }catch (e){
        console.error(e);
        throw new Error("Problem with connection");
    }
}

main()
