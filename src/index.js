import express from 'express';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON requests
app.use(express.json());

// API route to handle the POST request
app.post('/api/search', upload.single('data'), (req, res) => {
  try {
    console.log('Received body:', req.body); // Debugging: Log req.body
    console.log('Received file:', req.file);  // Debugging: Log req.file

    const { searchType } = req.body;

    if (req.file) {
      // If file is uploaded, it will be in req.file
      console.log('Uploaded file:', req.file);
      res.json({
        message: `File uploaded successfully: ${req.file.originalname}`,
        fileInfo: req.file,
      });
    } else if (req.body.data) {
      // If no file, but text data is received
      console.log('Received text data:', req.body.data);
      res.json({
        message: 'Search processed with the text data: ' + req.body.data,
      });
    } else {
      // If neither file nor text data is present
      res.status(400).json({ error: 'Invalid data format. No file or text data provided.' });
    }
  } catch (error) {
    console.error('Error handling the request:', error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
});



// Serve static files from the Vite build output
const staticPath = path.join(__dirname, 'dist');
app.use(express.static(staticPath));

// Fallback to serve the React app's index.html for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
