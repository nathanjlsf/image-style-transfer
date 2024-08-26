const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

const upload = multer({
  dest: 'uploads/',
});

app.post('/upload/content', upload.single('contentImage'), async (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).send('No content image uploaded.');
  }

  const originalFilePath = path.join(__dirname, file.path);
  const processedFilePath = path.join(__dirname, 'uploads', `processed-content-${file.originalname}`);

  try {
    await sharp(originalFilePath)
      .resize(800, 600) // Resize to 800x600
      .toFile(processedFilePath);

    fs.unlinkSync(originalFilePath);

    res.send({
      status: 'success',
      path: processedFilePath,
    });
  } catch (error) {
    res.status(500).send('Error processing content image');
  }
});

app.post('/upload/style', upload.single('styleImage'), async (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).send('No style image uploaded.');
  }

  const originalFilePath = path.join(__dirname, file.path);
  const processedFilePath = path.join(__dirname, 'uploads', `processed-style-${file.originalname}`);

  try {
    await sharp(originalFilePath)
      .resize(800, 600) // Resize to 800x600
      .toFile(processedFilePath);

    fs.unlinkSync(originalFilePath);

    res.send({
      status: 'success',
      path: processedFilePath,
    });
  } catch (error) {
    res.status(500).send('Error processing style image');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
