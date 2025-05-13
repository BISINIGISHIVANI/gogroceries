import User from "../models/user.js";

// update User Cart Data : /api/cart/update


export const updateCart= async (req,res)=>{
    try {
        const userId=req.userId;
        const {cartItems}=req.body;
        await User.findByIdAndUpdate(userId,{cartItems})
        res.json({success:true,message:'Cart updated'})
        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}