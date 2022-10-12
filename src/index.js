import  express from 'express'
import mongoose from 'mongoose'
import postRouter from "./api/routes/postRouter.js";
import dotenv from "dotenv"

dotenv.config();
const app = express();

app.use(express.json())
app.use('/api', postRouter)

async function startApp(){
    try{
        await mongoose.connect(process.env.DB_URL);
        app.listen(process.env.PORT, () => console.log('FUCK12' + process.env.PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp()