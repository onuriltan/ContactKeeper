import React, { Fragment, useContext} from 'react'
import * as PropTypes from 'prop-types'
import {NavLink} from "react-router-dom";
import AuthContext from '../../context/auth/authContext'



const NavBar = ({ title, icon }) => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated, logout, user } = authContext

  const authLinks = (
    <Fragment>
      <li>
        Hello { user && user.name }
      </li>
      <li>
        <a href="#!">
          <i className="fas fa-sign-out-alt"/>{' '}<span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <li>
        <NavLink to='/register'>Register</NavLink>
      </li>
      <li>
        <NavLink to='/login'>Login</NavLink>
      </li>
    </Fragment>
  )

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  )
}

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

NavBar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
}

export default NavBar
