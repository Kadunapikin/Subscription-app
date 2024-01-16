import React, { useEffect, useState } from 'react'
import basic from '../assets/basic.jpg';
import standard from '../assets/standard.jpg';
import premium from '../assets/premium.jpg';
import firebase from '../firebase/firebaseConfig';


const data = [
    {
        id: 1,
        src: basic,
        title: 'basic',
        price: '9'
    },
    {
        id: 2,
        src: standard,
        title: 'standard',
        price: '19'
    },
    {
        id: 3,
        src: premium,
        title: 'premium',
        price: '39'
    }
]

const Home = () => {
    const [userId, setUserId] = useState(''); 
    const [userName, setUserName] = useState('');

    useEffect(() => {
        firebase.auth().onIdTokenChanged((user) => {
            if(user) {
                setUserId(user.uid);
                setUserName(user.displayName);
            } else {
                setUserId('');
                setUserName('');
            }
        })
    }, [userId]); 
  return (
    <>
    <div className='flex flex-col items-center w-full mx-auto min-h-screen diagonal-background overflow-x-hidden'>
        <div className='flex justify-between  items-center w-full px-6 h-20 bg-[#00000012]'>
            <div className='text-4xl font-bold text-white'>
                serVices
            </div>
            <div className='flex justify-center items-center'>
            { !userId? (<a href='/login'
                className='bg-white px-4 py-2 uppercase w-auto rounded-lg text-xl text-[#4f7cff] font-semibold'>
                    Login
                </a>) : (
                <div className='flex justify-center items-center space-x-4'>
                    <span className='text-white text-xl'>{userName}</span>
                    <button className='bg-white px-4 py-2 w-auto rounded-lg text-base uppercase font-semibold text-[#4f7cff]'>
                        Logout
                    </button>
                </div>)
            }
            </div>
        </div>
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 z-50 place-items-center w-9/12 mx-auto mt-20'>
            {
                data.map((item, index) => (
                    <div key={index}
                    className='bg-white px-6 py-8 rounded-xl text-[#4f7cff] w-full mx-auto grid place-items-center'>
                        <img src={item.src} 
                        alt=""
                        width={200}
                        height={200}
                        className='h-40' 
                        />
                        <div className='text-4xl text-slate-700 text-center py-4 font-bold'>{item.title}</div>
                        <div className='lg:text-sm text-xs text-center px-6 text-slate-500'
                        >Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        </div>
                        <div className='text-4xl text-center font-bold py-4'>${item.price}</div>
                        <div className='mx-auto flex justify-center items-center my-3'>
                            <button className='bg-[#3d5fc4] text-white rounded-md text-base uppercase w-24 py-2 font-bold'>
                                Start
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default Home