# FFmpeg Reel Creator

A web application that creates video reels from multiple images using FFmpeg. Built with React, TypeScript, and Node.js.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

## Features

- Upload multiple images to create a video reel
- Automatic image scaling and formatting
- Smooth transitions between images
- Download generated videos
- Responsive design
- Support for different social media platform dimensions (Instagram, TikTok, YouTube, Facebook)
- Multiple transition effects (fade, slide, zoom, dissolve)

## Tech Stack

- Frontend: React, TypeScript
- Backend: Node.js, Express
- Video Processing: FFmpeg
- Styling: CSS

## Installation

1. Clone the repository:
```bash
git clone https://github.com/geroiruleguy/reel-creator-mvp.git
cd reel-creator-mvp
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
3. Choose your preferred platform dimensions and transition effect
4. Click "Generate Reel" to create your video
5. Once generated, you can preview and download the video

## Project Structure

```
reel-creator-mvp/
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

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- [Geroiruleguy](https://github.com/geroiruleguy) 