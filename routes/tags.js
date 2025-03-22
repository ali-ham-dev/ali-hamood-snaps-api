import express from 'express';
import { readFile } from 'fs/promises';

const getTags = async (filePath) => {
    try {
        return await readFile(filePath, 'utf8');
    } catch (error) {
        console.log(error.message);
    }
}

const tagsRouter = express.Router();
const tags = await getTags(process.env.DATA_TAGS_PATH);

tagsRouter.get('/', (req, res) => {
    if (tags == null) {
        res.status(404).send('Tags not found.');
        return;
    }

    res.send(tags);
});

export default tagsRouter;