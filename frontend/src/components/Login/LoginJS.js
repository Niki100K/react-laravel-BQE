import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useLottie } from "lottie-react";
import loading from './loading.json'

import { AppContext } from '../../AppContext'
export default function LoginJS() {
  const { API } = useContext(AppContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [fetchingData, setFetchingData] = useState(false)
  const [fetchErrors, setFetchErrors] = useState({})
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const form = [
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
      label: 'enter password'
    },
  ]
  const handleForm = (field, e) => {
    let value = e.target.value
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }


  const handleLogin = async (e) => {
    e.preventDefault()
    if (fetchingData) {
      return
    }
    try {
      setFetchingData(true)
      const response = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      })
      const data = await response.json()
      if (response.ok) {
        console.log(data);
        navigate('/requests');
        dispatch({
          type: 'setRequests',
          payload: data.requests
        })
        dispatch({
          type: 'setUserData',
          payload: { userId: data.userId, token: data.token }
        })
      } else {
        setFetchErrors(data)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingData(false)
    }
  }
  const options = {
    animationData: loading,
    loop: true,
  };
  const { View } = useLottie(options);
  return {
    form,
    handleForm,
    handleLogin,
    fetchingData,
    View,
    fetchErrors
  }
}
