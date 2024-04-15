import React from 'react'
import './Login.css'

import { AiFillAlert } from "react-icons/ai";

import LoginJS from './LoginJS'
export default function Login({ handleSign }) {
  const { form, handleForm, handleLogin, fetchingData, View, fetchErrors } = LoginJS()
  return (
    <div className='Login c f'>
      <h2>Login</h2>
      <form style={{display: !fetchingData ? 'flex' : 'none'}} className='c f' onSubmit={handleLogin}>
        {form.map((info, index) => (
          <div className='input c' key={index}>
            <input
              id={info.field}
              type={info.field}
              value={info.value}
              maxLength={info.maxSymbols}
              minLength={info.minSymbols}
              onChange={(e) => handleForm(info.field, e)}
              required
              placeholder=''
            />
            <label htmlFor={info.field}>{info.label}</label>
          </div>
        ))}
        {Object.values(fetchErrors).map((info, index) => (
          <strong key={index}><AiFillAlert /> {info}</strong>
        ))}
        <div className='type c f'>
          <button type="submit">Sign in</button>
          <dfn onClick={() => handleSign('register')} data-info="Don't have account? Click here">Sign Up</dfn>
        </div>
      </form>
      <div style={{display: fetchingData ? 'flex' : 'none'}}>
        {View}
      </div>
    </div>
  )
}
