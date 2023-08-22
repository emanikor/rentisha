import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Authentication/AuthContext';
import '../component.css';

const ItemsFrontPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="items-front-page">
      <h2>Welcome to Our Items Page</h2>
      <p>This is an overview of how things work with the items.</p>
      {isAuthenticated ? (
        <Link to="/list" className="btnHero1">
          View Items
        </Link>
      ) : (
        <Link to="/sign" className="btnHero1">
          Sign In to View Items
        </Link>
      )}
    </div>
  );
};

export default ItemsFrontPage;
