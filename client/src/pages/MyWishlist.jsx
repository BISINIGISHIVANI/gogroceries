import React from 'react'
import { useAppContext } from '../context/AppContext'
import {useMemo} from 'react';
import ProductCard from '../components/ProductCard';

const MyWishlist = () => {
  const {wishlistItems, products} = useAppContext();

  // Calculate wishlist array directly with useMemo
  const wishlistArray = useMemo(() => {
      if (!products.length || !wishlistItems) return [];
      
      return Object.keys(wishlistItems)
          .map(productId => products.find(product => product._id === productId))
          .filter(product => product); // Remove undefined products
  }, [wishlistItems, products]);

  return (
      <div className='flex flex-col mt-16'>
          <div className='flex flex-col items-end w-max'>
              <p className='text-2xl font-medium uppercase'>My Wishlist</p>
              <div className='w-16 h-0.5 bg-primary rounded-full'></div>
          </div>
          
          {products.length === 0 ? (
              <div className='flex items-center justify-center h-[60vh]'>
                  <p className='text-lg text-gray-500'>Loading products...</p>
              </div>
          ) : wishlistArray.length > 0 ? (
              <div className='grid grid-cols-2 sm:grid-cols-3 mt-6 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6'>
                  {wishlistArray.filter(product => product.inStock).map(product => (
                      <ProductCard key={product._id} product={product}/>
                  ))}
              </div>
          ) : (
              <div className='flex flex-col items-center justify-center h-[60vh]'>
                  <p className='text-2xl font-medium text-primary'>Your wishlist is empty 💔</p>
                  <p className='text-gray-500 mt-2'>Add some products to see them here!</p>
              </div>
          )}
      </div>
  );
};


export default MyWishlist