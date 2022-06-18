import express from 'express';
import MediaController from './src/controllers/mediaController.js';
import 'dotenv/config';

const port = process.env.PORT ?? 3000;
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('', MediaController);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
