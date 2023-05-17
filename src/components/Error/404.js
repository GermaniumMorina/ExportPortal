import React from 'react'
import notfound from './notfound.png'
import './error.css'

export const Error404 = () => {
  return (
    <div>
        <img src={notfound} className='imageError' alt='error'/>
        <h1 className='errorType'>404</h1>
        <p className='errorText'>Page Not Found</p>

    </div>
  )
}
