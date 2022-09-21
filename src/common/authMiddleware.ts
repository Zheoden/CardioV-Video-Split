import { NextFunction } from 'express';
import DecryptToken from './jwt';

export function AuthMiddleware(req: any, res: any, next: NextFunction) {
  if (!req.headers.authorization) {
    res.status(401).send('Forbidden');
  } else {
    const token = req.headers.authorization.split(' ')[1];
    const decyptedToken = DecryptToken(token);
    req.user = decyptedToken.payload;
  }

  next();
}
