import express from "express";
import postController from "../Controllers/posts.controller";

const router = express.Router();

router.post('/posts', postController.create.bind(postController));
router.get('/posts/:id', postController.getOne.bind(postController));
router.patch('/posts/:id', postController.update.bind(postController));
router.delete('/posts/:id', postController.delete.bind(postController));
router.get('/posts', postController.getMany.bind(postController))

export {
    router as postRouter
}