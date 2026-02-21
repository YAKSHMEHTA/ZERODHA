import React from 'react'
import { Link } from 'react-router-dom'

function Openacc() {
  return (
    <div>
      <div className='row text-center '>
        <h1 className='mt-5 mb-3'>Invest in everything</h1>
        <p>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
          <Link to="/signup" className='p-3 btn btn-primary fs-5' style={{width:"30%",margin:"0 auto",}} >Sign up for free</Link>
      </div>
    </div>
  )
}

export default Openacc