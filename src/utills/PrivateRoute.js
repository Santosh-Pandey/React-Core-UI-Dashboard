import React from 'react'
import { Route } from 'react-router-dom'


const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.

  // const isLoggedIn = localStorage.getItem('userData');
  const validtoken  = localStorage.getItem('access_token');
  alert(validtoken);
  return (
    <Route
      {...rest}
      render={props =>
        validtoken ? ( <Component {...props} />) : window.location.replace("/")
      }
    />
  )
}

export default PrivateRoute
