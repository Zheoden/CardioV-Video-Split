import { NextFunction, Router } from 'express';
import UserService from '../services/userService';
import { AuthMiddleware } from '../auth/authMiddleware';

const userService = new UserService();
const router = Router();

router.get('/me', AuthMiddleware, async (req: any, res, next: NextFunction) => {
  userService
    .getUserAsync(req.user.sub)
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
});

router.post('/register', AuthMiddleware, async (req: any, res, next: NextFunction) => {
  const body = req.body;
  userService
    .registerUserAsync(req.user.sub, body)
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
});

router.patch('/me', AuthMiddleware, async (req: any, res, next: NextFunction) => {
  const body = req.body;
  userService
    .updateUserAsync(req.user.sub, body)
    .then(user => res.status(200).json(user))
    .catch(err => next(err));
});

export default router;
