import React from 'react'
import * as PropTypes from 'prop-types'
import {NavLink} from "react-router-dom";

const NavBar = ({ title, icon }) => {

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/About'>About</NavLink>
        </li>
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