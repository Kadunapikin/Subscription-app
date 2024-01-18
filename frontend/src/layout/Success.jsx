import React from 'react';
import success from '../assets/success.jpg';

const Success = () => {
  return (
    <div className='m-0 p-0'>
      <div className='w-full min-h-[80vh] flex flex-col justify-center items-center'>
        <div className='my-10 text-green-600 text-2xl mx-auto flex flex-col justify-center items-center'>
          <img src={success} alt="" width={220} height={220}/>
          <h3 className='text-4xl pt-8 lg:pt-0 font-bold text-center text-slate-700'>
            Payment Successful
          </h3>
          <button className='w-40 uppercase bg-[#3d5fc4] text-white text-xl my-16 px-2 rounded'>Proceed</button>
        </div>

      </div>
    </div>
  )
}

export default Success