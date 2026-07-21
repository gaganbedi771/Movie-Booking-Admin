import React from 'react'
import { AuthContext } from '../store/AuthContext'

const Header = () => {
  const { isAuthenticated,userEmail,logoutHandler } = React.useContext(AuthContext)

  return (
    <div className='d-flex justify-content-between align-items-center p-3 bg-dark text-white position-relative'>
        <h2>Book My Seat - Admin</h2>
        {isAuthenticated && (
          <div>
            <p className='position-absolute top-50 start-50 translate-middle m-0 '>Welcome, {userEmail}!</p>
            <button className='btn btn-danger' onClick={() => logoutHandler()}>Logout</button>
          </div>
        )}
    </div>
  )  
}

export default Header