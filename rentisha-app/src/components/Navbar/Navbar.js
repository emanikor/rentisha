<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { MenuList } from './MenuList';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [user, setUser] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuList = MenuList.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink
          exact
          to={url}
          className="active"
          onClick={() => setClicked(false)}
        >
          {title}
        </NavLink>
      </li>
    );
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav className={showNav ? 'show-nav' : 'hide-nav'}>
      <div className='logo'>
        <span>Rentisha</span>
      </div>
      <div className='menu-icon' onClick={handleClick}>
        <i className={clicked ? 'fa-solid fa-x' : 'fa-solid fa-bars'}></i>
      </div>

    <div>
        {user ? (
          <div className='profile'>
            <span className='profileName'>{user.name}</span>
             <button className='btnHero'>Log Out</button>
          </div>
        ):(
          <button >Sign In</button>
        )}
      </div> 

      <ul className={clicked ? 'menu-list' : 'menu-list close'}>
        {menuList}
        {/* Sign In and Sign Up buttons (displayed only in responsive mode) */}
       
       
      </ul>
  
    </nav>
  );
};

export default Navbar;
=======
import React, { useState, useEffect } from 'react';
import { MenuList } from './MenuList';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [user, setUser] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuList = MenuList.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink
          exact
          to={url}
          className="active"
          onClick={() => setClicked(false)}
        >
          {title}
        </NavLink>
      </li>
    );
  });

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <nav className={showNav ? 'show-nav' : 'hide-nav'}>
      <div className='logo'>
        <span>Rentisha</span>
      </div>
      <div className='menu-icon' onClick={handleClick}>
        <i className={clicked ? 'fa-solid fa-x' : 'fa-solid fa-bars'}></i>
      </div>

      <div>
        {user ? (
          <div className='profile'>
            <img className='avatarImage' alt='avatarImage' />
            <span className='profileName'>{user.name}</span>
             <button className='btnHero'>Log Out</button>
          </div>
        ):(
          <button >Sign In</button>
        )}
      </div>
      
      <ul className={clicked ? 'menu-list' : 'menu-list close'}>
        {menuList}
        {/* Sign In and Sign Up buttons (displayed only in responsive mode) */}
       
       
      </ul>
  
    </nav>
  );
};

export default Navbar;
>>>>>>> 3a5b8d91b80356179c8d14348b891af890713271
