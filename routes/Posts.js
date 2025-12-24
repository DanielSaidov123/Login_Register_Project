import express from "express";
import { CreatePost, DeletePost, GetPosts, UpdetPost } from "../controllers/Posts.js"

const router = express.Router();

router.route('/').get(GetPosts).post(CreatePost)
router.route('/:id').put(UpdetPost).delete(DeletePost)


 



export default router;