import express from 'express';
import tagsRouter from './routes/tags.js';

const app = express();
app.use('/tags', tagsRouter);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});