import React from 'react'
import { Link } from 'react-router-dom'
function Hero() {
  return (
    <div className='row text-center max-sm:flex '>
      <div className="max-sm:mb-20"></div>
        <img src="/media/homeHero.png" alt="HeroImage" className='mt-1000 max-sm:w-full' />
        <h1 className='mt-5'>Invest in everything</h1>
        <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
        <Link to="/signup" className='p-3 btn btn-primary w-50 m-auto fs-5 max:sm-h-1'  >Sign up for free</Link>
      </div>
  )
}

export default Hero