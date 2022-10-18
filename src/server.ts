import express from 'express';
import MediaController from './controllers/mediaController';
import UserController from './controllers/userController';
import { myDataSource } from './ormConfig';
import cors from 'cors';
import { PORT } from './common/constants';

let app = express();

myDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization:', err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/media', MediaController);
app.use('/user', UserController);
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.message);
  res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
