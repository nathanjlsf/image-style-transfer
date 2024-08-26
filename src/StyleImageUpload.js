import React, { useState } from 'react';

function StyleImageUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [imagePath, setImagePath] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('styleImage', file);

    try {
      const response = await fetch('http://localhost:5000/upload/style', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setStatus(`Style Image uploaded successfully: ${data.path}`);
      setImagePath(data.path);
    } catch (error) {
      setStatus('Error uploading style image');
    }
  };

  return (
    <div>
      <h2>Upload Style Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {status && <p>{status}</p>}
      {imagePath && (
        <div>
          <h3>Processed Style Image:</h3>
          <img src={`http://localhost:5000/${imagePath}`} alt="Processed Style" />
        </div>
      )}
    </div>
  );
}

export default StyleImageUpload;
