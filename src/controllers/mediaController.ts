import { validateOrReject } from 'class-validator';
import { NextFunction, Router } from 'express';
import multer from 'multer';
import { AuthMiddleware } from '../auth/authMiddleware.js';
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

router.get('/me', AuthMiddleware, async (req: any, res, next: NextFunction) => {
  const userId = req.user.sub;
  mediaService
    .getAllMediaByUserAsync(userId)
    .then(data => res.status(200).json(data))
    .catch(err => next(err));
});

router.get('/stats', AuthMiddleware, async (req: any, res, next: NextFunction) => {
  mediaService
    .getStatsAsync()
    .then(data => res.status(200).json(data))
    .catch(err => next(err));
});

router.get('/:id', AuthMiddleware, async (req: any, res, next: NextFunction) => {
  const userId = req.user.sub;
  const mediaId = req.params.id;
  mediaService
    .getMediaByIdAsync(userId, mediaId)
    .then(data => res.status(200).json(data))
    .catch(err => next(err));
});

router.delete('/:id', AuthMiddleware, async (req: any, res, next: NextFunction) => {
  const userId = req.user.sub;
  const mediaId = req.params.id;
  mediaService
    .deleteMediaByIdAsync(userId, mediaId)
    .then(data => res.status(200).json(data))
    .catch(err => next(err));
});

export default router;
