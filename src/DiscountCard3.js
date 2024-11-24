import React from 'react';
import './DiscountCard.css'; // CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const DiscountCard3 = () => {
  
  const handleButtonClick = () => {
    const url = encodeURIComponent(window.location.href); // Use the current URL
    const text = encodeURIComponent("Check out this amazing restaurant!");

    // Open Facebook share dialog
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
    window.open(facebookShareUrl, '_blank'); // Opens the share dialog in a new tab
  };

  return (
    <div className="discount-card">
      <div className="card-content">
        <div className="text-content">
          {/* Use the imported image */}
          <img src='/facebook(1).png' alt='Facebook Icon' className='icon' />

          <div className="text-details">
            <h3 className="title">Partagez sur Facebook</h3>
            <p className="description">Partagez un post sur Facebook</p>
          </div>
        </div>
        <div className="discount-section">
          <p className="discount">5%</p>
          <button className="button" onClick={handleButtonClick}>
            Gagner maintenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountCard3;
