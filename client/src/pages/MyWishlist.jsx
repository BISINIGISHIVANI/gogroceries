import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useEffect ,useState} from 'react';
import ProductCard from '../components/ProductCard';

const MyWishlist = () => {
    const {wishlistItems,products}=useAppContext();
    const [wishlistArray,setWishlistArray]=useState([]);

    const fetchWishlist=async () => {
      const wishlistArray=[];
      for(let key in wishlistItems){
        const product=products.find((product)=>product._id===key);
        if(product){
            wishlistArray.push(product);
        }
      }
      setWishlistArray(wishlistArray);
    }
    useEffect(() => {
        if(products.length > 0 && wishlistItems){
            fetchWishlist();
        }
      }, [products,wishlistItems])
  return (
    <div className='flex flex-col mt-16'>
          <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>My  Wishlist</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'> </div>
        </div>
        {wishlistArray.length>0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 mt-6 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 ' >
            {wishlistArray.filter((product=>product.inStock)).map((product)=>(
                <ProductCard key={product._id} product={product}/>
            ))}
        </div>):
        <div className='flex flex-col items-center justify-center h-[60vh]'>
            <p className='text-2xl font-medium text-primary'>No products found 🧐</p>
            </div>
              }
    </div>
  )
}

export default MyWishlist