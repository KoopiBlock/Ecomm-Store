import React, { useRef } from 'react'
import Link from 'next/link'

import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe'

import { FaAngleLeft } from 'react-icons/fa'
import { FaShoppingBag } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import toast from 'react-hot-toast'



const Cart = () => {

  const cartRef = useRef()
  const {totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove,} = useStateContext()

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button 
        className='cart-heading'
        type='button'
        onClick={() => setShowCart(false)}
        >
          <FaAngleLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
              <FaShoppingBag size={160} />
              <h3> Your Shopping Bag is Empty</h3>
              <Link href='/'>
                <button
                type='button'
                className='btn'
                onClick={() => setShowCart(false)}
                > Continue Shopping</button>
              </Link>
          </div>
        )}
        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} className='cart-product-image'/>
              <div className='item-desc'>
                <div className='flex-top'>
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                  <p className='quantity-desc'>
                        <span className='minus' onClick={() => toggleCartItemQuanitity(item._id, 'dec')}>
                            <FaMinus />                            
                        </span>  
                        <span className='num' onClick=''>
                            {item.quantity}                     
                        </span>
                        <span className='plus' onClick={() => toggleCartItemQuanitity(item._id, 'inc')}>
                            <FaPlus />                            
                        </span>  
                    </p>
                  </div>
                  <button
                  typeof='button'
                  className='remove-item'
                  onClick={() => onRemove(item)}
                  >
                    <TiDelete />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>SubTotal:</h3>
              <h4>${totalPrice}</h4>
            </div>
            <div className='btn-container'>
              <button
              type='button'
              className='btn'
              onClick={handleCheckout}
              >
                Pay with Stripe
              </button>

            </div>
          </div>
        )}



      </div>
    </div>
  )
}


export default Cart