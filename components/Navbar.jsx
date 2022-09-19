import React from 'react'
import Link from 'next/link'
import { FaShoppingBag } from 'react-icons/fa'
import { Cart } from './'
import {useStateContext} from '../context/StateContext'

const Navbar = () => {

  const { setShowCart, showCart, totalQuantities } = useStateContext();

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">Koppi Store</Link>
      </p>

      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <FaShoppingBag />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

     { showCart && <Cart />}
    </div>
  )
}

export default Navbar