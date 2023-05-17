import React from 'react'
import lock from './lock.png'
import './error.css'

export const Error401 = () => {
  return (
    <div>
        <img src={lock} className='imageError' alt='lock'/>
        <h1 className='errorType'>401</h1>
        <p className='errorText'>Unathorized</p>

    </div>
  )
}
