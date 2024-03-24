import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div
      className='bg-dark p-3 text-center text-white'>
        <ul className='nav justify-content-end fs-4'>
            <li className='nav-item'>
                <NavLink className='nav-link text-white' to='/'>
                    Home
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link text-white' to='/signup'>
                    Sign Up
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link text-white' to='/signin'>
                    Sign In
                </NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link text-white' to='/about'>
                    About
                </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Header