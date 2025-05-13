import Address from "../models/address.js";

//  Add Address :/api/address/add
export const addAddress=async(req,res)=>{
    try {
        const userId=req.userId;
        const {address}=req.body;
        await Address.create({...address,userId})
        res.json({success:true,message:'Address Added sucessfully'})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//  get Address :/api/address/get
export const getAddress=async(req,res)=>{
    try {
        const userId=req.userId;
        const addresses=await Address.find({userId})
        res.json({success:true,addresses})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

