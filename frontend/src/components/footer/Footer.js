import './Footer.css'
import React from 'react'

export default function Footer() {
  return (
    <div className='bg-dark text-light d-flex justify-content-around p-5'>
      <address>
        <p className="lead">PVP-SIT</p>
        <p className="lead">Vijaywada</p>
      </address>
      <div>
        <p className='lead'>pvpsit@gmail.com</p>
        <p className='lead'>999999999999</p>
      </div>
    </div>
  )
}
