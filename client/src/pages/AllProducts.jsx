import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
    const {products,searchQuery}=useAppContext();
    const [filteredProducts,setFilteredProducts]=useState([])

    useEffect(()=>{
        if(searchQuery.length>0){
            setFilteredProducts((products.filter((product)=>product.name.toLowerCase().includes(searchQuery.toLowerCase()))))
        }else{
            setFilteredProducts(products)
        }
    },[products,searchQuery])
  return (
    <div className='flex flex-col mt-16'>
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>All Products</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
        {filteredProducts.length>0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 mt-6 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 ' >
            {filteredProducts.filter((product=>product.inStock)).map((product)=>(
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

export default AllProducts