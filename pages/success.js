import React, {useEffect} from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'

import { useStateContext } from '../context/StateContext'
import { runShow } from '../lib/utils'

const success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()

    useEffect(() => {
        localStorage.clear()

        setCartItems([])
        setTotalPrice(0)
        setTotalQuantities(0)
        runShow()

    }, [])
    

  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>Tank You!</h2>
            <p className='email-msg'>check your email biatch!</p>
            <p className='description'>if you have any question you can go fuck your self, and email here:
            <a className='email' href='mailto:emai@email.com'>
            emai@email.com
            </a>
            </p>
            <Link href='/'>
                <button
                className='btn'
                type='button'
                width='300px'
                >
                    Continue Shopping
                </button>
            </Link>

        </div>

    </div>
  )
}

export default success