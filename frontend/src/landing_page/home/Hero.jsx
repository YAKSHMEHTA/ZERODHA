import React from 'react'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='row text-center'>
        <img src="/media/homeHero.png" alt="HeroImage" className='mb-5' />
        <h1 className='mt-5'>Invest in everything</h1>
        <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
        <Link to="/signup" className='p-3 btn btn-primary fs-5' style={{width:"30%",margin:"0 auto",}} >Sign up for free</Link>
      </div>
  )
}

export default Hero