import { Router } from 'express';
import UserService from '../services/userService';
import { AuthMiddleware } from '../common/authMiddleware';

const userService = new UserService();
const router = Router();

router.get('/me', AuthMiddleware, async (req: any, res) => {
  console.log(req.user);
  return res.status(200).json('Ping');
});

router.post('/register', async (_req, res) => {
  return res.status(200).json('Ping');
});

router.patch('/me', async (_req, res) => {
  return res.status(200).json('Ping');
});

export default router;
