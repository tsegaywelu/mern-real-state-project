import User from '../models/users.model.js';

import bcryptjs from 'bcryptjs';

export const updateuser = async (req, res) => {


    /* if(req.user.id !== req.params.id){
        return res.status(403).json("You can update only your account!");
    }  */

    try {  
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        } 
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar
            }
        },{new:true});//this new true returns for the awaiting variable the updated user 
        const {password,...others}=updatedUser._doc
        res.status(200).json(
          {
            success:true,
            message:"User updated successfully",
            user:others
          }
        );
       

       
}
catch(error){
    next(error)
}
}
export const deleteuser = async (req, res) => {
    /* if(req.user.id !== req.params.id){
        return res.status(403).json("You can delete only your account!");
    } */

    try {   
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json(
            {
                success:true,
                message:"User deleted successfully"
            }
        )
    }
    catch(error){
        next(error)
    }
}
export const getListings = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
