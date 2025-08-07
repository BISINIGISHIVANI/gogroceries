import { createContext, useContext,useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from 'axios'

axios.defaults.withCredentials=true  
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL

export const AppContext =createContext();
 const AppContextProvider = ({ children }) => {

    const currency=import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user,setUser] = useState(null);
    const [isSeller,setIsSeller] = useState(false);
    const [showUserLogin,setShowUserLogin] = useState(false);
    const [products,setProducts] = useState([]);
  
    const [searchQuery,setSearchQuery]=useState({})
    const [wishlistItems, setWishlistItems] = useState({});
const [cartItems, setCartItems] = useState({});






    // fetch Seller Status
    const fetchSeller=async()=>{
        try {
            const {data}=await axios.get('/api/seller/is-auth')
            if(data.success){
                setIsSeller(true)
            }else{
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }

    // fetch User Status
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth');
            if (data.success) {
                setUser(data.user);
                
                // Merge server data with localStorage for authenticated users
                const localCart = JSON.parse(localStorage.getItem('cartItems') || '{}');
                const localWishlist = JSON.parse(localStorage.getItem('wishlistItems') || '{}');
                
                // Merge logic: combine server + local data
                const mergedCart = { ...localCart, ...(data.user.cartItems || {}) };
                const mergedWishlist = { ...localWishlist, ...(data.user.wishlistItems || {}) };
                
                setCartItems(mergedCart);
                setWishlistItems(mergedWishlist);
            }
        } catch (error) {
            setUser(null);
        }
    };
    
    // fetch All Products
    const fetchProducts=async () => {
       try {
         const {data}=await axios.get('/api/product/list')
         if(data.success){
            setProducts(data.products)
         }else{
             toast.error(data.message)  
         }

       } catch (error) {
         toast.error(error.message)  
       }
    }

    // Add to Wishlist
    const addToWishlist = (productId) => {
        const wishlistData = { ...wishlistItems };
        wishlistData[productId] = (wishlistData[productId] || 0) + 1;
        setWishlistItems(wishlistData);
        toast.success('Added to wishlist');
    };
    
    const removeFromWishlist = (productId) => {
        const wishlistData = { ...wishlistItems };
        if (wishlistData[productId]) {
            wishlistData[productId] -= 1;
            if (wishlistData[productId] === 0) {
                delete wishlistData[productId];
            }
            setWishlistItems(wishlistData);
            toast.success('Removed from wishlist');
        }
    };
    
  

    //Add to Cart
    const addToCart=(productId) => {
        let cartData=structuredClone(cartItems);
        if(cartData[productId]){
            cartData[productId]+=1;
        }
        else{
            cartData[productId]=1;
        }

        // cartData[productId]=cartData[productId] ? cartData[productId]+1 : 1;
        setCartItems(cartData);
        toast.success('Product added to cart');
    };

    // Update Cart
    const updateCart=(productId,quantity) => {
        let cartData=structuredClone(cartItems);
        if(cartData[productId]){
            cartData[productId] =quantity;
        }
      
        setCartItems(cartData);
        toast.success('Product quantity updated');
    }

    // Remove from Cart
    const removeFromCart=(productId) => {
        let cartData=structuredClone(cartItems);
        if(cartData[productId]){
            cartData[productId]-=1;
            if(cartData[productId]===0){
                delete cartData[productId];
            }
        }
        setCartItems(cartData);
        toast.success('Product removed from cart');
    }

    // Clear cart item
   const clearCartItem = (productId) => {
    let cartData = structuredClone(cartItems);
    
    if (cartData[productId]) {
        delete cartData[productId];  // Directly remove the item from the cart
    }
    
    setCartItems(cartData);
    toast.success('Product removed from cart');
    };

    //getCart count
    const getCartCount=() => {
        let count=0;
        for(let i in cartItems){
            count+=cartItems[i];
        }
        return count;
    }

    //getCart total Amount
    const getCartTotal=() => {
        let total=0;
        for(let i in cartItems){
            let product=products.find((product)=>product._id===i);
            total+=product.offerPrice*cartItems[i];
        }
        return Math.floor(total*100)/100;
    }
 
    useEffect(() => {
        fetchSeller();
        fetchUser()
        fetchProducts();     
    },[])

  


    useEffect(() => {
        if (!user) {
            // Load from localStorage for guest users
            const savedCart = localStorage.getItem('cartItems');
            const savedWishlist = localStorage.getItem('wishlistItems');
            
            if (savedCart) setCartItems(JSON.parse(savedCart));
            if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));
        }
    }, [user]);
    useEffect(() => {
        const updateUserData = async () => {
            if (!user) return;
            
            try {
                await Promise.all([
                    axios.post('/api/cart/update', { cartItems }),
                    axios.post('/api/wishlist/update', { wishlistItems })
                ]);
            } catch (error) {
                toast.error('Failed to sync data');
            }
        };
        
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
        
       
        if (user) {
            updateUserData();
        }
    }, [cartItems, wishlistItems, user]);
    
    const value={navigate,user,setUser,isSeller,setIsSeller,showUserLogin,setShowUserLogin,products,currency,cartItems,setCartItems,addToCart,updateCart,removeFromCart
        ,searchQuery,setSearchQuery,getCartCount,getCartTotal,axios,
        fetchProducts,clearCartItem,wishlistItems,setWishlistItems,addToWishlist,removeFromWishlist
    };
   
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export  {AppContextProvider, useAppContext};