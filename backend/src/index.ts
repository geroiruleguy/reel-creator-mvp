import express from 'express';
import { createReel } from './reelGenerator';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

app.post('/api/create-reel', upload.array('images'), async (req, res) => {
  try {
    console.log('Received request with files:', req.files);
    
    if (!req.files || req.files.length === 0) {
      res.status(400).json({ error: 'No images uploaded' });
      return;
    }

    const outputPath = path.join(__dirname, 'output/reel.mp4');
    console.log('Output path:', outputPath);
    
    const imagePaths = (req.files as Express.Multer.File[])?.map(file => file.path) || [];
    console.log('Processing images:', imagePaths);

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    await createReel(imagePaths, outputPath);
    console.log('Reel created successfully');
    
    // Return the full URL for the video
    const videoUrl = `http://localhost:3000/output/reel.mp4`;
    res.json({ videoUrl });
  } catch (err) {
    console.error('Error in create-reel endpoint:', err);
    res.status(500).json({ 
      error: 'Failed to generate reel',
      details: err instanceof Error ? err.message : 'Unknown error'
    });
  }
});

const outputDir = path.join(__dirname, 'output');
app.use('/output', express.static(outputDir));
app.listen(3000, () => console.log('Server running on port 3000'));