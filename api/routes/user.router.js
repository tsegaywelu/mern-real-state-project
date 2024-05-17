
import express from 'express';
const router=express.Router();
import {updateuser} from '../conrollers/user.controller.js';
import { verifytoken } from '../utilitis/verifyToken.js';

router.patch("/update/:id",  updateuser);




export default router;//this is the default export and when we say import some thing it takes simply for this default 