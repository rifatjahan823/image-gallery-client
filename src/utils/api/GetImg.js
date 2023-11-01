import React, { useEffect, useState } from 'react';
import '../../styles/HomeImageGallery.css'


const GetImg = ({ img, isSelected, onImageSelection }) => {
    const { picture,_id } = img;
    
  // Use state to track the checkbox's visibility
  // const [showCheckbox, setShowCheckbox] = useState(false);

  // Use state to track the checkbox's checked state
  // const [isChecked, setIsChecked] = useState(false);

  // const handleMouseEnter = () => {
  //   setShowCheckbox(true);
  // };

  // const handleMouseLeave = () => {
  //   if (!isChecked) {
  //     setShowCheckbox(false);
  //   }
  // };

  // const handleCheckboxClick = () => {
  //   setIsChecked(!isChecked);
  // };


  //handle delete by checkbox
 
  
    return (
      <div className="Getimage-container" onClick={() => onImageSelection(_id)}>
      <img src={picture} alt="" />

      <div className="checkbox">
        <input type="checkbox" checked={isSelected} />
      </div>
    </div>
    );
  };
export default GetImg;