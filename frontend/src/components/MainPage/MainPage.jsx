import React, { useState } from 'react'
import './MainPage.css'

import Register from '../Register/Register'
import Login from '../Login/Login'
export default function MainPage() {
  const [correctSign, setCorrectSign] = useState('register')
  const handleSign = (type) => {
    setCorrectSign(type)
  }
  return (
    <div className='MainPage c f'>
      <h1>{`${correctSign === 'register' ? 'Welcome to Landing Page' : 'Welcome Back'}`}</h1>
      {correctSign === 'register' && <Register handleSign={handleSign} />}
      {correctSign === 'login' && <Login handleSign={handleSign} />}
    </div>
  )
}
