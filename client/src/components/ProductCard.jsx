import React from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({product}) => {
    const {currency,addToCart,removeFromCart,cartItems,navigate,addToWishlist,removeFromWishlist,wishlistItems}=useAppContext();

    return product && (
        <div className="border border-gray-500/20 rounded-md px-3 md:px-4 py-2 bg-white flex-1 basis-[180px] max-w-[250px] "> 
            <div className='mt-2 flex items-center justify-end' onClick={(e)=>{e.stopPropagation()}}>
                <img src={wishlistItems[product._id]?assets?.heart_filled:assets?.heart_outline} alt="wishlist-icon" width={20} className='cursor-pointer' onClick={()=>{
                    if(wishlistItems[product._id]){
                        removeFromWishlist(product._id)
                    } else{
                        addToWishlist(product._id)
                    }
                }}/>
            </div>
            <div onClick={()=>{
                navigate(`/products/${product.category.toLowerCase()}/${product._id}`)
                scrollTo(0,0)
            }} className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition w-20 md:w-28 lg:w-32 h-20 md:h-28 lg:h-32 object-cover" src={product.image[0]} alt={product.name} /> {/* Changed: responsive image sizing */}
            </div>
            <div className="text-gray-500/60 text-sm">
                <p className="text-xs md:text-sm">{product.category}</p>
                <p className="text-gray-700 font-medium text-sm md:text-lg truncate w-full">{product.name}</p> 
             
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        <img key={i} src={i<4?assets.star_icon:assets?.star_dull_icon} alt={i} className='w-3 md:w-3.5'/>
                    ))}
                    <p className="text-xs md:text-sm">(4)</p> {/* Added responsive text */}
                </div>
                <div className='flex justify-between mt-3 items-center'> {/* Added items-center */}
                    <div className="text-sm md:text-xl font-medium text-primary flex flex-col md:flex-row items-start md:items-center gap-0.5 md:gap-1.5"> {/* Changed layout for mobile */}
                        <p>{currency}{product.offerPrice}</p> 
                        <span className="text-gray-500/60 text-xs md:text-sm line-through">
                            {currency}{product.price}
                        </span>
                    </div>
                    <div className="text-primary" onClick={(e)=>{e.stopPropagation()}}>
                        {!cartItems[product._id] ? (
                            <button onClick={()=>addToCart(product._id)} className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 w-14 md:w-[80px] h-[34px] rounded text-primary font-medium cursor-pointer text-xs md:text-sm"> 
                                <img src={assets?.cart_icon} alt="cart-icon" className="w-3 md:w-4" />
                                <span className="hidden md:inline">Add</span> 
                                <span className="md:hidden">+</span> 
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-1 md:gap-2 w-14 md:w-20 h-[34px] bg-primary/25 rounded select-none">
                                <button onClick={() => {
                                    removeFromCart(product._id);
                                }} className="cursor-pointer text-sm md:text-md px-1 md:px-2 h-full">
                                    -
                                </button>
                                <span className="w-4 md:w-5 text-center text-sm">{cartItems[product?._id]}</span>
                                <button onClick={() =>{addToCart(product._id)}} className="cursor-pointer text-sm md:text-md px-1 md:px-2 h-full">
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProductCard