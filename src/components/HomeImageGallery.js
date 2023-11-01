import React, { useEffect, useState } from "react";
import GetImg from "../utils/api/GetImg";
import "../styles/HomeImageGallery.css";
import UploadImg from "../utils/api/UploadImg";

const HomeImageGallery = () => {
  const [images, setImages] = useState([]);

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
          <GetImg img={img} />
        </div>
      ))}
      <UploadImg />
    </div>
  );
};

export default HomeImageGallery;