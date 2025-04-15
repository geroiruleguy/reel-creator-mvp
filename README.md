# FFmpeg Reel Creator

A web application that creates video reels from multiple images using FFmpeg. Built with React, TypeScript, and Node.js.

## Features

- Upload multiple images to create a video reel
- Automatic image scaling and formatting
- Smooth transitions between images
- Download generated videos
- Responsive design

## Tech Stack

- Frontend: React, TypeScript
- Backend: Node.js, Express
- Video Processing: FFmpeg
- Styling: CSS

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ffmeg-reel-creator-mvp.git
cd ffmeg-reel-creator-mvp
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Start the development servers:
```bash
# Start backend server (from backend directory)
npm start

# Start frontend server (from frontend directory)
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Usage

1. Open the application in your browser
2. Click "Upload Images" to select multiple images
3. Click "Generate Reel" to create your video
4. Once generated, you can preview and download the video

## Project Structure

```
ffmeg-reel-creator-mvp/
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   └── reelGenerator.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details. 