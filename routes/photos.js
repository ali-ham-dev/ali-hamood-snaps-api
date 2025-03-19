import express from 'express';
import { readFile } from 'fs/promises';
import { v4 as uuid4 } from 'uuid';

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
        photos.status(500).send('Photo not found');
    }
});

photosRouter.get('/:photoId/comments', (req, res) => {
    try {
        const photo = photos.find(photos => photos.id === req.params.photoId);

        if (photo == null ||
            photo.length === 0) {
            res.status(404).send('Photo not found');
            return;
        }

        res.status(200).send(photo.comments);
    } catch (error) {
        console.log(error.message);
        photos.status(500).send('Comments not found');
    }
});

photosRouter.post('/:photoId/comments', (req, res) => {
    try {
        const comment = req.body;

        if (comment == null ||
            comment?.name == null ||
            comment?.comment == null) {
            res.status(400).send('Invalid comment object');
            return;
        }

        const photoIndex = photos.findIndex(photos => photos.id === req.params.photoId);
        const photo = photos[photoIndex];

        if (photo == null ||
            photo.length === 0) {
            res.status(404).send('Photo not found');
            return;
        }

        comment.timestamp = Date.now();
        comment.id = uuid4();

        photo.comments.push(comment);
        photos[photoIndex] = photo;

        res.status(201).send(comment);
    } catch (error) {
        console.log(error.message);
        photos.status(500).send('Could not add comment');
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