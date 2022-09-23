import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {

  return (
    <div className='navbar'>
        <div>
            <h1>Reader's Catalog</h1>
        </div>
        <div>
          <Link to="/" className="link">Home</Link>
        </div>
        <div>
          <Link to="/favourites" className="link">Favourites</Link>
        </div>
    </div>
  )
};

export default Navbar;