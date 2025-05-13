import React,{useEffect, useState} from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
const SellerLogin = () => {
    const {isSeller,setIsSeller,navigate,axios}=useAppContext();
    const [email,setEmail]=useState("admin@gmail.com");
    const [password,setPassword]=useState("123456");

    const onSubmit=async (e) => {
        try {
            e.preventDefault();
            const {data}=await axios.post('/api/seller/login',{
                email,password
            })
            if(data.success){
                setIsSeller(true)
                navigate('/seller')
            }else{
                console.error('error:', data.message)
                toast.error(data.message)
            }
        } catch (error) {
            console.error('error:', error)
            toast.error(error.message)
        }
       
        
    }

    useEffect(() => {
        if(isSeller){
            navigate("/seller");
        }
    }
    , [isSeller]);
  return !isSeller&&(
    <form onSubmit={onSubmit} className='min-h-screen flex items-center text-sm text-gray-500'>
        <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
            <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller</span> Login</p>
            <div className='w-full'>
                <label htmlFor="email" className='text-sm font-medium'>Email</label>
                <input type="email" id='email' onChange={(e)=>setEmail(e.target.value)}  value={email} 
                className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
                placeholder='enter your email'
                />
            </div>
            <div className='w-full'>
                <label htmlFor="password" className='text-sm font-medium'>Password</label>
                <input type="password" id='password' onChange={(e)=>setPassword(e.target.value)} value={password} 
                 className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' 
                 placeholder='enter your password'
                 />
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
        </div>
       
    </form>
  )
}

export default SellerLogin