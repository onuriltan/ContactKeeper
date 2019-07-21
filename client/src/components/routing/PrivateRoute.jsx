import React, { useContext , useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import Loading from "../layout/Loading";

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
