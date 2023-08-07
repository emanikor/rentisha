import React from 'react'
import Hero  from '../Hero/hero';
import AboutRent from '../AboutRent';
import Steps from '../stepsData/Steps';
import Period from '../periods/Period';
import Features from '../Features/Features';
import Testimonials from '../Testimonials/Testimonials';
import Footer from '../Footer/Footer';

const Home=()=> {
  return (
    <>
      <Hero/>
      <AboutRent/>
      <Steps/>
      <Period/>
      <Features/>
      <Testimonials/>
      <Footer/>
    </>
  )
}

export default Home