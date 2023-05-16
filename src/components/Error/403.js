import React from 'react'
import lock from './lock.png'
import './error.css'
export const Error403 = () => {
  return (
    <div className='root'>
        <img src={lock} alt='lock' className='imageError'/>
        <h1 className='errorType'>403</h1>
        <p className='errorText'>Unathorized</p>

    </div>
  )
}
