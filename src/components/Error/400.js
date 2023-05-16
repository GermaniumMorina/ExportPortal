import React from 'react'
import robot from './robot.png'
import './error.css'
export const Error400 = () => {
  return (
    <div>
        <img src={robot} className='imageError' alt='robot'/>
        <h1 className='errorType'>400</h1>
        <p className='errorText'>Bad Request</p>

    </div>
  )
}
