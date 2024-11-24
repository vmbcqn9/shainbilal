import React, { useState, useEffect } from 'react';
import './DiscountCard.css'; // CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const DiscountCard4 = ({ setTotalDiscount }) => {
  const [isButtonLocked, setIsButtonLocked] = useState(false);
  const [bothLocked, setBothLocked] = useState(false);  // Lock button and text
  const [storyLocked, setStoryLocked] = useState(false);  // Example additional lock condition
  const [commentLocked, setCommentLocked] = useState(false);  // Example additional lock condition

  // Handle button click logic
  const handleButtonClick = () => {
    const url = encodeURIComponent(window.location.href); // Use the current URL
    const text = encodeURIComponent("Check out this amazing offer!");

    // WhatsApp sharing URL
    const whatsappShareUrl = `https://wa.me/?text=${text}%20${url}`;

    // Open WhatsApp share dialog
    window.open(whatsappShareUrl, '_blank');

    // Lock the button for 30 seconds
    setIsButtonLocked(true);
    setTimeout(() => {
      setIsButtonLocked(false); // Unlock the button after 30 seconds
      setBothLocked(true); // Lock both button and text after 30 seconds
      setTotalDiscount(prevDiscount => prevDiscount + 5); // Increase the total discount by 5%
    }, 3000); // Lock for 3 seconds (adjust as needed)
  };

  // Update the button display based on multiple conditions
  return (
    <div className="discount-card">
      <div className="card-content">
        <div className="text-content">
          {/* Use the imported image */}
          <img src='/whatsapp.png' alt='WhatsApp Icon' className='icon' />

          <div className="text-details">
            <h3 className="title">Partage à vos proches</h3>
            <p className="description">Envoyez une photo à 5 amis</p>
          </div>
        </div>
        <div className="discount-section">
          <p className="discount">
            {bothLocked ? 'Réduction obtenue' : '5%'}
          </p>
          {/* Button is conditionally rendered */}
          {!bothLocked && !storyLocked && !commentLocked && (
            <button 
              className="button" 
              onClick={handleButtonClick} 
              disabled={isButtonLocked}
            >
              {isButtonLocked ? 'Veuillez patienter...' : 'Gagner maintenant'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountCard4;
