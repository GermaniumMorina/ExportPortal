import React from 'react'
import error500 from './500.png'

export const Error500 = () => {
  return (
    <div>
        <img src={error500} className='imageError' alt='error'/>
        <h1 className='errorType'>500</h1>
        <p className='errorText'>Internal Server Error</p>

    </div>
  )
}
