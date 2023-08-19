// src/components/Period.js
import React from 'react';
import '../component.css';
import homeimage from '../images/homeimage.png';
import './period.css';

const periodData = [
  {
    id: 1,
    title: `Enjoy your rental and return on time`,
    Description: `Make the most of your time with the item and then return it safely to the owner at the end of the rental.`,
  },
  {
    id: 2,
    title: `Need more time?`,
    Description: `Be sure to check in with the lender and book extra days if the item is available and you want to keep it for longer. Browse items.`,
  },
];



const Period = () => {
  return (
    <div className='period paddings'>
      <h1 className='Headtitle paddings headProduct'>During Renting Period</h1>
      <div className='flexRow '>
        <ul className='list-container'>
          {periodData.map((data) => (
            <li key={data.id} className='list-item'>
              <h3 className='PeriodHeader '>{data.title}</h3>
              <p className='periodDesc'>{data.Description}</p>
              
            </li>
            
          ))}
          <button className=' btnHero periodButton '>See More</button>
        </ul>
        <img src={homeimage} alt='periodImage' className='periodImage' />
        
      </div>
     
    </div>
  );
};

export default Period;
