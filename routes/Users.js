import express from "express";
import { DeleteAccount, GetUsers, UpdateProfile , } from "../controllers/Users.js"

const router = express.Router();

router.route('/').get(GetUsers)
router.route('/:id').put(UpdateProfile).delete(DeleteAccount)




export default router;