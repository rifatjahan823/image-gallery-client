import React, { useState } from 'react';
import '../../styles/HomeImageGallery.css'


const GetImg = ({ img }) => {
    const { picture } = img;
  
  // Use state to track the checkbox's visibility
  const [showCheckbox, setShowCheckbox] = useState(false);

  // Use state to track the checkbox's checked state
  const [isChecked, setIsChecked] = useState(false);

  const handleMouseEnter = () => {
    setShowCheckbox(true);
  };

  const handleMouseLeave = () => {
    if (!isChecked) {
      setShowCheckbox(false);
    }
  };

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };
  
    return (
      <div
        className="Getimage-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={picture} alt="" />
  
        {/* Conditional rendering of the checkbox */}
      {showCheckbox && (
        <div className="checkbox" onClick={handleCheckboxClick}>
          <input type="checkbox" checked={isChecked} />
        </div>
      )}
      </div>
    );
  };
export default GetImg;