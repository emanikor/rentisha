import React from 'react'
import '../component.css'
import  category3 from '../images/category3.png';

function Rent() {
  return (
    <div className='flexColStart ReviewInput'>
        
        <form>
    
        <div className=' paddings flexCenter ReviewItem '>
            <img src={category3} alt='reviewImage'/>
            <div className='flexColStart paddings  Reviewchecks'>
                <li>laptop: Model Xhet34</li>
                <li>Color: silver </li>
                <li>size: 16 inch </li>
                <div className='Paddings flexColStart'>  
                 
            <input  type='name' name='firstName'></input>
            <butto></butto>
            
            <input type='name' name='firstName'></input>
            <lable> Quantity.</lable>
            <input type='number' id='number'></input>
            </div>
          
            </div>
            
        </div>
     
        <button>Submit</button>
        </form>
      

    </div>
  )
}

export default Rent