import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,Link,  } from 'react-router-dom';
import axios from 'axios';
import './Product.css';
import category1 from '../images/category1.png';
import category2 from '../images/category2.png';
import category3 from '../images/category3.png';

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
const Categories =({categories})=>{
    return (
        <div className="category-list">
          {categories.map(category => (
            <Link key={category._id} to={`/category/${category._id}`}>
              <div>{category.name}</div>
            </Link>
          ))}
        </div>
      );
    };


const Product = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        axios.get('/api/categories')
        .then(response => {
          setCategories(response.data);
          setLoading(false); 
        })
        .catch(error=>{
            console.error(error);
            setLoading(false)
        })
        
    }, []);
  
    return (
        <Router>
      <div className='product'>
        <h1 className='paddings headProduct flexCenter'>Explore Category</h1>
        <div className='paddings card-Product'>
          {ProductDetail.map((productDetail) => (
            <div key={productDetail.id} className='card-Product-container'>
              <img src={productDetail.Img} alt={productDetail.Title} />
              <div className='flexColStart product-card-body'>
                <h3 className='secondaryText'>{productDetail.Title}</h3>
                <h3 className='secondaryText'>{productDetail.Cat}</h3>
                <div className='flexCenter cart'>
                  <h3 className='secondaryText'>price: {productDetail.Price}</h3>
                  <i className="fa-solid fa-cart-shopping"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <Categories categories={categories} />
        )}
      </div>
      </Router>
    );
  };
  
  export default Product;