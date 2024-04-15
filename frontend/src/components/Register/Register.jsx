import React from 'react'
import './Register.css'
import 'react-phone-input-2/lib/style.css'

import { Link } from 'react-router-dom'
import { AiFillAlert } from "react-icons/ai";

import PhoneInput from 'react-phone-input-2'
import RegisterJS from './RegisterJS';

import Successfully from '../Successfully/Successfully';
export default function Register({ handleSign }) {
  const {
    form,
    handleForm,
    fetchErrors,
    setTermsAgreed,
    View,
    passwordsMatch,
    showTermsError,
    handleRegister,
    fetchingData,
    termsAgreed,
    successfullySign,
  } = RegisterJS()
  return (
    <div className='Register c f'>
      {!successfullySign ? (
        <React.Fragment>
          <h2>Sign Up</h2>
          <form style={{display: !fetchingData ? 'flex' : 'none'}} onSubmit={(e) => handleRegister(e)} className='c f'>
            {form.map((info, index) => (
              <div className='input c' key={index}>
                {info.field !== 'tel' ? (
                  <React.Fragment>
                    <input
                      id={info.field}
                      value={info.value}
                      onChange={(e) => handleForm(info.field, e)}
                      required
                      maxLength={info.maxSymbols}
                      minLength={info.minSymbols}
                      placeholder=''
                      autoComplete='false'
                      type={
                        info.field === 'password_confirmation' ? 'password' : info.field
                      }
                    />
                    <label htmlFor={info.field}>{info.label}</label>
                  </React.Fragment>
                ) : (
                  <PhoneInput
                    // Classes from Npm
                    containerClass={'containerClass'}
                    inputClass={'inputClass'}
                    buttonClass={'buttonClass'}
                    dropdownClass={'dropdownClass'}
                    searchClass={'searchClass'}
                    country={'bg'}

                    placeholder=""
                    required
                    value={info.value}
                    onChange={((e) => handleForm(info.field, e))}
                  />
                )}
                {info.icon && <info.icon id='icon'/>}
                {(info.field === 'password' || info.field === 'password_confirmation') &&
                  !passwordsMatch && <p>Passwords do not match!</p>
                }
              </div>
            ))}
            {Object.values(fetchErrors).map((info, index) => (
              <strong key={index}><AiFillAlert /> {info}</strong>
            ))}
            <div className='terms c'>
              <input
                type="checkbox"
                id="terms"
                title=""
                placeholder=""
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
              />
              <label htmlFor="terms"></label>
              <Link to={'/terms'}>Terms and Conditions</Link>
            </div>
            <div className='type c spa'>
              <button type="submit">Register</button>
              <dfn onClick={() => handleSign('login')} data-info="Already have account? Click here">Sign In</dfn>
            </div>
            {showTermsError && <strong>To continue you must agree to the Terms and Conditions</strong>}
          </form>
          <div style={{display: fetchingData ? 'flex' : 'none'}}>
            {View}
          </div>
        </React.Fragment>
      ) : (
        <Successfully />
      )}
    </div>
  )
}
