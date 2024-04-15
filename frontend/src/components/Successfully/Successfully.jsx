import React from 'react'
import qr_code from '../../assets/qr-code.png'
import './Successfully.css'
import { AiFillAlert } from "react-icons/ai";
import SuccessfullyJS from './SuccessfullyJS';
export default function Successfully() {
  const {
    fetchErrors,
    fetchingData,
    handleRequests,
    View
  } = SuccessfullyJS()
  return (
    <div className='Successfully c f'>
      <h3>successfully Registered</h3>
      <p>Click here to manage orders.</p>
      <button onClick={handleRequests}>Orders</button>
      <div className='img c f'>
        <img style={{display: !fetchingData ? 'flex' : 'none'}} src={qr_code} alt="" />
        <div style={{display: !fetchingData ? 'none' : 'flex'}}>
          {View}
        </div>
      </div>
      {Object.values(fetchErrors).map((info, index) => (
        <strong key={index}><AiFillAlert /> {info}</strong>
      ))}
    </div>
  )
}
