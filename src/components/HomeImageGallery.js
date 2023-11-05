import React, { useEffect, useState } from "react";
import GetImg from "../utils/api/GetImg";
import "../styles/HomeImageGallery.css";
import UploadImg from "../utils/api/UploadImg";
import Loading from "../shared/Loading";

const HomeImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [spiner,setSpiner]=useState(false);

  useEffect(() => {
    setSpiner(true);
    fetchData();
    const refreshInterval = setInterval(fetchData, 2000);
    return () => {
      clearInterval(refreshInterval); 
    };
  }, []);

  const fetchData = () => {
    fetch("https://image-gallery-rou0.onrender.com/image")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.data);
        setSpiner(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setSpiner(false);
      });
  };

 // Send a DELETE request to your API to delete the selected images using the selectedImageIds array.
 const handleDeleteSelectedImages = () => {
  const selectedImageIdsArray = selectedImageIds.map((id) => ({ id }));
  fetch('https://image-gallery-rou0.onrender.com/delete-selected-images', {
    method: 'DELETE',
    body: JSON.stringify({ selectedImageIds: selectedImageIdsArray }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        setSelectedImageIds([]); 
        fetchData();
      } else {
        console.error('Failed to delete selected images.');
      }
    })
    .catch((error) => {
      console.error('Error deleting selected images:', error);
    });
};


  const handleImageSelection = (imageId) => {
    if (selectedImageIds.includes(imageId)) {
      setSelectedImageIds(selectedImageIds.filter((id) => id !== imageId));
    } else {
      setSelectedImageIds([...selectedImageIds, imageId]);
    }
  };
 

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
   <div className="gallery-section">
     <div className="gallery-title">
      {
      selectedImageIds.length>=1 && <h3>  <input type="checkbox" checked  style={{ width: '16px', height: '16px'}}/> {selectedImageIds.length} File Selected</h3>
      }
           {
      selectedImageIds.length>=1?
      <a onClick={handleDeleteSelectedImages}>Delete files</a>:
      <h1>Gallery</h1>
     }
     </div>

     <div className="grid-wrapper">
      {
           spiner ? (
            <Loading></Loading>
            ):
      images?.map((img, index) => (
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