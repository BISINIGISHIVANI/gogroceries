import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


const MyWishlist = () => {
    const {wishlistItems,user,setWishlistItems}=useAppContext();
    console.log('wishlistItems:', wishlistItems)
    const fetchWishlist=async () => {
        try {
            const {data}=await axios.get('/api/wishlist/list')
            // if(data.success){
            //     setWishlistItems(data.wishlistItems);
            // }
        } catch (error) {
            toast.error(data.message)
        }
    }
    useEffect(() => {
        if(user){
            fetchWishlist();
        }
      }, [user])
  return (
    <div className='flex flex-col mt-16'>
          <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>My  Wishlist</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
    </div>
  )
}

export default MyWishlist