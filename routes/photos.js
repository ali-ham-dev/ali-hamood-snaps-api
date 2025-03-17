import express from 'express';
import { readFile } from 'fs/promises';

const getPhotos = async (filePath) => {
    try {
        return JSON.parse(await readFile(filePath, 'utf8'));
    } catch (error) {
        console.log(error.message);
    }
}

const photosRouter = express.Router();
const photos = await getPhotos('./data/photos.json');  

photosRouter.get('/public/:photoFileName', (req, res) => {
    try {
        console.log('Mad it here.');
        const photoPath = `${process.env.PROJECT_PATH}/public/images/${req.params.photoFileName}`;
        res.sendFile(photoPath);
    } catch (error) {
        console.log(error.message);
    }
});

photosRouter.get('/:photoId', (req, res) => {
    try {
        const photo = photos.find(photos => photos.id === req.params.photoId);

        if (photo == null ||
            photo.length === 0) {
            res.status(404).send('Photo not found');
            return;
        }

        res.status(200).send(photo);
    } catch (error) {
        console.log(error.message);
        photos.status(404).send('Photo not found');
    }
});

photosRouter.get('/', (req, res) => {
    if (photos == null) {
        res.status(404).send('Photos not found');
        return;
    }

    res.send(JSON.stringify(photos));
});

export default photosRouter;