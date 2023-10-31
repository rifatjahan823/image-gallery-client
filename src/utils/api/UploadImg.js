import React, { useState } from "react";
import "../styles/HomeImageGallery.css";
import { useForm } from "react-hook-form";

const UploadImg = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const {  handleSubmit } = useForm();

  //*************get image url****************
  const handleImageChange = (event) => {
    const files = event.target.files;
    setImageFiles(files);
  };

  const onSubmit = async (data) => {
    const imageUrls = await Promise.all(
      Array.from(imageFiles).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "msihpved"); // Replace with your upload preset name
        formData.append("cloud_name", "db0yjchk1"); // Replace with your Cloudinary cloud name
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/db0yjchk1/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        return data.secure_url;
      })
    );

    const image = {
      picture: imageUrls,
      request: "",
    };

    //send to your database
    fetch("http://localhost:5000/image", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(image),
    })
      .then((res) => res.json())
      .then((output) => {
        if (output.insertedId) {
          console.log("image added successfully");
        }
      });
  };

  return (
    <form  onSubmit={handleSubmit(onSubmit)}>
      {/* ----------Product Image---------- */}
      <div className="mb-3">
        <label>Product Image</label>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
        />
      </div>
       {/* -----------*********button********------------ */}
       <input className='signup-btn ms-0 mb-1 mt-2' type="submit" value="Add Problems" />
    </form>
  );
};

export default UploadImg;