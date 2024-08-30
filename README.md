## Semantic-Aware Style Transfer for Image Analysis
CSC 480 - Cal Poly
Instructor: Rodrigo Canaan

Team Members:

Juan Zavala,
Nathan Lee,
Sarthak Kamerkar,
Victor Phan

This project is a web application that applies semantic style transfer to images, built with a React frontend and a Flask backend powered by TensorFlow.

## Features

- Upload content and style images
- Perform neural style transfer
- Real-time progress tracking
- Display the resulting stylized image

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- Python 3.7+ installed
- pip (Python package manager) installed

## Setup

### Frontend (React)

1. Navigate to the project directory
2. Install the required npm packages:

npm install

### Backend (Flask)

1. Navigate to the backend directory
2. Install the required Python packages:
pip install flask flask-cors pillow tensorflow numpy

## Running the Application

### Start the Frontend

In the project directory, run:

npm install react-app

npm start

This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Start the Backend

In a separate terminal, navigate to the backend directory and run:

python server.py

This starts the Flask server on [http://localhost:5000](http://localhost:5000).

## Usage

1. Open the web application in your browser
2. Upload a content image and a style image
3. Click the "Generate New Image" button
4. Wait for the style transfer process to complete
5. View the resulting stylized image

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation. Once you eject, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Troubleshooting

If you encounter any issues, please check the following:

1. Ensure both frontend and backend servers are running
2. Check the console for any error messages
3. Verify that all required packages are installed
4. Ensure your firewall is not blocking the application

If problems persist, please open an issue in the project repository.

## Testing

8-Hour/Overnight Image Processing
![alt text](https://github.com/victorphan101/image-style-transfer/blob/main/Semantic-Aware%20Transfer%20for%20Image%20Analysis.png?raw=true)

256x256 Pixel Image Processing Test (>30mins)
![alt text](https://github.com/victorphan101/image-style-transfer/blob/main/256pixel-test.png?raw=true)

256x256 Pixel Video Game Image Processing Test (>30mins)
![alt text](https://github.com/victorphan101/image-style-transfer/blob/main/video-game-test.png?raw=true)

Terminal Log for Content Image Loss and Style Image Loss Progress Overtime
![alt text](https://github.com/victorphan101/image-style-transfer/blob/main/style-terminal-log.png?raw=true)

Graphical Representation of Content Image Pixel Loss vs Style Image Pixel Loss for Output Image
![alt text](https://github.com/victorphan101/image-style-transfer/blob/main/style-lost-graph.png?raw=true)

