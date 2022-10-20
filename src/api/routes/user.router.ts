import express from "express";
import userController from "../Controllers/user.controller";
import postController from "../Controllers/posts.controller";

const router = express.Router();

router.post('/users',  userController.create.bind(userController));
router.post('/users/verification', userController.verify.bind(userController))
router.get('/users/:id',  userController.getOne.bind(userController));
router.get('/users',  userController.getMany.bind(userController));
router.delete('/users/:id',  userController.delete.bind(userController));
router.patch('/users/:id', userController.update.bind(userController));





export {
    router as userRouter
}