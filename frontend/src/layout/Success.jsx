import React, { useState } from 'react';
import success from '../assets/success.jpg';
import firebase from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate
  const [userId, setUserId] = useState('');
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        setUserId(user.uid);
        const userRef = firebase.database().ref('users/' + user.uid);
        userRef.on('value', (snapshot) => {
          const userVal = snapshot.va();
          if(userVal) {
            setSessionId(user.subscription.sessionId || '');
          }
        })
      }
    })
  }, [userId, setUserId]);

  const handlePaymentSuccess = () => {
    fetch('http://localhost:5000/api/v1/payment-success', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({sessionId: sessionId, firebase: userId})
    })
    .then((res) => {
        if (res.ok) return res.json();
        return res.json().then(json => Promise.reject(json))
    })
    .then(data => {
      console.log(data.message);
      navigate('/');
    })
    .catch(err => {
      console.log(err.error);
    })
  }

  return (
    <div className='m-0 p-0'>
      <div className='w-full min-h-[80vh] flex flex-col justify-center items-center'>
        <div className='my-10 text-green-600 text-2xl mx-auto flex flex-col justify-center items-center'>
          <img src={success} alt="" width={220} height={220}/>
          <h3 className='text-4xl pt-8 lg:pt-0 font-bold text-center text-slate-700'>
            Payment Successful
          </h3>
          <button onClick={() => handlePaymentSuccess}
          className='w-40 uppercase bg-[#3d5fc4] text-white text-xl my-16 px-2 rounded'>Proceed</button>
        </div>

      </div>
    </div>
  )
}

export default Success