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
