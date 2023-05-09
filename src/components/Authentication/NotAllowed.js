import React from 'react'

import { Link } from 'react-router-dom'
const NotAllowed = () => {
  return (
    <div>
        <h1>You are not allowed to view this page</h1>
        <Link to='/SignIn'>Sign In</Link>
    </div>
  )
}

export default NotAllowed
