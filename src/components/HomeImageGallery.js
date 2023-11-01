import React, { useEffect, useState } from "react";
import GetImg from "../utils/api/GetImg";
import "../styles/HomeImageGallery.css";
import UploadImg from "../utils/api/UploadImg";

const HomeImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIds, setSelectedImageIds] = useState([]);

  const handleImageSelection = (imageId) => {
    if (selectedImageIds.includes(imageId)) {
      setSelectedImageIds(selectedImageIds.filter((id) => id !== imageId));
    } else {
      setSelectedImageIds([...selectedImageIds, imageId]);
    }
  };

  const handleDeleteSelectedImages = () => {
    // Create an array of selected image IDs
    const selectedImageIdsArray = selectedImageIds.map((id) => ({ id }));

    // Send a DELETE request to your API to delete the selected images using the selectedImageIds array.
    fetch('http://localhost:5000/delete-selected-images', {
      method: 'DELETE',
      body: JSON.stringify({ selectedImageIds: selectedImageIdsArray }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // Handle the success case, and then update the images state to reflect the changes.
          // For example, fetch the updated image data and set it using setImages.
        } else {
          console.error('Failed to delete selected images.');
        }
      })
      .catch((error) => {
        console.error('Error deleting selected images:', error);
      });
  };


  useEffect(() => {
    fetch("http://localhost:5000/image")
      .then((res) => res.json())
      .then((data) => setImages(data.data));
  }, []);

  const onDragStart = (event, index) => {
    event.dataTransfer.setData("text/plain", index);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, toIndex) => {
    const fromIndex = parseInt(event.dataTransfer.getData("text/plain"), 10);

    if (fromIndex !== toIndex) {
      const updatedImages = [...images];
      const [movedImage] = updatedImages.splice(fromIndex, 1);
      updatedImages.splice(toIndex, 0, movedImage);
      setImages(updatedImages);
    }
  };

  return (
   <div>
      <button onClick={handleDeleteSelectedImages}>Delete Selected</button>
     <div className="grid-wrapper">
      {images.map((img, index) => (
        <div
          key={index}
          draggable="true"
          onDragStart={(event) => onDragStart(event, index)}
          onDragOver={(event) => onDragOver(event)}
          onDrop={(event) => onDrop(event, index)}
          className="image-container"
        >
          <GetImg img={img} isSelected={selectedImageIds.includes(img._id)}
            onImageSelection={handleImageSelection}/>
        </div>
      ))}
      <UploadImg />
    </div>
   </div>
  );
};

export default HomeImageGallery;