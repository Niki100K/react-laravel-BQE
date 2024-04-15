import { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../AppContext'
export default function RequestsPageJS() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { API } = useContext(AppContext)
  const requestsData = useSelector(state => state.requestsData)
  const userData = useSelector(state => state.userData)
  const [filteredRequestsData, setFilteredRequestsData] = useState([])
  const [search, setSearch] = useState('')
  const [fetchingData, setFetchingData] = useState(false)
  const [filterData, setFilterData] = useState({
    id: '',
    tel: '',
    email: '',
    status: '',
    comments: '',
  })
  useEffect(() => {
    const filtered = requestsData.filter(user => {
      return (
        (user.id && user.id.toString().includes(search)) ||
        user.tel.toLowerCase().includes(search.toLowerCase()) ||
        (user.comments && user.comments.includes(search)) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    if (filterData.id === 'top') {
      filtered.sort((a, b) => a.id - b.id);
    } else if (filterData.id === 'bottom') {
      filtered.sort((a, b) => b.id - a.id);
    }
    if (filterData.tel === 'top') {
      filtered.sort((a, b) => a.tel.localeCompare(b.tel));
    } else if (filterData.tel === 'bottom') {
      filtered.sort((a, b) => b.tel.localeCompare(a.tel));
    }
    if (filterData.email === 'top') {
      filtered.sort((a, b) => a.email.localeCompare(b.email));
    } else if (filterData.email === 'bottom') {
      filtered.sort((a, b) => b.email.localeCompare(a.email));
    }
    if (filterData.status === 'top') {
      filtered.sort((a, b) => a.status.localeCompare(b.status));
    } else if (filterData.status === 'bottom') {
      filtered.sort((a, b) => b.status.localeCompare(a.status));
    }
    setFilteredRequestsData(filtered);
  }, [requestsData, search, filterData.id, filterData.tel, filterData.email, filterData.status]);
  

  const form = [
    { field: 'id', text: 'id' },
    { field: 'tel', text: 'Telephone' },
    { field: 'email', text: 'Email' },
    { field: 'status', text: 'Status' },
    { text: 'Comments' },
    { field: 'created_at', text: 'Created at' },
  ];
  
  const handleForm = (field) => {
    if (!field) {
      return
    }

    setFilterData(prev => ({
      ...prev,
      [field]: prev[field] === '' ? 'top' : prev[field] === 'top' ? 'bottom' : prev[field] === 'bottom' && ''
    }));
  }


  const handleUpdateStatus = (id) => {
    setFilteredRequestsData(prev => {
      const update = prev.map((info) => {
        if (info.id === id) {
          return {...info, status: info.status === 'pending' ? 'active' : 'pending'};
        }
        return info;
      });
      return update;
    });
  };
  const handleUpdateComments = (email, e) => {
    let value = e.target.value
    const update = filteredRequestsData.map(info => {
      if (info.email === email) {
        return {...info, comments: value}
      }
      return info
    })
    setFilteredRequestsData(update)
  }

  const handleUpdate = async () => {
    if (fetchingData) {
      return
    }
    try {
      setFetchingData(true)
      const response = await fetch(`${API}/api/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.token}`
        },
        body: JSON.stringify({
          data: filteredRequestsData
        })
      })
      const data = await response.json()
      console.log(data);
      if (response.ok) {
        dispatch({
          type: 'setRequests',
          payload: data
        })
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetchingData(false)
    }
  }

  useEffect(() => {
    if (Object.values(userData).length === 0) {
      navigate('/')
    }
  }, [userData, navigate])
  
  return {
    requestsData,
    filteredRequestsData,
    search,
    setSearch,
    filterData,
    form,
    handleForm,
    handleUpdateComments,
    fetchingData,
    handleUpdate,
    handleUpdateStatus,
  }
}
