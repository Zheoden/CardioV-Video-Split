import express from 'express';
import MediaController from './controllers/mediaController';
import UserController from './controllers/userController';
import { myDataSource } from './ormConfig';
import 'dotenv/config';

const port = process.env.PORT ?? 3000;
let app = express();

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/media', MediaController);
app.use('/user', UserController);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
