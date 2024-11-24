import React, { useState, useEffect } from 'react';
import './DiscountCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const DiscountCard = ({ updateDiscount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [leaveTime, setLeaveTime] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage2, setAlertMessage2] = useState('');
  const [showAlert2, setShowAlert2] = useState(false);
  const [shuffledReviews, setShuffledReviews] = useState([]);  // For shuffling reviews
  const [isLocked, setIsLocked] = useState(false); // For locking the card

  const googleReviewLink = "";

  const preWrittenReviews = [
    "Nourriture excellente et service incroyable ! Je recommande vivement cet endroit.",
    "Les poke bowls ici sont fantastiques. Ingrédients frais et portions généreuses.",
    "Un des meilleurs restaurants où j'ai mangé ! Très bon rapport qualité-prix.",
    "L'ambiance est super agréable et les serveurs sont très sympathiques.",
    "Tout était parfait ! Je reviendrai sûrement pour goûter d'autres plats."
  ];

  // Shuffle function
  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
  };

  useEffect(() => {
    // Check if the card is locked from localStorage when the component mounts
    const lockedStatus = localStorage.getItem('isLocked');
    if (lockedStatus === 'true') {
      setIsLocked(true); // Lock the card if localStorage says it's locked
    }
  
    // Shuffle the reviews when the component is mounted
    const shuffled = shuffleArray(preWrittenReviews);
    setShuffledReviews(shuffled);
  
    // If the card is locked, unlock it after 5 seconds
    if (lockedStatus === 'true') {
      setTimeout(() => {
        setIsLocked(false); // Unlock the card
        localStorage.removeItem('isLocked'); // Remove lock from localStorage
      }, 90000);
    }
  }, []); // Empty dependency array ensures this runs only once on mount
  
  // Handle modal opening
  const handleCardClick = () => {
    if (isLocked) return; // Do nothing if the card is locked
    setIsModalOpen(true);
  };

  // Handle copying a review to clipboard
  const handleCopyReview = (review) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(review)
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          alert("Failed to copy the review. Please try again.");
        });
    } else {
      alert("Clipboard API not supported in this browser.");
    }
  };

  const handleProceedToGoogle = () => {
    window.open("https://reviewthis.biz/odd-meadow-1849", "_blank"); // Redirect to review page
    setIsTracking(true); // Start tracking
    setIsModalOpen(false);
  };

  const handleBlur = () => {
    if (isTracking) {
      setLeaveTime(Date.now()); // Save the time when the user leaves the page
    }
  };

  const handleFocus = () => {
    if (isTracking && leaveTime) {
      const returnTime = Date.now(); // The time the user returns to the page
      const duration = (returnTime - leaveTime) / 1000; // Calculate the duration the user was away

      if (duration < 5) {
        setAlertMessage("Erreur ! Veuillez réessayer.");
        setShowAlert(true); // Show error message
      } else {
        setAlertMessage2("Merci !");
        setShowAlert2(true); // Show confirmation message
        setIsLocked(true); // Lock the card
        localStorage.setItem('isLocked', 'true'); // Store the lock status in localStorage
        setTimeout(() => {
          setIsLocked(false); // Unlock after a certain time (30 seconds)
          localStorage.removeItem('isLocked'); // Remove from localStorage when unlocked
        }, 5000);
        updateDiscount(7);
      }

      setIsTracking(false); // Stop tracking
      setLeaveTime(null);   // Reset the time
    }
  };

  useEffect(() => {
    window.addEventListener("blur", handleBlur); // When the user leaves the page, call handleBlur
    window.addEventListener("focus", handleFocus); // When the user returns, call handleFocus

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [isTracking, leaveTime]); // Dependencies ensure the latest values are used

  return (
    <div>
      <div className="discount-card" onClick={handleCardClick}>
        <div className="card-content">
          <div className="text-content">
            <img src='/search.png' alt='Search Icon' className='icon' />
            <div className="text-details">
              <h3 className="title">Avis Google</h3>
              <p className="description">Donnez un avis et 5 étoiles</p>
            </div>
          </div>
  
          {/* Conditionally render based on isLocked */}
          {isLocked ? (
            <div className="discount-section">
              <p className="reducOb">Réduction obtenue &#10003;</p>
            </div>
          ) : (
            <div className="discount-section">
              <p className="discount">5%</p>
              <button className="button">Gagner maintenant</button>
            </div>
          )}
        </div>
  
        {/* Show alerts */}
        {showAlert && (
          <div className="overlay">
            <div className="custom-alert">
              <p>{alertMessage}</p>
              <button onClick={() => setShowAlert(false)} className="return-button">
                Réessayer
              </button>
            </div>
          </div>
        )}
  
        {showAlert2 && (
          <div className="overlay">
            <div className="custom-alert">
              <p>{alertMessage2}</p>
              <button onClick={() => {
                setShowAlert2(false);
               setIsModalOpen(false)
              }} className="return-button">
                Retour
              </button>
            </div>
          </div>
        )}
      </div>
  
      {/* Modal for pre-written reviews */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="back-button" onClick={() => setIsModalOpen(false)}>X</button>
            <h3 className="modal-title">Sélectionnez un avis</h3>
            <ul className="review-list">
              {shuffledReviews.map((review, index) => (
                <li key={index} className="review-item">
                  <p>{review}</p>
                  <div className="actions">
                    <button className="copy-button" onClick={() => handleCopyReview(review)}>
                      <FontAwesomeIcon icon={faCopy} /> Copier
                    </button>
                    <button className="proceed-button" onClick={handleProceedToGoogle}>
                      Poster sur Google
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default DiscountCard;
