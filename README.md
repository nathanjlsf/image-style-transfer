## Semantic-Aware Style Transfer for Image Analysis
CSC 480 - Cal Poly
Instructor: [Instructor's Name]

Team Members:

Juan Zavala
Nathan Lee
Sarthak Kamerkar
Victor Phan

This project is a web application that performs neural style transfer on images using a React frontend and a Flask backend with TensorFlow.

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

