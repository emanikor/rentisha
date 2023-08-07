import React, { useState } from 'react';
import './Hero.css';
import '../component.css';
import homeimage from '../images/homeimage.png';

const Hero = () => {
  const [search, setSearch] = useState('');

  // handle search form input
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('form searched', search);

    // authetication
  };

  return (
    <section className='hero-wrapper'>
      <form className='flexCenter search-input' onSubmit={handleSearch}>
        <input
          className='search'
          type='text'
          id='text'
          placeholder='search here...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
      </form>
      <div className='paddings innerWidth hero-container'>
        {/* left-hero */}
        <div className='flexColStart left-hero'>
          <h1 className='flexColStart hero-title'>
            Rent anything<br></br> from people<br></br> near your area{" "}
            <span>Fast</span>{" "}
          </h1>
          <span className='flexColStart hero-text'>
            Borrow anything fun from people nearby for jobs at home, fun and
            experience or work
          </span>
          <div className='heros-btn'>
            <button className='btnHero'>Rent Now</button>
            <button className='btnHero2'>List of Items</button>
          </div>
        </div>

        <div className='flexCenter right-hero1'>
          <div className='flexCenter image-container'>
            <img
              src={homeimage}
              alt='car'
              className='hero-car-section'
            />
          </div>
        </div>
      </div>
      <div className='break flexCenter innerWith'></div>
    </section>
  );
}

export default Hero;
