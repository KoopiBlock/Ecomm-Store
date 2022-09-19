import React from 'react'
import {FaTwitter, FaInstagram, FaDiscord  } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>
        2022 Koopi-Store Developed by Koopi. &copy; all rights reseved.
      </p>
      <p className='icons'>
        <FaTwitter />
        <FaInstagram />
        <FaDiscord />
      </p>
      
    </div>
  )
}

export default Footer