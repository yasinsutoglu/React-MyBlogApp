import React from 'react'
import { Navigate , Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouter = () => {
  const { currentUser } = useSelector((state) => state?.auth);
  
  return (    
    <div>
      {currentUser ? <Outlet/> : <Navigate to="/login"/>}
    </div>
  )
}

export default PrivateRouter