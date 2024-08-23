import React, { useEffect } from 'react'
import { logout } from '../../Service/userService';

const Logout = () => {
    useEffect(() => {
    logout();
      window.location="/";
    }, [])
    
  return 
     return null;
  
}

export default Logout
