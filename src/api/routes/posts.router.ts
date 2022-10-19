import express from "express";
import postController from "../Controllers/posts.controller";

const router = express.Router();

router.post('/posts', postController.create.bind(postController));
router.get('/posts', (req, res) => postController.getMany(req, res));
router.get('/posts/:id', postController.getOne.bind(postController));
router.put('/posts', postController.update.bind(postController));
router.delete('/posts/:id', postController.delete.bind(postController));
router.get('/posts-filter', postController.filter.bind(postController))

export {
    router as postRouter
}