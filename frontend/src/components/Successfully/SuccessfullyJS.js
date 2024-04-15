import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import { useSelector, useDispatch } from 'react-redux'
import { useLottie } from "lottie-react";
import loading from './loading.json'
export default function SuccessfullyJS() {
    const { API } = useContext(AppContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userData)
  
    const [fetchErrors, setFetchErrors] = useState({})
    const [fetchingData, setFetchingData] = useState(false)
    const handleRequests = async () => {
      if (fetchingData || Object.values(userData).length === 0) {
        return
      }
      try {
        setFetchingData(true)
        const response = await fetch(`${API}/api/requests`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.token}`
          },
        })
        const data = await response.json()
        if (response.ok) {
          navigate('/requests')
          dispatch({
            type: 'setRequests',
            payload: data
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
    fetchErrors,
    fetchingData,
    handleRequests,
    View
  }
}
