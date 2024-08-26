import React, { useState } from 'react';

function ContentImageUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [imagePath, setImagePath] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('contentImage', file);

    try {
      const response = await fetch('http://localhost:5000/upload/content', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setStatus(`Content Image uploaded successfully: ${data.path}`);
      setImagePath(data.path);
    } catch (error) {
      setStatus('Error uploading content image');
    }
  };

  return (
    <div>
      <h2>Upload Content Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {status && <p>{status}</p>}
      {imagePath && (
        <div>
          <h3>Processed Content Image:</h3>
          <img src={`http://localhost:5000/${imagePath}`} alt="Processed Content" />
        </div>
      )}
    </div>
  );
}

export default ContentImageUpload;
