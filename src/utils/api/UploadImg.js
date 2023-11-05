import React, { useState } from "react";
import "../../styles/UploadImg.css";
import { BsImage } from "react-icons/bs";

const UploadImg = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const areImagesSelected = () => {
    return imageFiles.length > 0;
  };

  const [selectedImages, setSelectedImages] = useState([]); // State to store selected image previews

  // *************get image url****************
  const handleImageChange = (event) => {
    const files = event.target.files;
    setImageFiles(files);

    // Create an array of image previews from the selected files
    const imagePreviews = Array.from(files).map((file) => URL.createObjectURL(file));
    setSelectedImages(imagePreviews);
  };

  // Handle the drop event
  const handleImageDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    setImageFiles(files);

    // Create an array of image previews from the dropped files
    const imagePreviews = Array.from(files).map((file) => URL.createObjectURL(file));
    setSelectedImages(imagePreviews);
  };

  const onSubmit = async (data) => {
    const imageUrls = await Promise.all(
      Array.from(imageFiles).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "msihpved");
        formData.append("cloud_name", "db0yjchk1");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/db0yjchk1/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        return data.secure_url;
      }),

    );
    const image = {
      picture: imageUrls,
      request: "",
    };

    //send to your database
    fetch("https://image-gallery-rou0.onrender.com/image", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(image),
    })
      .then((res) => res.json())
      .then((output) => {
        if (output.insertedId) {
        }
      });
      setImageFiles([]);
      setSelectedImages([]);
  };

  return (

    <>
      <div
        onDrop={handleImageDrop}
        onDragOver={(event) => event.preventDefault()}
        className="drop-zone"
      >
        {/* ----------Product Image---------- */}
        <form className="mb-3">
          <label class="custom-file-upload">
            <input type="file" style={{ display: "none", }} onChange={handleImageChange} />
            <BsImage style={{ cursor: "pointer",fontSize:"22px" }} />
          </label>

        </form>
        <button className="img-btn" onClick={onSubmit} disabled={!areImagesSelected()} >Add Images</button>
        {/* Render the selected image previews in a container */}
        {selectedImages.length > 0 && (
          <div className="selected-images-container">
            {selectedImages.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Selected Image ${index}`} className="selected-image" />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UploadImg;
