import { validateOrReject } from 'class-validator';
import { NextFunction, Router } from 'express';
import multer from 'multer';
import { AuthMiddleware } from '../common/authMiddleware.js';
import { MediaCreateDto } from '../dtos/media-create.dto.js';
import MediaService from '../services/mediaService.js';

const mediaService = new MediaService();
const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', AuthMiddleware, upload.single('file'), async (req: any, res, next: NextFunction) => {
  const userId = req.user.sub;
  const mediaDto: MediaCreateDto = { ...req.body };
  const file = req.file;

  if (file) {
    mediaService
      .createMediaAsync(userId, mediaDto, file)
      .then(() => res.status(201).send())
      .catch(err => next(err));
  } else {
    next('Missing File');
  }
});

// TODO: Get media by Id
router.get('/:id', async (_req, res) => {
  return res.status(200).json('Ping');
});

export default router;
