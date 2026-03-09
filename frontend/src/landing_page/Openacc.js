import React from 'react'
import { Link } from 'react-router-dom'

function Openacc() {
  return (
    <div>
      <div className='row text-center '>
        <h1 className='mt-5 mb-3'>Invest in everything</h1>
        <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
          <Link to="/signup" className='p-3 btn btn-primary w-50 m-auto fs-5 max:sm-h-1'  >Sign up for free</Link>
      </div>
    </div>
  )
}

export default Openacc