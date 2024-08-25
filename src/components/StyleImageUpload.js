// StyleImageUpload.js
import React, { useState } from 'react';

const StyleImageUpload = () => {
  const [styleImage, setStyleImage] = useState(null);

  const handleStyleImageChange = (e) => {
    setStyleImage(e.target.files[0]);
  };

  return (
    <div className="upload-container">
      <h3>Upload Style Image</h3>
      <input type="file" onChange={handleStyleImageChange} />
      {styleImage && <p>Selected file: {styleImage.name}</p>}
    </div>
  );
};

export default StyleImageUpload;
