import express from 'express';
import tagsRouter from './routes/tags.js';
import photosRouter from './routes/photos.js';

const app = express();
app.use('/tags', tagsRouter);
app.use('/photos', photosRouter);

const PORT = 8080;

app.listen(PORT, () => {
    process.env.PROJECT_PATH = process.cwd();
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});