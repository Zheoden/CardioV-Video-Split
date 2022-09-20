import { Router } from 'express';
import UserService from '../services/userService';

const userService = new UserService();
const router = Router();

router.get('/', async (_req, res) => {
  try {
    const returnValue = await userService.getUser();
    return res.status(200).json(returnValue);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Error, nada salio flama :(' });
  }
});

export default router;
