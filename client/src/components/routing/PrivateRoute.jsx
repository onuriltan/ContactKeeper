import React, { useContext , useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext)
  const { loadUser, isAuthenticated } = authContext
  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])

  if(isAuthenticated === null){
    return <></>
  }

  console.log(isAuthenticated)

  return (

    <Route {...rest} render={props =>
      !isAuthenticated ? (
        <Redirect to='/login'/>
      ) : (
        <Component {...props} />
      )
    }
    />
  );
};

export default PrivateRoute;
