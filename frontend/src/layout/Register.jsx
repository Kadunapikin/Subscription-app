import React, { useState } from 'react';
import { toast } from 'react-toastify';
import firebase from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
        //write a conditional statement to check that all fields are valid
            if (!fullName || !email || !password) { 
                toast.error('Please enter all required fields');
                return;
            }
                // Validate email format
            const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!emailPattern.test(email)) {
                toast.error('Invalid email format. Please enter a valid email.');
                return;
            }
                  // Validate password length
            if (password.length < 6) {
                toast.error('Password must be at least 6 characters long.');
                return;
            }
            const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
            if(response.user){
                await response.user.updateProfile({
                    displayName: fullName
                })
                const uid = response.user.uid;
                const userRef = firebase.database().ref('users' + uid);
                await userRef.set({
                    uid: uid,
                    email: email,
                    username: fullName
                })
                setFullName('');
                setEmail('');
                setPassword('');

                await navigate('/login');
            }

        } catch (error) {
            console.log('register error: ' + error.message);
        }
    }    
    

  return (
    <div className='flex items-center w-full mx-auto h-screen diagonal-background'>
        <form onSubmit={handleSubmit} className='grid place-items-center lg:w-5/12 sm:w-9/12 w-11/12 mx-auto bg-white text-[#4f7cff] shadow-2xl rounded-3xl' action="">
            <div className='pt-16 pb-4 text-3xl font-bold capitalize'>
                Register To Services
            </div>
            {/* full name */}
            <div className='w-full flex flex-col px-14 pb-3'>
                <label>Full name</label>
                <input 
                value={fullName}
                onChange={(e) => {setFullName(e.target.value)}}
                type="text" 
                className='w-full border border-gray-300 rounded-lg px-3 py-3 mt-1 text-lg outline-none'
                placeholder='your full name'
                required
                />
            </div>
            {/* email */}
            <div className='w-full flex flex-col px-14 py-3'>
                <label>Email</label>
                <input 
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                type="email" 
                className='w-full border border-gray-300 rounded-lg px-3 py-3 mt-1 text-lg outline-none'
                placeholder='example@gmail.com'
                required
                />
            </div>
            {/* password */}
            <div className='w-full flex flex-col px-14 py-3'>
                <label>Password</label>
                <input 
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
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