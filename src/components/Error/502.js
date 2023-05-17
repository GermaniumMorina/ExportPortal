import React from 'react'
import error500 from './500.png'

export const Error502 = () => {
  return (
    <div>
        <img src={error500} className='imageError' alt='error'/>
        <h1 className='errorType'>502</h1>
        <p className='errorText'>Service Temporarily Overloaded</p>

    </div>
  )
}
