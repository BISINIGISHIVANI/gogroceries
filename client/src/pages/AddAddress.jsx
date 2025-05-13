import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const InputField=({type,name ,placeholder,handleChange,address})=>(
    <input
    className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
     type={type}
    placeholder={placeholder}
    name={name}
    value={address[name]}
    onChange={handleChange}
    required
    />
)



const AddAddress = () => {

    const {axios,user,navigate}=useAppContext()

    const [address,setAddress]=React.useState({
        firstName:'',
        lastName:'',
        email:'',
        street:'',
        city:'',
        state:'',
        zipCode:'',
        country:'',
        phone:'',
    })

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setAddress((prev)=>({...prev,[name]:value}))
    }

    const submitHandler=async(e)=>{
        e.preventDefault()
        try {
            const {data}=await axios.post('/api/address/add',{address})
            if(data.success){
                toast.success(data.message)
                navigate('/cart')
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
  
    }

    useEffect(()=>{
        if(!user){
            navigate('/cart')
        }
    },[])

  return (
    <div className='mt-16 pb-14'>
        <p className='text-2xl md:text-3xl text-gray-500'> Add Shipping <span className='font-semibold text-primary'>Address</span></p>
        <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
            <div className='flex-1 max-w-md'>
                <form onSubmit={submitHandler} className='space-y-3 mt-6 text-sm'>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField
                        type='text'
                        name='firstName'
                        placeholder='First Name'
                        address={address}
                        handleChange={handleChange}
                        />
                         <InputField
                        type='text'
                        name='lastName'
                        placeholder='Last Name'
                        address={address}
                        handleChange={handleChange}
                        />
                    </div>
                    <InputField
                        type='email'
                        name='email'
                        placeholder='Email'
                        address={address}
                        handleChange={handleChange}
                        />
                    <InputField
                        type='text'
                        name='street'
                        placeholder='Street Address'
                        address={address}
                        handleChange={handleChange}
                        />
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField
                        type='text'
                        name='city'
                        placeholder='City'
                        address={address}
                        handleChange={handleChange}
                        />
                         <InputField
                        type='text'
                        name='state'
                        placeholder='State'
                        address={address}
                        handleChange={handleChange}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField
                        type='text'
                        name='zipCode'
                        placeholder='Zip Code'
                        address={address}
                        handleChange={handleChange}
                        />
                         <InputField
                        type='text'
                        name='country'
                        placeholder='Country'
                        address={address}
                        handleChange={handleChange}
                        />
                    </div>
                    <InputField
                        type='text'
                        name='phone'
                        placeholder='Phone Number'
                        address={address}
                        handleChange={handleChange}
                        />
                    <button type='submit' className='w-full py-2.5 bg-primary text-white font-medium rounded-md hover:bg-primary-dull transition'>
                        Save Address
                    </button>
                </form>
            </div>
            <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add address" />
        </div>
    </div>
  )
}

export default AddAddress