import Order from "../models/order.js";
import Product from "../models/product.js";
import stripe from "stripe"
import User from "../models/user.js";

// Place Order STRIPE : /api/order/stripe
export const placeOrderStripe=async(req,res)=>{
    try {
        const userId=req.userId
        const {items,address}=req.body;

        const {origin}=req.headers;
        if(!address||items.length===0){
            res.json({success:false,message:'Invalid data'}) 
        }
        let productData=[]
        let amount=await items.reduce(async (acc,item)=>{
            const product=await Product.findById(item.product);
            productData.push({
                name:product.name,
                price:product.price,
                quantity:item.quantity
            })
            return (await acc)+product.offerPrice*item.quantity
        },0)

        // tax
        amount+= Math.floor(amount*0.01)

     const order=await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:'Online'
        })

        // stripe gate way intialization
        const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY)
        
        // create line items for stripe
        const line_items=productData.map((item)=>{
            return {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:Math.floor(item.price+item.price*0.01)*100,
                   
                },
                quantity:item.quantity
            }
        })

        // create session
        const session=await stripeInstance.checkout.sessions.create({
            line_items,
            mode:'payment',
            success_url:`${origin}/loader?next=my-orders`,
            cancel_url:`${origin}/cart`,
            metadata:{
                orderId:order._id.toString(),
                userId
            }
        })

        return res.json({success:true,url:session.url})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// Stripe webhook to verify Payments Action /stripe
export const stripeWebhooks=async (req,res)=>{
    const stripeInstance=new stripe(process.env.STRIPE_SECRET_KEY);

    const sig=req.headers["stripe-signature"]
    let event;
    try {
        event=stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SERVICE
        )
    } catch (error) {
        res.status(400).send(`Webhook error:${error.message}`)
    }
    // Handle event

    switch (event.type) {
        case "payment_intent.succeeded":{
            const paymentIntent=event.data.object;
            const paymentIntentId=paymentIntent.id;

            // Get Session Metadata
            const session=await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId
            })

            const {orderId,userId}=session.data[0].metada;

            await Order.findByIdAndUpdate(orderId,{isPaid:true})
            await User.findByIdAndUpdate(userId,{cartItems:{}})
            break;
        }
        case "payment_intent.payment_failed":{
            const paymentIntent=event.data.object;
            const paymentIntentId=paymentIntent.id;

            // Get Session Metadata
            const session=await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId
            })
            const {orderId}=session.data[0].metada;
            await Order.findByIdAndDelete(orderId)
            break;
        }

        default:
            console.error(`UnHandled event type ${event.type}`)
            break;
    }
    res.json({recevied:true})
}


// Place Order COD : /api/order/cod
export const placeOrderCod=async(req,res)=>{
    try {
        const userId=req.userId
        const {items,address}=req.body;
        if(!address||items.length===0){
            res.json({success:false,message:'Invalid data'}) 
        }

        let amount=await items.reduce(async (acc,item)=>{
            const product=await Product.findById(item?.product);
            return (await acc)+product.offerPrice*item.quantity
        },0)

        // tax
        amount+= Math.floor(amount*0.01)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:'COD'
        })

        return res.json({success:true,message:'Order Placed Successfully'})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}



// Place Order by UserId : /api/order/user
export const getUserOrders=async (req,res)=>{
    try {
        const userId=req.userId;
        const orders=await Order.find({userId,$or:[{paymenType:'COD'},{isPaid:false}]
        }).populate('items.product address').sort({createdAt:-1})
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message}) 
    }
}

// Get All Order (for Admin/seller) : /api/order/seller
export const getAllOrders=async (req,res)=>{
    try {      
        const orders=await Order.find({
            $or:[{paymenType:'COD'},{isPaid:false}]
        }).populate('items.product address').sort({createdAt:-1})
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message}) 
    }
}
