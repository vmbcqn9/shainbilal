import React, { useState, useEffect } from 'react';
import './DiscountCard.css';
import { wait } from '@testing-library/user-event/dist/utils';

const DiscountCard2 = ({ updateDiscount2 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImage, setIsImage] = useState(false); // State for image visibility
  const [isTracking, setIsTracking] = useState(false);
  const [leaveTime, setLeaveTime] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Separate lock states for each task
  const [isTask1Locked, setIsTask1Locked] = useState(false);
  const [isTask2Locked, setIsTask2Locked] = useState(false);

  // State to lock the entire card
  const [isCardLocked, setIsCardLocked] = useState(false);

  const imageUrl = 'https://lh3.googleusercontent.com/p/AF1QipPJTEXiQtcaLoXI7cZ7-xTRSD1H7s31CsML67pd=s1360-w1360-h1020'; // Image URL

  // Check card lock status on component mount
  useEffect(() => {
    const task1Status = localStorage.getItem('isTask1Locked') === 'true';
    const task2Status = localStorage.getItem('isTask2Locked') === 'true';

    setIsTask1Locked(task1Status);
    setIsTask2Locked(task2Status);

    if (task1Status && task2Status) {
      lockCard();
    }
  }, []);

  useEffect(() => {
    // Lock the card when both tasks are locked
    if (isTask1Locked && isTask2Locked) {
      lockCard();
    }
  }, [isTask1Locked, isTask2Locked]);

  const lockCard = () => {
    setIsCardLocked(true);
    localStorage.setItem('isCardLocked', 'true');
    updateDiscount2(5); // Apply discount only when both tasks are done

    // Unlock after 5 seconds
    const timer = setTimeout(() => {
      setIsTask1Locked(false);
      setIsTask2Locked(false); // Unlock the tasks
      setIsCardLocked(false); // Unlock the card
      localStorage.removeItem('isTask1Locked');
      localStorage.removeItem('isTask2Locked');
      localStorage.removeItem('isCardLocked'); // Remove lock from localStorage
    },30000);

    // Clean up timeout on unmount or if the lock status changes
    return () => clearTimeout(timer);
  };

  const openInstagramStory = () => {
    const instagramURL = `https://www.instagram.com/create/story/?media=${encodeURIComponent(imageUrl)}`;
    window.location.href = instagramURL;
    setIsTracking(true);
  };

  const handleBlur = () => {
    if (isTracking) {
      setLeaveTime(Date.now());
    }
  };

  const handleFocus = () => {
    if (isTracking && leaveTime) {
      const returnTime = Date.now();
      const duration = (returnTime - leaveTime) / 1000;

      if (duration < 5) {
        setAlertMessage('Erreur ! Veuillez réessayer.');
        setShowAlert(true);
      } else {
        setAlertMessage('Merci !');
        setShowAlert(true);
        setIsTask1Locked(true); // Lock task 1 when completed
        localStorage.setItem('isTask1Locked', 'true');
      }

      setIsTracking(false);
      setLeaveTime(null);
    }
  };

  useEffect(() => {
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isTracking, leaveTime]);

  const LikeNcom = () => {
    const instagramURL2 = 'https://www.instagram.com/p/C5rLG-5rjUg/';
    window.location.href = instagramURL2;
    setTimeout(() => {
      setIsTask2Locked(true); // Lock task 2 after 5 seconds
      localStorage.setItem('isTask2Locked', 'true');
    }, 5000); // 5 seconds delay    localStorage.setItem('isTask2Locked', 'true');
  };
  

  const openImageCard = () => {
    setIsImage(true);
    setIsModalOpen(false);
  };

  const closeImageCard = () => {
    setIsImage(false);
  };

  return (
    <div>
      {/* Discount Card */}
      <div className="discount-card" onClick={() => !isCardLocked && setIsModalOpen(true)}>
        <div className="card-content">
          <div className="text-content">
            <img src="/instagram(1).png" alt="Instagram Icon" className="icon" />
            <div className="text-details">
              <h3 className="title">Partager sur Instagram</h3>
              <p className="description">Partagez votre expérience</p>
            </div>
          </div>
          {isCardLocked ? (
            <div className="discount-section">
              <p className="reducOb">Réduction obtenue &#10003;</p>
            </div>
          ) : (
            <div className="discount-section">
              <p className="discount">5%</p>
              <button className="button" disabled={isCardLocked}>
                Gagner maintenant
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content2">
            <button className="back-button" onClick={() => setIsModalOpen(false)}>
              X
            </button>
            <h3 className="modal-title">Sélectionnez une option</h3>
            <div className="actions2">
            {isTask1Locked ? (
              <button className="option-button-eff">
              Story publiée &#10003;
            </button>):(
              <button className="option-button" onClick={openImageCard} disabled={isTask1Locked}>
                Publier une story
              </button>)}
              {isTask2Locked ? (
              <button className="option-button-eff">
             Effectuée &#10003;
            </button>):(<button 
  className="option-button" 
  onClick={() => { 
    LikeNcom(); 
    setIsModalOpen(false); 
  }} 
  disabled={isTask2Locked}
>
  Like et commente ce post !
</button>)}

            </div>
          </div>
        </div>
      )}

      {/* Image Card */}
      {isImage && (
        <div className="image-modal">
          <div className="image-card">
            <button className="back-button2" onClick={closeImageCard}>
              X
            </button>
            <p className="screenshot-message">
              <b>Instruction :</b>
            </p>
            <ol className="instructions-list">
              <li>Appuyer longuement sur l'image.</li>
              <li>Appuyer sur le bouton "Enregistrer l'image".</li>
              <li>Appuyer sur le bouton "Continuer vers Instagram".</li>
            </ol>

            <div className="image-container">
              <img src={imageUrl} alt="Screenshot Image" className="screenshot-image" />
            </div>

            <button
              className="Continuer"
              onClick={() => {
                openInstagramStory();
                closeImageCard();
              }}
            >
              Continuer sur Instagram
            </button>
          </div>
        </div>
      )}

     {/* Alerts */}
{showAlert && (
  <div className="overlay">
    <div className="custom-alert">
      <p>{alertMessage}</p>
      {alertMessage === 'Erreur ! Veuillez réessayer.' ? (
        <button
          onClick={() => {
            setShowAlert(false);
            openImageCard();
          }}
          className="return-button"
        >
          Réessayer
        </button>
      ) : (
        <button
          onClick={() => setShowAlert(false)}
          className="return-button"
        >
          Retour
        </button>
      )}
    </div>
  </div>
)}
    </div>
  );
};

export default DiscountCard2;
