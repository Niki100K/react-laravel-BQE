import { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLottie } from "lottie-react";
import { FaUnlock, FaLock } from "react-icons/fa";
import 'react-phone-input-2/lib/style.css'
import loader from './bar-loader.json'

import { AppContext } from '../../AppContext';
export default function RegisterJS() {
  const dispatch = useDispatch()
  const { API } = useContext(AppContext)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    tel: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const form = [
    {
      field: 'firstname',
      value: formData.firstname,
      maxSymbols: 15,
      minSymbols: 3,
      label: 'enter first name'
    },
    {
      field: 'lastname',
      value: formData.lastname,
      maxSymbols: 15,
      minSymbols: 3,
      label: 'enter last name'
    },
    {
      field: 'tel',
      value: formData.tel,
      maxSymbols: 9,
      minSymbols: 9,
      label: 'enter phone number'
    },
    {
      field: 'email',
      value: formData.email,
      maxSymbols: 30,
      minSymbols: 6,
      label: 'enter email'
    },
    {
      field: 'password',
      value: formData.password,
      maxSymbols: 50,
      minSymbols: 6,
      label: 'enter password',
      icon: FaUnlock,
    },
    {
      field: 'password_confirmation',
      value: formData.password_confirmation,
      maxSymbols: 50,
      minSymbols: 6,
      label: 'confirm password',
      icon: FaLock,
    },
  ]
  const handleForm = (field, e) => {

      let value = field === 'tel' ? e : e.target.value
      if (field === 'firstname' || field === 'lastname') {
        value = value.replace(/[^a-zA-Z]/g, '')
      }
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))

  }

  const [fetchErrors, setFetchErrors] = useState({})
  const [fetchingData, setFetchingData] = useState(false)
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleValidator = () => {
    const passwordsMatch = formData.password === formData.password_confirmation

    return passwordsMatch
  }

  const options = {
    animationData: loader,
    loop: true,
  };
  const { View } = useLottie(options);

  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [showTermsError, setShowTermsError] = useState(false)

  const [successfullySign, setSuccessfullySign] = useState(false)
  const handleRegister = async (e) => {
    e.preventDefault()
    if (fetchingData || !handleValidator() || !termsAgreed) {
      if (!handleValidator()) {
        setPasswordsMatch(false)
      }
      if (!termsAgreed) {
        setShowTermsError(true)
      }
      return
    }
    try {
        setFetchingData(true)
        setShowTermsError(false)
        setPasswordsMatch(true)
        const response = await fetch(`${API}/api/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            first_name: formData.firstname,
            last_name: formData.lastname,
            tel: formData.tel,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.password_confirmation
          })
        })
        const data = await response.json()
        if (response.status === 200) {
          dispatch({
            type: 'setUserData',
            payload: data
          })
          setSuccessfullySign(true)
        } else {
          setFetchErrors(data)
        }
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingData(false)
    }
  }

  return {
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
    successfullySign
  }
}
