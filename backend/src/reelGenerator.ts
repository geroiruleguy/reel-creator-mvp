import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegPath!);

export const createReel = (imagePaths: string[], outputPath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const totalDuration = 10; // 10 seconds total
        const frameRate = 30;
        const framesPerImage = Math.floor((totalDuration / imagePaths.length) * frameRate);

        console.log(`Creating ${totalDuration}s reel with ${imagePaths.length} images`);

        const command = ffmpeg();
        
        // Add each image as an input with loop option
        imagePaths.forEach(imgPath => {
            command.input(imgPath)
                .inputOptions([
                    '-loop 1',
                    `-t ${totalDuration / imagePaths.length}`
                ]);
        });

        // Build filter complex
        let filterComplex = '';
        
        // Scale and fade for each input
        imagePaths.forEach((_, i) => {
            filterComplex += `[${i}:v]scale=1280:720:force_original_aspect_ratio=decrease,` +
                           `pad=1280:720:(ow-iw)/2:(oh-ih)/2,` +
                           `setsar=1,` +
                           `fade=in:0:${frameRate/2},` + // 0.5s fade in
                           `fade=out:st=${(totalDuration/imagePaths.length)-0.5}:d=0.5` + // 0.5s fade out
                           `[v${i}];`;
        });

        // Concatenation
        filterComplex += imagePaths.map((_, i) => `[v${i}]`).join('') + 
                       `concat=n=${imagePaths.length}:v=1:a=0[v]`;

        command
            .complexFilter(filterComplex)
            .outputOptions([
                '-map [v]',
                '-c:v libx264',
                '-pix_fmt yuv420p',
                `-r ${frameRate}`,
                '-movflags +faststart'
            ])
            .duration(totalDuration)
            .save(outputPath)
            .on('start', (cmd) => console.log('Running:', cmd))
            .on('progress', (p) => console.log(`Progress: ${p.percent}%`))
            .on('end', () => {
                console.log('Video created successfully');
                resolve(outputPath);
            })
            .on('error', (err) => {
                console.error('Error:', err);
                reject(err);
            });
    });
};