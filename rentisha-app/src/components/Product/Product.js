import React from 'react'
import './Product.css';
import  category1 from '../images/category1.png';
import  category2 from '../images/category2.png';
import  category3 from '../images/category3.png';

const ProductDetail = [

    {
        id:1,
        Title:"Hp laptop",
        Cat: 'Tablet',
        Price: '723',
        Img:  category3 
    },
    {
        id:2,
        Title:"Hp laptop",
        Cat: 'Smart Watch',
        Price: '168',
        Img:  category2 
    },
    {
        id:3,
        Title:"Hp laptop",
        Cat: 'Headphone',
        Price: '49',
        Img:  category1
    },
    {
        id:4,
        Title:"Hp laptop",
        Cat: 'Camera',
        Price: '1049',
        Img:  category3 
    },
    {
        id:5,
        Title:"Hp laptop.",
        Cat: 'Powerbank',
        Price: '49',
        Img:  category2
    },
    {
        id:6,
        Title:"Hp laptop",
        Cat: 'Electronics',
        Price: '156',
        Img:  category1 ,
    },
    {
        id:7,
        Title:"Hp laptop",
        Cat: 'Gaming',
        Price: '2098',
        Img:  category3 ,
    },
    {
        id:8,
        Title:"Hp laptop",
        Cat: 'Electronics',
        Price: '386',
        Img:  category2 ,
    },
    {
        id:9,
        Title:"Hp laptop",
        Cat: 'Tablet',
        Price: '693',
        Img:  category1 ,
    },
    {
        id:10,
        Title:"Hp laptop",
        Cat: 'Gaming',
        Price: '5036',
        Img:  category3 ,
    },
    {
        id:11,
        Title:"Hp laptop",
        Cat: 'Electronics',
        Price: '198',
        Img:  category2 ,
    },
    {
        id:12,
        Title:"Hp laptop",
        Cat: 'Electronics',
        Price: '793',
        Img:  category1 ,
    },
]



const Product = () => {

  return (
    <div className='product '>
        <h1 className=' paddings  headProduct flexCenter'>Explore Category</h1>
      <div className='paddings card-Product'>
        
    {ProductDetail.map((ProductDetail) => (
      <div key={ProductDetail.id} className=' card-Product-container  '>
         <img src={ProductDetail.Img} alt={ProductDetail.Title} />
         <div className='flexColStart product-card-body'>
         <h3 className='secondaryText'>{ProductDetail.Title}</h3>
        <h3 className='secondaryText'>{ProductDetail.Cat}</h3>
        <div className=' flexCenter  cart '>
        <h3 className='secondaryText '>price:  {ProductDetail.Price}</h3>
        <i class="fa-solid fa-cart-shopping"></i>
        </div>
      
        
      </div>
      </div>
    ))}
  </div>
  </div>
  )
}

export default Product