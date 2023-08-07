import React from 'react';
import '../component.css';
import './Testimonials.css';
import  Testimonial from '../images/Testimonial.png';


const TestimonialData = [
  {
    id: 1,

    description:`Couldn’t have picked a better person to rent from!
     Nick was so kind, flexible and a pleasure to deal with.`,
     name: `shay`,
     location:"Nairobi,kenya",
    image: Testimonial,
  },
  {
    id: 2,
   
    description:`Couldn’t have picked a better person to rent from!
     Nick was so kind, flexible and a pleasure to deal with.`,
     name: `shay`,
     location:"Nairobi,kenya",
    image: Testimonial,
  },
  {
    id: 3,
    
    description:`Couldn’t have picked a better person to rent from!
     Nick was so kind, flexible and a pleasure to deal with.`,
     name: `shay`,
     location:"Nairobi,kenya",
    image: Testimonial,
  },
  {
    id: 4,
  
    description:`Couldn’t have picked a better person to rent from!
     Nick was so kind, flexible and a pleasure to deal with.`,
     name: `shay`,
     location:"Nairobi,kenya",
    image: Testimonial,
  },
  
];

const Testimonials =() => {
  return (
    <div className="Testimonial">
    <div className='flexCenter  category-title'>
      

    </div>
    <div className='Testimonial-container'>
    <h3 className='flexCenter headProduct'>Customer Reviews</h3>
  <div className='paddings Testimonial-grid'>
    {TestimonialData.map((TestimonialData) => (
      <div key={TestimonialData.id} className='Testimonial-card'>
         <img src={TestimonialData.image} alt={TestimonialData.title} />
         <div className='paddings Testimonial-body'>
        <p className="Testimonial-description">{TestimonialData.description}</p>
        <h3 className='headTitle'>{TestimonialData.name}</h3>
        <h4 className='headlocation'>{TestimonialData.location}</h4>
      </div>
      </div>
    ))}
  </div>
  </div>
  </div>
  ) 
  }

export default Testimonials