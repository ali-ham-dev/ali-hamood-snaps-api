import express from 'express';

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});