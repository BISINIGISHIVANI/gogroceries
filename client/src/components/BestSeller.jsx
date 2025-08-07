import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'
const BestSeller = () => {
    const {products}=useAppContext();
  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
        <div className='flex flex-wrap justify-center sm:justify-start gap-3 md:gap-6 mt-6'>
          {products.filter((product)=>product.inStock).slice(0,5).map((product)=>
          
            <ProductCard key={product._id} product={product}/>
          )}
         
        </div>
    </div>
  )
}

export default BestSeller