import React from 'react';
import { useLocation } from 'react-router-dom';
import './Preloader.css';

const Preloader = () => {
  const location = useLocation();

  return (
    <div
      className={
        location.pathname === '/movies' || location.pathname === '/saved-movies'
          ? 'preloader preloader_movies'
          : 'preloader'
      }
    >
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
