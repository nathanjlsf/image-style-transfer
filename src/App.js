import React, { useState } from 'react';
import './App.css';
import { Button, Alert, Form, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [contentImage, setContentImage] = useState(null);
  const [styleImage, setStyleImage] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleContentImageUpload = (event) => {
    setContentImage(event.target.files[0]);
  };

  const handleStyleImageUpload = (event) => {
    setStyleImage(event.target.files[0]);
  };

  const onButtonClick = async () => {
    if (!contentImage || !styleImage) {
      setError("Please upload both content and style images.");
      return;
    }

    setIsLoading(true);
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('content_image', contentImage);
    formData.append('style_image', styleImage);

    try {
      await axios.post('http://localhost:5000/neural_style_transfer', formData);
      checkProgress();
    } catch (error) {
      setError("An error occurred during the style transfer process.");
      console.error(error);
      setIsLoading(false);
    }
  };

  const checkProgress = () => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get('http://localhost:5000/progress');
        setProgress(response.data.progress);
        if (response.data.progress === 100) {
          clearInterval(interval);
          getResult();
        } else if (response.data.progress === -1) {
          clearInterval(interval);
          setError("An error occurred during the style transfer process.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking progress:", error);
      }
    }, 1000);
  };

  const getResult = async () => {
    try {
      const response = await axios.get('http://localhost:5000/result', {
        responseType: 'arraybuffer'
      });
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      );
      setOutputImage(`data:image/jpeg;base64,${base64}`);
    } catch (error) {
      setError("An error occurred while retrieving the result.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="App container mt-5">
      <h1 className="mb-4">Image Style Transfer</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Content Image:</Form.Label>
          <Form.Control type="file" onChange={handleContentImageUpload} accept="image/*" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Style Image:</Form.Label>
          <Form.Control type="file" onChange={handleStyleImageUpload} accept="image/*" />
        </Form.Group>
        <Button onClick={onButtonClick} disabled={isLoading} className="mb-3">
          {isLoading ? 'Generating...' : 'Generate New Image'}
        </Button>
      </Form>
      {isLoading && (
        <ProgressBar now={progress} label={`${progress}%`} className="mb-3" />
      )}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}
      {outputImage && (
        <div className="mt-4">
          <h2 className="mb-2">Output Image:</h2>
          <img src={outputImage} alt="Style transferred" className="img-fluid" />
        </div>
      )}
    </div>
  );
}

export default App;