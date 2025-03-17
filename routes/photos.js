import express from 'express';
import { readFile } from 'fs/promises';

const getPhotos = async (filePath) => {
    try {
        return await readFile(filePath, 'utf8');
    } catch (error) {
        console.log(error.message);
    }
}

const photosRouter = express.Router();
const photos = await getPhotos('./data/photos.json');  

photosRouter.get('/:photoId', (req, res) => {
    const photoPath = `${process.env.PROJECT_PATH}/public/images/${req.params.photoId}`;
    console.log(photoPath);
    res.sendFile(photoPath);
});

photosRouter.get('/', (req, res) => {
    if (photos == null) {
        res.status(404).send('Photos not found');
        return;
    }

    res.send(photos);
});

export default photosRouter;