// ContentImageUpload.js
import React, { useState } from 'react';

const ContentImageUpload = () => {
  const [contentImage, setContentImage] = useState(null);

  const handleContentImageChange = (e) => {
    setContentImage(e.target.files[0]);
  };

  return (
    <div className="upload-container">
      <h3>Upload Content Image</h3>
      <input type="file" onChange={handleContentImageChange} />
      {contentImage && <p>Selected file: {contentImage.name}</p>}
    </div>
  );
};

export default ContentImageUpload;
