import express  from "express";
const router=express.Router();

import {getPosts,createPost,updatePost,deletePost,likePost} from '../controller/posts.js'
//http://localhost:500/posts

router.get('/',getPosts);//get
router.post('/',createPost);//post
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost',likePost);
export default router;