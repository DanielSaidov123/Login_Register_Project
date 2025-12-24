import express from "express";
import { CreateCurses,Connectiontest } from "../controllers/Authentication.js"
const router = express.Router();

router.route('/register').post(CreateCurses)
router.route('/login').post(Connectiontest)

 



export default router;