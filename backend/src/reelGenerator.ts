import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import path from 'path';
import fs from 'fs';

ffmpeg.setFfmpegPath(ffmpegPath!);

export const createReel = (imagePaths: string[], outputPath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Validate inputs
        if (!imagePaths || imagePaths.length === 0) {
            reject(new Error('No image paths provided'));
            return;
        }

        // Validate that all files exist
        for (const imgPath of imagePaths) {
            if (!fs.existsSync(imgPath)) {
                reject(new Error(`Image file not found: ${imgPath}`));
                return;
            }
        }

        const totalDuration = 10; // 10 seconds total
        const frameRate = 30;
        const framesPerImage = Math.floor((totalDuration / imagePaths.length) * frameRate);
        const introOutroPath = path.join(__dirname, '../../assets/lumepic_intro.mp4');

        // Validate intro/outro video exists
        if (!fs.existsSync(introOutroPath)) {
            reject(new Error(`Intro/outro video not found at: ${introOutroPath}`));
            return;
        }

        console.log('Starting reel creation with:');
        console.log('- Intro/outro path:', introOutroPath);
        console.log('- Image paths:', imagePaths);
        console.log('- Output path:', outputPath);

        const command = ffmpeg();

        // Add intro video
        console.log('Adding intro video...');
        command.input(introOutroPath)
            .inputOptions([
                '-t 2'
            ]);

        // Add each image as an input
        imagePaths.forEach((imgPath, index) => {
            console.log(`Adding image ${index + 1}: ${imgPath}`);
            command.input(imgPath)
                .inputOptions([
                    '-loop 1',
                    `-t ${totalDuration / imagePaths.length}`,
                    '-f image2'
                ]);
        });

        // Add outro video
        console.log('Adding outro video...');
        command.input(introOutroPath)
            .inputOptions([
                '-t 2'
            ]);

        // Build filter complex
        let filterComplex = '';
        
        // Scale and fade for intro
        filterComplex += '[0:v]scale=1280:720:force_original_aspect_ratio=decrease,' +
                       'pad=1280:720:(ow-iw)/2:(oh-ih)/2,' +
                       'setsar=1[v0];';

        // Scale and fade for each image input
        imagePaths.forEach((_, i) => {
            filterComplex += `[${i+1}:v]format=rgb24,` +
                           `scale=1280:720:force_original_aspect_ratio=decrease,` +
                           `pad=1280:720:(ow-iw)/2:(oh-ih)/2,` +
                           `setsar=1,` +
                           `fade=in:0:${frameRate/2},` +
                           `fade=out:st=${(totalDuration/imagePaths.length)-0.5}:d=0.5` +
                           `[v${i+1}];`;
        });

        // Scale and fade for outro
        filterComplex += `[${imagePaths.length + 1}:v]scale=1280:720:force_original_aspect_ratio=decrease,` +
                        'pad=1280:720:(ow-iw)/2:(oh-ih)/2,' +
                        'setsar=1[v' + (imagePaths.length + 1) + '];';

        // Concatenation
        const totalInputs = imagePaths.length + 2; // images + intro + outro
        filterComplex += Array.from({length: totalInputs}, (_, i) => `[v${i}]`).join('') + 
                       `concat=n=${totalInputs}:v=1:a=0[v]`;

        console.log('Filter complex:', filterComplex);

        command
            .complexFilter(filterComplex)
            .outputOptions([
                '-map [v]',
                '-c:v libx264',
                '-pix_fmt yuv420p',
                `-r ${frameRate}`,
                '-movflags +faststart'
            ])
            .duration(totalDuration + 4)
            .save(outputPath)
            .on('start', (cmd) => {
                console.log('FFmpeg command:', cmd);
            })
            .on('progress', (p) => {
                console.log(`Progress: ${p.percent}%`);
                console.log('Current frame:', p.frames);
            })
            .on('stderr', (stderrLine) => {
                console.log('FFmpeg stderr:', stderrLine);
            })
            .on('end', () => {
                console.log('Video created successfully');
                resolve(outputPath);
            })
            .on('error', (err) => {
                console.error('FFmpeg error:', err);
                console.error('Error stack:', err.stack);
                reject(err);
            });
    });
};