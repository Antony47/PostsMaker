import {Router} from "express";
import postController from "../Controllers/PostController.js";

const router = new Router();

router.post('/posts', postController.create.bind(postController));
router.get('/posts', (req, res) => postController.getAll(req, res));
router.get('/posts/:id', postController.getOne.bind(postController));
router.get('/postsByName/:name', postController.getByName.bind(postController).bind(postController))
router.put('/posts', postController.update.bind(postController))
router.delete('/posts/:id', postController.delete.bind(postController))

export default router;