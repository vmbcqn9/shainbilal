import React, { useState, useEffect } from 'react';
import DiscountCard from './DiscountCard';
import DiscountCard2 from './DiscountCard2';

const LandingPage = () => {
  // Retrieve discount from localStorage (sum of the individual discounts from the cards)
  const savedDiscount = localStorage.getItem('discount');
  
  // Initialize state with the discount from localStorage or 0 if not available
  const [discount, setDiscount] = useState(savedDiscount ? parseInt(savedDiscount) : 0);

  // Initialize individual task discounts for the cards
  const [discountFromCard1, setDiscountFromCard1] = useState(0);
  const [discountFromCard2, setDiscountFromCard2] = useState(0);

  // Save the total discount to localStorage only if it has changed
  useEffect(() => {
    const totalDiscount = discountFromCard1 + discountFromCard2;
    setDiscount(totalDiscount); // Update the total discount
    localStorage.setItem('discount', totalDiscount); // Save the total discount to localStorage

    // Cleanup: Remove the discount from localStorage after 90 seconds
    const timeout = setTimeout(() => {
      localStorage.removeItem('discount');
    }, 90000);

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, [discountFromCard1, discountFromCard2]); // Recalculate when either discount changes

  // Function to update the discount when the user interacts with DiscountCard
  const updateDiscountFromCard1 = (newDiscountFromCard1) => {
    setDiscountFromCard1(newDiscountFromCard1);
  };

  // Function to update the discount when the user interacts with DiscountCard2
  const updateDiscountFromCard2 = (newDiscountFromCard2) => {
    setDiscountFromCard2(newDiscountFromCard2);
  };

  return (
    <div className="page-container">
      <header className="header1">
        <img src="/pokelogo.png" alt="Logo" />
      </header>

      <div className="header">
        <h1>5 minutes suffisent pour obtenir une réduction !</h1>
        <p>Choisissez les offres qui vous intéressent</p>
      </div>

      <div className="card">
        <h2>Votre réduction</h2>
        <p>Complétez les actions pour augmenter votre réduction</p>
        <h3 className="discount-text">Réduction obtenue : {discount}%</h3>
      </div>

      {/* Pass update functions to DiscountCard and DiscountCard2 */}
      <DiscountCard updateDiscount={updateDiscountFromCard1} />
      <DiscountCard2 updateDiscount2={updateDiscountFromCard2} />


    </div>
  );
};

export default LandingPage;
