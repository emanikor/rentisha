import React from 'react'
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
     
        <div className='footer-2'>
            <h3>Log in or Sign Up</h3>
            <ul>
                <li>How it Works</li>
                <li>Links</li>
                <ul className='footer-brans'>
       <i class="fa-brands fa-facebook-f"></i>
       <i class="fa-brands fa-instagram"></i>
       <i class="fa-brands fa-twitter"></i>
       <i class="fa-brands fa-linkedin"></i>
       </ul>
            </ul>

        </div>
        <div className='footer-3'>
            <h3>Faq</h3>
            <ul>
                <li>Browse Item</li>
                <li>Picking up location</li>
                
            </ul>

        </div>
        <div className='footer-4'>
            <h3>Privacy and Policy</h3>
            <ul>
                <li>Terms and services</li>
                
            </ul>

        </div>
        

       
        </div>
     
      
    </footer>
  )
}

export default Footer