import React from 'react'
import Hero from './Hero'
import Awards from './Awards'
import Stats from './Stats'
import Pricing from './Pricing'
import Education from './Education'
import Openacc from '../Openacc'
import Navbar from '../Navbar'
import Footer from '../Footer'

function HomePage() {
  return (
    <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <Awards></Awards>
      <Stats></Stats>
      <Pricing></Pricing>
      <Education></Education>
      <Openacc></Openacc>
      <Footer></Footer>
    </div>
  )
}

export default HomePage
