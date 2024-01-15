import React from 'react'

const Register = () => {
  return (
    <div className='flex items-center w-full mx-auto h-screen diagonal-background'>
        <form className='grid place-items-center lg:w5/12 sm:w-9/12 mx-auto border-white text-[#4f7cff] shadow-2xl rounded-3xl' action="">
            <div className='pt-16 pb-4 text-3xl font-bold capitalize'>
                Register To Services
            </div>
            {/* full name */}
            <div className='w-full flex flex-col px-14 py-8'>
                <label htmlFor="">Full name</label>
                <input 
                type="text" 
                className='w-full border border-gray-300 rounded-lg px-3 py-3 mt-1 text-lg outline-none'
                placeholder='your full name'
                required
                />
            </div>
            {/* email */}
            <div className='w-full flex flex-col px-14 py-8'>
                <label htmlFor="">Email</label>
                <input 
                type="email" 
                className='w-full border border-gray-300 rounded-lg px-3 py-3 mt-1 text-lg outline-none'
                placeholder='example@gmail.com'
                required
                />
            </div>
            {/* password */}
            <div className='w-full flex flex-col px-14 py-8'>
                <label htmlFor="">Password</label>
                <input 
                type="password" 
                className='w-full border border-gray-300 rounded-lg px-3 py-3 mt-1 text-lg outline-none'
                placeholder='******'
                required
                />
            </div>
            <div className='w-full flex justify-between items-center px-14 pb-8 text-[#3d5fc4]'>
                <div>Already have an account?</div>
                <div>
                    <a href="/login">Login Now</a>
                </div>
            </div>
            <div className='mx-auto flex justify-center items-center pt-6 pb-16'>
                <button 
                type='submit' 
                className='bg-[#3d5fc4] text-white rounded-md text-base uppercase w-24 py-2'
                >
                    Register
                </button>
            </div>
        </form>
    </div>
  )
}

export default Register