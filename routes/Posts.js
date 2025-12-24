import express from "express";
import { CreatePost, GetPosts } from "../controllers/Posts.js"

const router = express.Router();

router.route('/').get(GetPosts).post(CreatePost)

 



export default router;