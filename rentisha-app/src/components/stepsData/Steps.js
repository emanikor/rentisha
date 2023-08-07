import React from 'react';
import './Steps.css';
import '../component.css';

const data = [
  {
    id: 1,
    span: 1,
    title: 'Find an item nearby',
    descriptive: `Search for the items you’re looking for and filter by location.`,
  },
  {
    id: 2,
    span: 2,
    title: 'Request and verify',
    descriptive: `Send a request to the owner for the dates you’d like the items. Your booking is only confirmed when the owner accepts your request.`,
  },
  {
    id: 3,
    span: 3,
    title: `Arrange A pickup at Designated place Near you`,
    descriptive: `Use chat to arrange convenient times to pick up the item and ask any questions you might have.`,
  },
];

const Steps = () => {
  return (
    <div className="steps">
      <div className='flexCenter paddings Services-title'>
        
        <h3 className='headProduct'>#Three Steps to follow and Walaa!</h3>
      </div>
    <div className='steps-container flexCenter'>
      {data.map((step) => (
        <div key={data.id} className=' stepsBody'>
          <span className='SpanId'>{step.span}</span>
          <h3 className='headTitle'>{step.title}</h3>
          <p className='flexColStart hero-text'>{step.descriptive}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Steps;
