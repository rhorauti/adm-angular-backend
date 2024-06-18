import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.listen(process.env.PORT, () => {
  console.log(`Application is listening on port ${process.env.PORT}`);
});
