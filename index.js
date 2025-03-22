import 'dotenv/config.js';
import express from 'express';
import tagsRouter from './routes/tags.js';
import photosRouter from './routes/photos.js';
import cors from 'cors';

const apiAuth = (req, res, next) => {
    const url = req.url;
    const apiKeyIndex = url.lastIndexOf('?');

    if (apiKeyIndex !== -1) {
        req.url = url.slice(0, apiKeyIndex - 1);
    }
    
    next();
};

const app = express();
app.use(express.json());
app.use(cors({origin: process.env.CORS_ORIGIN}));
app.use(apiAuth);

app.use('/tags', tagsRouter);
app.use('/photos', photosRouter);

const PORT = process.env.PORT || 5051;

app.listen(PORT, () => {
    process.env.SERVER_PATH = process.cwd();
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});