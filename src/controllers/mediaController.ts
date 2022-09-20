import { Router } from 'express';
import multer from 'multer';
import MediaService from '../services/mediaService.js';

const mediaService = new MediaService();
const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), async (req, res) => {
  const file = req.file;
  try {
    const returnValue = await mediaService.processFile(file);
    return res.status(200).json({file: returnValue});
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Error, nada salio flama :(' });
  }
});

export default router;
