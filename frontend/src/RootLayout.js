import React from 'react';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import {Outlet} from 'react-router-dom'

export default function RootLayout() {
  return (
    <div>
      <Header/>
        <div style={{minHeight:"80vh"}}>
        {/* place holder */}
        <Outlet/>
        </div>
      <Footer/>
    </div>
  )
}
