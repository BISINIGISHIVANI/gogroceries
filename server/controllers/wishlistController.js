import User from "../models/user.js";

// Add Product to Wishlist : /api/wishlist/list
export const wishListData=async (req,res)=>{
    try {
        const userId=req.userId;
        const user=await User.findById(userId).populate('whishlistItems.productId')
        if(user){
            res.json({success:true,whishlistItems:user.whishlistItems})
        }else{
            res.json({success:false,message:'User not found'})
        }
    }catch (error) {
        res.json({success:false,message:error.message})
    }
}

// update User Cart Data : /api/wishlist/update

export const updateWishlist= async (req,res)=>{
    try {
        const userId=req.userId;
        const {whishlistItems}=req.body;
        await User.findByIdAndUpdate(userId,{whishlistItems})
        res.json({success:true,message:'Whishlist updated'})
        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}