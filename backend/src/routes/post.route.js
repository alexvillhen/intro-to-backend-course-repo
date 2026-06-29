import { Router } from 'express';
import {createPost, editPost,getPostById, getAllPosts} from '../controllers/post.controller.js'

const router = Router();

router.route('/create')
    .post(createPost);

router.get('/', getAllPosts);

router.route('/:id')
    .get(getPostById)
    .patch(editPost);


export default router;