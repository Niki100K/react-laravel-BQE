import React from 'react'
import './RequestsPage.css'

import CopyToClipboard from 'react-copy-to-clipboard';

import { TiArrowSortedUp } from "react-icons/ti";
import { FaCircle } from "react-icons/fa6";
import { FcSearch } from "react-icons/fc";
import { GrUpdate } from "react-icons/gr";

import RequestsPageJS from './RequestsPageJS';
export default function RequestsPage() {
  const {
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
    handleUpdateStatus 
  } = RequestsPageJS()

  return (
    <div className='RequestsPage c f'>
      <div className='container c f'>
        <div className='header c spa'>
          <div className='search c'>
            <h3>Requests:</h3>
            <div className='input c'>
              <input 
                id='search'
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='' 
                />
              <label htmlFor="search"><FcSearch id='icon'/> Seach Item</label>
            </div>
          </div>
          <p className='c'>{requestsData.length}</p>
        </div>
        <div className='columns c spa'>
          {form.map((info, index) => (
            <Columns info={info} handleForm={handleForm} filterData={filterData} key={index}/>
          ))}
        </div>
        {filteredRequestsData.map((info, index) => (
          <UserData
            info={info}
            requestsData={requestsData}
            handleUpdateComments={handleUpdateComments}
            handleUpdateStatus={handleUpdateStatus}
            key={index}
          />
        ))}
        {filteredRequestsData.map((info, index) => (
          <MobileView 
            info={info} 
            requestsData={requestsData} 
            handleUpdateStatus={handleUpdateStatus} 
            handleUpdateComments={handleUpdateComments} 
            key={index}
          />
        ))}
        <div className='btn c'>
          <button onClick={handleUpdate}>{`${fetchingData ? 'Updating' : 'Update'}`}</button>
        </div>
      </div>
    </div>
  )
}


function Columns({info, handleForm, filterData}) {
  return (
    <strong onClick={() => handleForm(info?.field)}>
    {info.text} 
    {info.field && 
      <TiArrowSortedUp 
        className={`icon ${filterData[info.field] === 'top' ? 'rotateTop' : filterData[info.field] === 'bottom' && 'rotateBottom'}`} 
          />
        }
    </strong>
  )
}

function UserData({info, requestsData, handleUpdateComments, handleUpdateStatus}) {
  return (
    <div className='data c spa'>
    <div className='info c'>
      <p>{info.id}</p>
    </div>
    <div className='info c start'>
      <p>{info.tel}</p>
    </div>
    <div className='info c start'>
      <CopyToClipboard text={info.email}>
        <strong>{info.email}</strong>
      </CopyToClipboard>
    </div>
    <div className={`info ${requestsData.find(obj => obj.email === info.email).status !== info.status && 'border'} c spa`}>
      <div className='c' style={{width: 'unset'}}>
        <p>{info.status}</p>
        <FaCircle style={{color: info.status === 'pending' ? '#ffa500' : 'var(--white5)'}}/>
      </div>
      <GrUpdate onClick={() => handleUpdateStatus(info.id)} className='updateIcon'/>
    </div>
    <div className={`info ${requestsData.find(obj => obj.email === info.email).comments !== info.comments && 'border'} c`}>
      <input
        type="text"
        value={info.comments}
        onChange={(e) => handleUpdateComments(info.email, e)}
        placeholder='Comments'
      />
    </div>
    <div className='info c'>
      <p>{info.created_at}</p>
    </div>
  </div>
  )
}

function MobileView({ info, requestsData, handleUpdateStatus, handleUpdateComments }) {

  return (
    <div className='users c f'>
      <div className='c start wrap'>
        <span>ID:</span>
        <p>{info.id}</p>
      </div>
      <div className='c start wrap'>
        <span>Telephone:</span>
        <p>{info.tel}</p>
      </div>
      <div className='c start wrap'>
        <span>Email:</span>
        <p>{info.email}</p>
      </div>
      <div className='c spa'>
        <div className='c' style={{width: 'unset'}}>
          <span className={`${requestsData.find(obj => obj.email === info.email).status !== info.status && 'color'}`}>Status:</span>
          <p>{info.status} <FaCircle style={{color: info.status === 'pending' ? '#ffa500' : 'var(--white5)'}}/></p>
        </div>
        <GrUpdate onClick={() => handleUpdateStatus(info.id)} className='updateIcon'/>
      </div>
      <div className='c'>
        <textarea 
          className={`${requestsData.find(obj => obj.email === info.email).comments !== info.comments && 'color'}`}  
          cols="30" 
          rows="10"
          type="text"
          value={info.comments}
          onChange={(e) => handleUpdateComments(info.email, e)}
          placeholder='Comments'
        ></textarea>
      </div>
    </div>
  )
}