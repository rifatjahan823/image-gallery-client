import React, { useState } from 'react';
import '../../styles/GetImg.css';

const GetImg = ({img, isSelected, onImageSelection }) => {
  const { picture, _id } = img;
  const [showCheckbox, setShowCheckbox] = useState(false);

  const handleMouseEnter = () => {
    setShowCheckbox(true);
  };

  const handleMouseLeave = () => {
    if (!isSelected) {
      setShowCheckbox(false);
    }
  };

  const handleContainerClick = () => {
    onImageSelection(_id);
  };

  const handleCheckboxClick = (event) => {
    event.stopPropagation();
    onImageSelection(_id);
    setShowCheckbox(!isSelected);
  };

  return (
    <div
    className={`Getimage-container ${showCheckbox || isSelected ? 'hovered' : ''}`}
    onClick={handleContainerClick}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <img src={picture} alt="" />

    <div className={`checkbox ${showCheckbox || isSelected ? 'visible' : ''}`} onClick={handleCheckboxClick}>
      <input type="checkbox" checked={isSelected} readOnly style={{ width: '20px', height: '25px',marginTop:"25px",marginLeft:"20px"}}/>
    </div>
  </div>
  );
};

export default GetImg;
